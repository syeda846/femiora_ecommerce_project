"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) return alert("Invalid credentials");
    const data = await res.json();
    localStorage.setItem("admin_token", data.access_token);
    router.push("/admin/orders");
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-3" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-4 py-3" required />
        <button className="w-full bg-neutral-900 text-white rounded-lg py-3">Login</button>
      </form>
    </div>
  );
}