'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser, useAuth } from "@/../lib/auth";
import { toast } from "react-hot-toast";

export default function Masuk() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(username, password);
      
      // Simpan data user dan token
      login(
        { 
          userId: data.userId, 
          username: data.username,
          email: data.email || "",
          role: data.role || "user" 
        }, 
        data.accessToken
      );
      
      toast.success("Login berhasil!");
      router.push("/");
    } catch (error) {
      setError("Username atau password salah");
      toast.error("Username atau password salah");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const formData = {
    username,
    password
  };

  return (
    <div className="w-full h-dvh bg-[#eae8d7] flex items-center justify-center p-4 grid_pattern">
      <div className="bg-white px-4 py-2 rounded-3xl md:py-10 md:px-16 md:rounded-[44px] shadow-lg w-full md:max-w-[694px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <h1 className="text-4xl text-black font-bold">Welcome Back</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-black">Username</span>
              <input 
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] text-black outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-black">Password</span>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] text-black outline-none"
                required
              />
            </label>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button 
              type="submit" 
              className={`bg-[#4F1718] text-[#FAFAFA] w-full p-4 rounded-2xl hover:bg-[#AD8861] transition-colors font-semibold ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
            <Link href="/register" className="underline text-sm text-[#4F1718] text-center">
              Belum punya akun? Daftar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
