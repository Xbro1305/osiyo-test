// ---------------------------------------------------------------------------
//  Loading bay scanner.
//
//  Route: /loading
//
//  This is the screen a warehouseman holds while rolls go onto the truck. It
//  is designed for that situation rather than for a desk:
//
//   * The count is the biggest thing on the screen. "3 / 50" has to be legible
//     at arm's length, in daylight, held at an angle.
//   * The verdict is a full-width colour block, not an icon. Green means load
//     it; red means stop. Someone glancing over should read the decision from
//     two metres away without reading any words.
//   * Every scan also beeps and buzzes, with a different sound per verdict,
//     because the phone is often not being looked at between rolls.
//   * Two input paths, always both live: the camera, and a focused text field
//     that a scanner gun types into. The field re-focuses itself after every
//     action so the gun never "stops working" because focus drifted.
//   * The screen is kept awake while a session is open.
//
//  It lives outside App.tsx deliberately — App.tsx is the 30k-line monolith we
//  are breaking up, and there is no reason for new pages to go back into it.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Camera, CameraOff, Check, CircleAlert, FileSpreadsheet, Loader2,
  PackageCheck, Truck, X, XCircle,
} from "lucide-react";

import { useT } from "../i18n/lang";
import { getToken } from "../lib/storage";
import { exportTripXlsx } from "../lib/exportTrip";
import {
  qrApi, type LoadingSession, type Progress, type QrOrder, type ScanResponse,
  type TripStatus,
} from "../lib/qrApi";

// ===== Feedback =============================================================

type Tone = "ok" | "warn" | "bad";

// Short synthesised tones — no audio files to host, and no latency from
// fetching one. Distinct pitch and length per verdict so the operator can work
// by ear: a high blip means loaded, a low buzz means stop.
function useBeeper() {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback((tone: Tone) => {
    try {
      if (!ctxRef.current) {
        const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!Ctor) return;
        ctxRef.current = new Ctor();
      }
      const ctx = ctxRef.current!;
      // iOS suspends the context until a gesture; every scan follows one.
      if (ctx.state === "suspended") ctx.resume();

      const spec = {
        ok: { freq: 1320, dur: 0.09, gain: 0.25 },
        warn: { freq: 660, dur: 0.16, gain: 0.25 },
        bad: { freq: 180, dur: 0.5, gain: 0.32 },
      }[tone];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tone === "bad" ? "square" : "sine";
      osc.frequency.value = spec.freq;
      gain.gain.setValueAtTime(spec.gain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + spec.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + spec.dur);
    } catch {
      /* audio is a nicety, never break the scan for it */
    }
  }, []);
}

function buzz(tone: Tone) {
  try {
    // Not supported on iOS Safari — best effort, Android gets it.
    navigator.vibrate?.(tone === "ok" ? 40 : tone === "warn" ? [40, 60, 40] : [120, 80, 120]);
  } catch {
    /* ignore */
  }
}

// Keep the screen on while a load is in progress. Re-acquires after the tab
// comes back, because the lock is dropped whenever the page is hidden.
function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    let lock: any = null;
    let cancelled = false;

    const acquire = async () => {
      try {
        lock = await (navigator as any).wakeLock?.request("screen");
      } catch {
        /* denied or unsupported */
      }
    };
    const onVisible = () => {
      if (!cancelled && document.visibilityState === "visible") acquire();
    };

    acquire();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      try { lock?.release(); } catch { /* ignore */ }
    };
  }, [active]);
}

// ===== Camera ===============================================================

