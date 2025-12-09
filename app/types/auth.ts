export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterResponse {
  user: User;
  profileImage: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ProfileResponse {
  user: User;
}

export interface ForgotResponse {
  email: string;
}

export interface ResetResponse {
  token?: string | undefined;
  password: string;
}
