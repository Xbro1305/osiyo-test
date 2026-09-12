// ---------------------------------------------------------------------------
// Extracted from src/App.tsx as part of breaking up the monolith.
// The code below is unchanged apart from the added `export` keywords
// and the import block above it.
// ---------------------------------------------------------------------------

import { monthCode, uid } from "../lib/dates";

// ============== ROUT CARD NUMBERING ==============
// Presets the admin can choose between for input batches and print numbers.
// Each preset's `format(prefix, seq, date)` returns the generated string.
export const NUMBERING_PRESETS = [
  {
    id: "monthSeq",
    label: "{PREFIX}-{MONTH}{seq3}",
    sample: "B-MAY001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}-${monthCode(d)}${String(seq).padStart(3, "0")}`,
  },
  {
    id: "simpleSeq",
    label: "{PREFIX}-{seq4}",
    sample: "B-1234",
    format: (prefix, seq) => `${prefix}-${String(seq).padStart(4, "0")}`,
  },
  {
    id: "fullDate",
    label: "{PREFIX}-{YYYY}-{MM}-{seq3}",
    sample: "B-2026-05-001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(seq).padStart(3, "0")}`,
  },
  {
    id: "compact",
    label: "{PREFIX}{YY}{MM}{seq4}",
    sample: "B26050001",
    format: (prefix, seq, d = new Date()) =>
      `${prefix}${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(seq).padStart(4, "0")}`,
  },
];

// Default numbering settings (matches current behavior so nothing breaks for existing users).
export const DEFAULT_NUMBERING = {
  inputBatch: {
    presetId: "monthSeq",
    prefix: "B",
    nextSeq: 1,
    resetEachMonth: true,
  },
  printNumber: {
    presetId: "monthSeq",
    prefix: "PR",
    nextSeq: 1,
    resetEachMonth: true,
  },
  dyeingNumber: {
    presetId: "monthSeq",
    prefix: "DY",
    nextSeq: 1,
    resetEachMonth: true,
  },
};

// Generate a number from current numbering config + existing records (so we never collide).
// `existingNumbers` is a Set of all already-used numbers in that field.
export function generateNumber(cfg, existingNumbers) {
  const preset =
    NUMBERING_PRESETS.find((p) => p.id === cfg.presetId) ||
    NUMBERING_PRESETS[0];
  const baseSeq = Math.max(1, Number(cfg.nextSeq) || 1);
  // Walk forward until we find a free number — handles the case where admin set nextSeq lower than the highest used.
  for (let seq = baseSeq; seq < baseSeq + 10000; seq++) {
    const candidate = preset.format(cfg.prefix || "", seq);
    if (!existingNumbers.has(candidate)) return { number: candidate, seq };
  }
  // Fallback (extremely unlikely): include uid suffix to guarantee uniqueness.
  return { number: `${cfg.prefix}-${uid()}`, seq: baseSeq };
}
