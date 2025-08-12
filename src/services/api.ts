import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              const { access } = response.data;
              localStorage.setItem('access_token', access);
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(username: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/auth/jwt/create/', { username, password });
  }

  async register(userData: { username: string; email: string; password: string }): Promise<AxiosResponse> {
    return this.api.post('/auth/users/', userData);
  }

  async refreshToken(refresh: string): Promise<AxiosResponse> {
    return this.api.post('/auth/jwt/refresh/', { refresh });
  }

  async verifyToken(token: string): Promise<AxiosResponse> {
    return this.api.post('/auth/jwt/verify/', { token });
  }

  // Generic CRUD methods
  async get<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
    return this.api.get(endpoint, { params });
  }

  async post<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
    return this.api.post(endpoint, data);
  }

  async put<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
    return this.api.put(endpoint, data);
  }

  async patch<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
    return this.api.patch(endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.api.delete(endpoint);
  }

  // File upload method
  async uploadFile<T>(endpoint: string, file: File, additionalData?: object): Promise<AxiosResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    }

    return this.api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const apiService = new ApiService();
export default apiService;