// Decodes QR from the rear camera. Prefers the native BarcodeDetector (Chrome
// on Android — fast, runs off the main thread); falls back to jsQR, which is
// what iOS Safari needs since it has no BarcodeDetector.
//
// Decoding is throttled rather than run every frame: jsQR on a full-resolution
// frame is expensive, and a roll is not going past in 16ms.
function useQrCamera(
  enabled: boolean,
  onCode: (text: string) => void,
  onError: (msg: string) => void,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onCodeRef = useRef(onCode);
  onCodeRef.current = onCode;

  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let stream: MediaStream | null = null;
    let timer: any = null;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
      } catch (err: any) {
        onError(err?.name === "NotAllowedError" ? "camera_denied" : "camera_failed");
        return;
      }
      if (stopped) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.setAttribute("playsinline", "true"); // iOS: don't go fullscreen
      try {
        await video.play();
      } catch {
        /* autoplay blocked; the poster still shows */
      }

      let detector: any = null;
      if ("BarcodeDetector" in window) {
        try {
          detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });
        } catch {
          detector = null;
        }
      }
      let jsQR: any = null;
      if (!detector) {
        try {
          jsQR = (await import("jsqr")).default;
        } catch {
          onError("no_decoder");
          return;
        }
      }

      const tick = async () => {
        if (stopped) return;
        try {
          if (video.readyState >= 2) {
            if (detector) {
              const found = await detector.detect(video);
              if (found?.length) onCodeRef.current(found[0].rawValue);
            } else {
              const canvas = canvasRef.current!;
              // Cap the work: 480px on the long edge is ample for a QR filling
              // a good part of the frame, and keeps jsQR under ~20ms.
              const scale = Math.min(1, 480 / Math.max(video.videoWidth, 1));
              canvas.width = Math.round(video.videoWidth * scale);
              canvas.height = Math.round(video.videoHeight * scale);
              const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const res = jsQR(img.data, img.width, img.height, {
                inversionAttempts: "dontInvert",
              });
              if (res?.data) onCodeRef.current(res.data);
            }
          }
        } catch {
          /* a bad frame is not worth stopping the loop for */
        }
        timer = setTimeout(tick, 180);
      };
      tick();
    })();

    return () => {
      stopped = true;
      clearTimeout(timer);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [enabled, onError]);

  return { videoRef, canvasRef };
}

// ===== Verdict styling ======================================================

const VERDICT_STYLE: Record<string, { bg: string; tone: Tone; Icon: any }> = {
  accepted:        { bg: "bg-emerald-600", tone: "ok",   Icon: Check },
  duplicate:       { bg: "bg-amber-500",   tone: "warn", Icon: CircleAlert },
  wrong_order:     { bg: "bg-red-600",     tone: "bad",  Icon: XCircle },
  unknown_code:    { bg: "bg-red-600",     tone: "bad",  Icon: XCircle },
  already_shipped: { bg: "bg-red-600",     tone: "bad",  Icon: XCircle },
  void:            { bg: "bg-red-600",     tone: "bad",  Icon: XCircle },
  unreadable:      { bg: "bg-slate-500",   tone: "warn", Icon: CircleAlert },
  session_closed:  { bg: "bg-slate-500",   tone: "warn", Icon: CircleAlert },
};

// ===== Page =================================================================

export default function LoadingScannerPage() {
  const t = useT();
  const [session, setSession] = useState<LoadingSession | null>(null);

  if (!getToken()) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg mb-4">{t("loading.signInFirst", "Sign in to use the loading scanner.")}</p>
          <a href="/" className="inline-block px-5 py-3 rounded-xl bg-purple-600 font-semibold">
            {t("login.signIn", "Sign in")}
          </a>
        </div>
      </div>
    );
  }

  return session
    ? <ScannerView session={session} onLeave={() => setSession(null)} />
    : <OrderPicker onOpened={setSession} />;
}

