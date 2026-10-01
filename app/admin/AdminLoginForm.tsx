"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Wrong password");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border-2 border-blue-100 bg-white p-8 shadow-sm"
      >
        <h1 className="text-center text-xl font-bold text-blue-950">
          Admin Login
        </h1>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-6 w-full rounded-lg border-2 border-blue-100 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </main>
  );
}