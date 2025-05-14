'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser, useAuth } from "@/../lib/auth";
import { toast } from "react-hot-toast";

export default function Daftar() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const data = await registerUser(formData.username, formData.password, formData.email);
      
      // Simpan data user dan token
      login(
        { 
          userId: data.userId, 
          username: data.username,
          email: data.email,
          role: data.role || "user" 
        }, 
        data.accessToken
      );
      
      toast.success("Pendaftaran berhasil!");
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Pendaftaran gagal");
      toast.error(error.message || "Pendaftaran gagal");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full h-dvh bg-[#eae8d7] flex items-center justify-center p-4 grid_pattern">
      <div className="bg-white px-4 py-2 rounded-3xl md:-mt-12 md:py-10 md:px-16 md:rounded-[44px] shadow-lg w-full md:max-w-[694px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <h1 className="text-4xl text-black font-bold">Sign Up</h1>
          
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
              <span className="text-sm font-medium text-black">Email</span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Contoh: johndoe@email.com"
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
                placeholder="Minimal 6 karakter"
                className="placeholder:text-lg border border-[#8E8E8E] px-5 py-3 rounded-xl focus:ring-2 focus:ring-[#AD8861] text-black outline-none"
                required
                minLength={6}
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
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
            <Link href="/login" className="underline text-sm text-[#4F1718] text-center">
              Sudah punya akun? Masuk
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