// ---------------------------------------------------------------------------
//  Step 1 — pick the trip.
//
//  A trip IS an order: one truck loads one order, which is the rule the whole
//  feature rests on. So this list is the trips, and tapping one shows where it
//  stands before anything is scanned — how many rolls have gone, broken down
//  by design / fabric / length, which sessions were opened against it, and
//  what was refused at the ramp.
//
//  Trips that have already shipped stay in the list. They cannot be started
//  again, but a finished trip is the one people most often need to look up:
//  the question after a shipment is always "what actually went on that truck".
// ---------------------------------------------------------------------------
function OrderPicker({ onOpened }: { onOpened: (s: LoadingSession) => void }) {
  const t = useT();
  const [orders, setOrders] = useState<QrOrder[] | null>(null);
  const [error, setError] = useState("");
  const [chosen, setChosen] = useState<QrOrder | null>(null);
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    qrApi.listOrders()
      .then((r) => setOrders(r.items))
      .catch((e) => setError(e.message || "Failed to load orders"));
  }, []);

  const open = async () => {
    if (!chosen) return;
    setBusy(true);
    setError("");
    try {
      const r = await qrApi.openSession(chosen.id, vehicle.trim(), driver.trim());
      onOpened({ ...r.session, order_no: r.order.order_no, planned_rolls: r.order.planned_rolls });
    } catch (e: any) {
      setError(e.message || "Could not open the session");
    } finally {
      setBusy(false);
    }
  };

  // Only orders whose full code set exists are trips at all — the manifest has
  // to be complete before anyone can count against it, and a half-issued order
  // has nothing meaningful to show either.
  const trips = (orders || []).filter(
    (o) => Number(o.codes_issued) === o.planned_rolls && o.planned_rolls > 0,
  );
  const canStart = (o: QrOrder) => o.status !== "shipped" && o.status !== "cancelled";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <a href="/" className="p-2 rounded-lg bg-slate-800" aria-label={t("common.back", "Back")}>
            <ArrowLeft size={20} />
          </a>
          <Truck size={26} className="text-purple-400" />
          <h1 className="text-2xl font-bold">{t("loading.title", "Truck loading")}</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-900/50 border border-red-700 text-red-100">{error}</div>
        )}

        {orders === null && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 size={18} className="animate-spin" /> {t("common.loading", "Loading…")}
          </div>
        )}

        {orders !== null && !trips.length && (
          <p className="text-slate-400">
            {t("loading.noOrders", "No orders are ready to load. Issue the labels for an order first.")}
          </p>
        )}

        <div className="space-y-3">
          {trips.map((o) => {
            const shipped = o.status === "shipped";
            const active = chosen?.id === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setChosen(active ? null : o)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-colors ${
                  active
                    ? "border-purple-500 bg-purple-950/40"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-bold">{o.order_no}</span>
                  <span className="text-2xl font-black tabular-nums">{o.planned_rolls}</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {[o.customer_name, o.design_number, o.fabric_type].filter(Boolean).join(" · ") || "—"}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs">
                  <span className={shipped ? "text-emerald-400" : "text-slate-400"}>
                    {t("loading.rollsLoaded", "Loaded")}: {Number(o.rolls_loaded) || 0} / {o.planned_rolls}
                  </span>
                  {shipped && (
                    <span className="text-emerald-400 font-semibold">
                      {t("orders.status.shipped", "shipped")}
                    </span>
                  )}
                  {o.status === "loading" && (
                    <span className="text-amber-400 font-semibold">
                      {t("loading.inProgress", "loading in progress")}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {chosen && (
          <div className="mt-4 space-y-4">
            <TripPreview order={chosen} />

            {canStart(chosen) ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <label className="block">
                    <span className="text-xs text-slate-400">{t("loading.vehicle", "Vehicle")}</span>
                    <input
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="01 A 123 BC"
                      className="mt-1 w-full px-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-400">{t("loading.driver", "Driver")}</span>
                    <input
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                      className="mt-1 w-full px-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                    />
                  </label>
                </div>
                <button
                  onClick={open}
                  disabled={busy}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-lg font-bold"
                >
                  {busy
                    ? <Loader2 size={20} className="animate-spin inline" />
                    : t("loading.start", "Start loading")}
                </button>
              </div>
            ) : (
              <p className="text-sm text-slate-400 px-1">
                {chosen.status === "shipped"
                  ? t("loading.alreadyShipped", "This trip has shipped — it can be reviewed and exported, not loaded again.")
                  : t("loading.cancelledTrip", "This order is cancelled.")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  What has happened to this trip so far.
//
//  The breakdown is by design / fabric / length rather than by roll, because
//  that is the unit the people at the ramp work in: "the 30 m poplin is all
//  on, the 50 m is short by two" is actionable, "roll 37 is missing" is not
//  until you know what roll 37 is.
//
//  Same grouping as the label ZIP on the orders screen, deliberately — the
//  pile of stickers, the file in the archive and the line on this screen all
//  describe the same thing.
// ---------------------------------------------------------------------------
function TripPreview({ order }: { order: QrOrder }) {
  const t = useT();
  const [trip, setTrip] = useState<TripStatus | null>(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setTrip(null);
    setError("");
    qrApi.orderLoading(order.id)
      .then((r) => { if (!cancelled) setTrip(r); })
      .catch((e) => { if (!cancelled) setError(e.message || "Could not load the trip"); });
    return () => { cancelled = true; };
  }, [order.id]);

  const units = useMemo(() => {
    if (!trip) return [];
    const map = new Map<string, {
      design: string; fabric: string; length: string; total: number; loaded: number;
    }>();
    for (const r of trip.rolls) {
      const design = r.design_number || trip.order.design_number || "—";
      const fabric = r.fabric_type || trip.order.fabric_type || "";
      const len = r.roll_length == null ? "" : String(Math.round(Number(r.roll_length) * 100) / 100);
      const key = `${design}|${fabric}|${len}`;
      if (!map.has(key)) map.set(key, { design, fabric, length: len, total: 0, loaded: 0 });
      const u = map.get(key)!;
      u.total += 1;
      // Same rule as the headline above it, computed by the server: shipped,
      // or scanned by a session that is open right now. Counting a bare scan
      // made the two disagree, because an aborted session keeps its scans.
      if (r.on_truck) u.loaded += 1;
    }
    return [...map.values()];
  }, [trip]);

  const runExport = async () => {
    if (!trip) return;
    setExporting(true);
    const r = await exportTripXlsx(trip);
    if (!r.ok) setError(r.error);
    setExporting(false);
  };

  if (error && !trip) {
    return <div className="p-4 rounded-2xl bg-red-900/40 border border-red-800 text-red-100">{error}</div>;
  }
  if (!trip) {
    return (
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-400">
        <Loader2 size={18} className="animate-spin" /> {t("common.loading", "Loading…")}
      </div>
    );
  }

  const p = trip.progress;

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="font-bold flex-1">{t("loading.tripStatus", "Trip status")}</h2>
        <button
          onClick={runExport}
          disabled={exporting}
          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-500 disabled:opacity-50 text-sm font-semibold inline-flex items-center gap-2"
        >
          {exporting
            ? <Loader2 size={16} className="animate-spin" />
            : <FileSpreadsheet size={16} />}
          {t("loading.exportExcel", "Export to Excel")}
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-black tabular-nums ${p.remaining === 0 ? "text-emerald-400" : ""}`}>
          {p.on_truck}
        </span>
        <span className="text-2xl font-black tabular-nums text-slate-600">/ {p.total}</span>
        <span className="text-sm text-slate-400 ml-auto">
          {t("loading.remaining", "Remaining")}: <b className="text-slate-200">{p.remaining}</b>
        </span>
      </div>

      {/* By unit — the way the ramp thinks about the load. */}
      <div className="space-y-1">
        {units.map((u) => (
          <div
            key={`${u.design}|${u.fabric}|${u.length}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 text-sm"
          >
            <span className="min-w-0 flex-1 truncate">
              <b>{u.design}</b>
              {u.fabric ? ` · ${u.fabric}` : ""}
              {u.length ? ` · ${u.length} ${t("orders.m", "m")}` : ""}
            </span>
            <span className={`tabular-nums font-bold ${u.loaded === u.total ? "text-emerald-400" : "text-slate-300"}`}>
              {u.loaded} / {u.total}
            </span>
          </div>
        ))}
      </div>

      {/* Sessions: a trip can take more than one, and "who closed it short"
          is the question asked afterwards. */}
      {!!trip.sessions.length && (
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
            {t("loading.sessions", "Loading sessions")}
          </h3>
          <div className="space-y-1">
            {trip.sessions.map((s) => (
              <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 text-sm">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    s.status === "open"
                      ? "bg-amber-500 text-slate-950"
                      : s.status === "closed"
                        ? "bg-emerald-700"
                        : "bg-slate-700"
                  }`}
                >
                  {t(`loading.session.${s.status}`, s.status)}
                </span>
                <span className="min-w-0 flex-1 truncate text-slate-300">
                  {[s.vehicle, s.driver].filter(Boolean).join(" · ") || "—"}
                </span>
                <span className="tabular-nums text-slate-400">{s.scanned}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!!trip.rejections.length && (
        <p className="text-sm text-amber-400">
          {t("loading.rejectedCount", "Refused scans")}: <b>{trip.rejections.length}</b>{" "}
          <span className="text-slate-400">
            ({t("loading.rejectedHint", "in the Excel export")})
          </span>
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Step 2 — the scanner itself.
// ---------------------------------------------------------------------------
function ScannerView({ session, onLeave }: { session: LoadingSession; onLeave: () => void }) {
  const t = useT();
  const beep = useBeeper();

  const [progress, setProgress] = useState<Progress>({
    scanned: 0, total: session.planned_rolls || 0, remaining: session.planned_rolls || 0,
  });
  const [verdict, setVerdict] = useState<ScanResponse | null>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [missing, setMissing] = useState<any[]>([]);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [manual, setManual] = useState("");
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState<null | { complete: boolean }>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  // Guards against the camera firing the same label dozens of times a second
  // while it sits in frame, and against a gun that double-triggers.
  const recentRef = useRef<{ code: string; at: number }>({ code: "", at: 0 });

  useWakeLock(!closed);

  const refresh = useCallback(async () => {
    try {
      const s = await qrApi.getSession(session.id);
      setProgress(s.progress);
      setScans(s.scans.slice().reverse());
      setMissing(s.missing);
    } catch (e: any) {
      setError(e.message || "");
    }
  }, [session.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const focusInput = useCallback(() => {
    // Only steal focus on a device with a keyboard/gun. On a phone this would
    // pop the on-screen keyboard over the camera view every time.
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);
  useEffect(() => { focusInput(); }, [focusInput]);

  const submit = useCallback(async (raw: string) => {
    const code = raw.trim();
    if (!code || busy || closed) return;

    const now = Date.now();
    if (recentRef.current.code === code && now - recentRef.current.at < 2000) return;
    recentRef.current = { code, at: now };

    setBusy(true);
    try {
      const r = await qrApi.scanRoll(session.id, code);
      setVerdict(r);
      setProgress(r.progress);
      const style = VERDICT_STYLE[r.result] || VERDICT_STYLE.unreadable;
      beep(style.tone);
      buzz(style.tone);
      if (r.ok) refresh();
    } catch (e: any) {
      setError(e.message || "Scan failed");
      beep("bad");
      buzz("bad");
    } finally {
      setBusy(false);
      setManual("");
      focusInput();
    }
  }, [session.id, busy, closed, beep, refresh, focusInput]);

  const { videoRef, canvasRef } = useQrCamera(cameraOn && !closed, submit, setCameraError);

  const close = async (force: boolean) => {
    let reason = "";
    if (force) {
      reason = window.prompt(
        t("loading.reasonPrompt", "Why is the load incomplete?") +
        ` (${progress.scanned}/${progress.total})`,
      ) || "";
      if (!reason.trim()) return;
    }
    setBusy(true);
    try {
      const r = await qrApi.closeSession(session.id, force, reason);
      setClosed({ complete: r.complete });
      setCameraOn(false);
    } catch (e: any) {
      setError(e.message || "Could not close");
    } finally {
      setBusy(false);
    }
  };

  const pct = progress.total ? Math.round((progress.scanned / progress.total) * 100) : 0;
  const style = verdict ? (VERDICT_STYLE[verdict.result] || VERDICT_STYLE.unreadable) : null;

  if (closed) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <PackageCheck size={72} className={closed.complete ? "text-emerald-400 mx-auto" : "text-amber-400 mx-auto"} />
          <h2 className="text-3xl font-black mt-4">
            {closed.complete
              ? t("loading.doneComplete", "Load complete")
              : t("loading.doneShort", "Closed short")}
          </h2>
          <p className="text-5xl font-black tabular-nums my-4">
            {progress.scanned} / {progress.total}
          </p>
          <button onClick={onLeave} className="w-full py-4 rounded-xl bg-purple-600 font-bold text-lg">
            {t("loading.newLoad", "New load")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-8">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-800">
        <button onClick={onLeave} className="p-2 rounded-lg bg-slate-800"><ArrowLeft size={18} /></button>
        <div className="min-w-0 flex-1">
          <div className="font-bold truncate">{session.order_no}</div>
          <div className="text-xs text-slate-400 truncate">
            {[session.vehicle, session.driver].filter(Boolean).join(" · ") || "—"}
          </div>
        </div>
        <button
          onClick={() => { setCameraError(""); setCameraOn((v) => !v); }}
          className={`p-3 rounded-xl ${cameraOn ? "bg-purple-600" : "bg-slate-800"}`}
          aria-label={t("loading.camera", "Camera")}
        >
          {cameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
        </button>
      </div>

      {/* The count — the most important thing on this screen. */}
      <div className="px-4 pt-6 pb-4 text-center">
        <div className="text-7xl sm:text-8xl font-black tabular-nums leading-none">
          <span className={progress.remaining === 0 ? "text-emerald-400" : ""}>{progress.scanned}</span>
          <span className="text-slate-600"> / {progress.total}</span>
        </div>
        <div className="mt-4 h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${progress.remaining === 0 ? "bg-emerald-500" : "bg-purple-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-slate-400">
          {t("loading.remaining", "Remaining")}: <b className="text-slate-200">{progress.remaining}</b>
        </div>
      </div>

      {/* Verdict */}
      <div className="px-4">
        <div
          className={`rounded-2xl p-5 min-h-[116px] flex items-center gap-4 transition-colors ${
            style ? style.bg : "bg-slate-900 border border-slate-800"
          }`}
        >
          {style ? <style.Icon size={44} className="shrink-0" /> : null}
          <div className="min-w-0">
            {verdict ? (
              <>
                <div className="text-2xl font-black leading-tight">
                  {verdict.result === "accepted"
                    ? t("loading.load", "LOAD IT")
                    : verdict.result === "duplicate"
                      ? t("loading.alreadyOn", "ALREADY ON")
                      : t("loading.dontLoad", "DO NOT LOAD")}
                </div>
                <div className="text-sm opacity-90 mt-1">{verdict.message}</div>
                {verdict.roll && (
                  <div className="text-xs opacity-75 mt-1 font-mono">
                    #{verdict.roll.roll_index} · {verdict.roll.code}
                  </div>
                )}
              </>
            ) : (
              <div className="text-slate-400">{t("loading.waiting", "Scan a roll to begin.")}</div>
            )}
          </div>
        </div>
      </div>

      {/* Camera */}
      {cameraOn && (
        <div className="px-4 mt-4">
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3]">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-4 border-white/70 rounded-2xl" />
            </div>
          </div>
          {cameraError && (
            <p className="mt-2 text-sm text-amber-400">
              {cameraError === "camera_denied"
                ? t("loading.cameraDenied", "Camera access denied — use the scanner gun or type the code.")
                : t("loading.cameraFailed", "Camera unavailable — use the scanner gun or type the code.")}
            </p>
          )}
        </div>
      )}

      {/* Manual / scanner-gun input. Always present: it is the primary path on
          a laptop with a gun, and the fallback when a label is damaged. */}
      <div className="px-4 mt-4">
        <form
          onSubmit={(e) => { e.preventDefault(); submit(manual); }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            onBlur={() => setTimeout(focusInput, 100)}
            placeholder={t("loading.codePlaceholder", "Scan or type the code")}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="flex-1 px-4 py-4 rounded-xl bg-slate-900 border-2 border-slate-700 focus:border-purple-500 outline-none font-mono text-lg tracking-wider"
          />
          <button
            type="submit"
            disabled={busy || !manual.trim()}
            className="px-5 rounded-xl bg-purple-600 disabled:opacity-40 font-bold"
          >
            {busy ? <Loader2 size={20} className="animate-spin" /> : "OK"}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {/* Actions */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => close(progress.remaining > 0)}
          disabled={busy}
          className={`py-4 rounded-xl font-bold ${
            progress.remaining === 0 ? "bg-emerald-600" : "bg-slate-800 border border-slate-700"
          }`}
        >
          {progress.remaining === 0
            ? t("loading.finish", "Finish")
            : t("loading.closeShort", "Close short")}
        </button>
        <button
          onClick={async () => {
            if (!window.confirm(t("loading.abortConfirm", "Discard this load? Nothing will be recorded as shipped."))) return;
            await qrApi.abortSession(session.id).catch(() => {});
            onLeave();
          }}
          disabled={busy}
          className="py-4 rounded-xl bg-slate-800 border border-slate-700 font-bold"
        >
          {t("loading.abort", "Abort")}
        </button>
      </div>

      {/* Lists */}
      <div className="px-4 mt-6 grid sm:grid-cols-2 gap-4">
        <section>
          <h3 className="text-sm font-bold text-slate-400 mb-2">
            {t("loading.onTruck", "On the truck")} ({scans.length})
          </h3>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {scans.map((s) => (
              <div key={s.roll_code_id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-sm">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span className="font-bold tabular-nums w-10">#{s.roll_index}</span>
                <span className="font-mono text-xs text-slate-400 truncate">{s.code}</span>
                <button
                  onClick={async () => {
                    const r = await qrApi.undoScan(session.id, s.roll_code_id).catch(() => null);
                    if (r) { setProgress(r.progress); refresh(); }
                  }}
                  className="ml-auto p-1 text-slate-500 hover:text-red-400"
                  aria-label={t("loading.undo", "Undo")}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {!scans.length && <p className="text-slate-600 text-sm">—</p>}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-400 mb-2">
            {t("loading.stillMissing", "Still missing")} ({missing.length})
          </h3>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {missing.map((m) => (
              <div key={m.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 text-sm">
                <span className="font-bold tabular-nums w-10 text-slate-400">#{m.roll_index}</span>
                <span className="font-mono text-xs text-slate-600 truncate">{m.code}</span>
              </div>
            ))}
            {!missing.length && (
              <p className="text-emerald-400 text-sm">{t("loading.nothingMissing", "Nothing missing.")}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
