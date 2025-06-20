import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://safehomeanara.id";

// Tipe data untuk user
type User = {
  userId: number;
  username: string;
  email: string;
  role: string;
  profilePhoto?: string;
};

// Tipe data untuk auth store
type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// Fungsi untuk login
export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  return data;
}

// Fungsi untuk register
export async function registerUser(
  username: string,
  password: string,
  email: string
) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registrasi gagal");
  }

  const data = await response.json();
  return data;
}

// Fungsi untuk get current user
export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user info");
  }

  return response.json();
}

// Zustand store dengan persist middleware
export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role === "admin",
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
