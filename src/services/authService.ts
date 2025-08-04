import { apiService } from './api';

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    date_of_birth: string;
    avatar: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface ProfileUpdateData {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

class AuthService {
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await apiService.login(loginData.username, loginData.password);
    const { access, refresh } = response.data;
    
    // Store tokens
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    return response.data;
  }

  async register(registerData: RegisterData): Promise<User> {
    const response = await apiService.register(registerData);
    return response.data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('aurabags_current_user');
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/users/profile/');
    return response.data;
  }

  async updateProfile(profileData: ProfileUpdateData): Promise<User['profile']> {
    const response = await apiService.put<User['profile']>('/users/profile/details/', profileData);
    return response.data;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await apiService.verifyToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
}

export const authService = new AuthService();
export default authService;
