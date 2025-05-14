import { ENDPOINTS } from "../config/api";

export interface LoginResponse {
  accessToken: string;
  userId: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
  email: string;
}

class AuthService {
  async signup(credentials: SignupCredentials): Promise<LoginResponse> {
    const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Pendaftaran gagal");
    }

    const data = await response.json();
    return data;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login gagal");
    }

    const data = await response.json();
    return data;
  }

  setAuthData(data: LoginResponse) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("userId", String(data.userId));
    localStorage.setItem("username", data.username);
  }

  getAuthData() {
    if (typeof window === "undefined") return null;

    return {
      accessToken: localStorage.getItem("accessToken"),
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
    };
  }

  clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  }

  isAuthenticated(): boolean {
    return !!this.getAuthData()?.accessToken;
  }
}

export const authService = new AuthService();
