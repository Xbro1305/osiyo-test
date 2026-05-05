// src/api.ts

import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import type {
    User, Lists, Design, Machine, StationKey, AnyRecord
} from './types';

const API_URL: string = "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

interface LoginCredentials {
  login: string;
  passcode: string;
}

interface LoginResponse {
  user: User;
}

interface SuccessResponse {
  success: boolean;
}

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> =>
    api.post('/auth/login', credentials),
};

export const usersAPI = {
  getAll: (): Promise<AxiosResponse<User[]>> =>
    api.get('/users'),
  save: (user: User): Promise<AxiosResponse<User>> =>
    api.post('/users', user),
  delete: (id: string): Promise<AxiosResponse<SuccessResponse>> =>
    api.delete(`/users/${id}`),
};

export const listsAPI = {
  get: (): Promise<AxiosResponse<Partial<Lists>>> =>
    api.get('/lists'),
  save: (data: Lists): Promise<AxiosResponse<Lists>> =>
    api.post('/lists', data),
};

export const designsAPI = {
  getAll: (): Promise<AxiosResponse<Design[]>> =>
    api.get('/designs'),
  save: (design: Design): Promise<AxiosResponse<Design>> =>
    api.post('/designs', design),
  delete: (id: string): Promise<AxiosResponse<SuccessResponse>> =>
    api.delete(`/designs/${id}`),
};

export const machinesAPI = {
  getAll: (): Promise<AxiosResponse<Machine[]>> =>
    api.get('/machines'),
  save: (machine: Machine): Promise<AxiosResponse<Machine>> =>
    api.post('/machines', machine),
  delete: (id: string): Promise<AxiosResponse<SuccessResponse>> =>
    api.delete(`/machines/${id}`),
};

export const recordsAPI = {
  getByStation: <T extends AnyRecord = AnyRecord>(stationKey: StationKey): Promise<AxiosResponse<T[]>> =>
    api.get(`/records/${stationKey}`),
  save: <T extends AnyRecord = AnyRecord>(stationKey: StationKey, record: T): Promise<AxiosResponse<T>> =>
    api.post(`/records/${stationKey}`, record),
  delete: (stationKey: StationKey, id: string): Promise<AxiosResponse<SuccessResponse>> =>
    api.delete(`/records/${stationKey}/${id}`),
};

export default api;