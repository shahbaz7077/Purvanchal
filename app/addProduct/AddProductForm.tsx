"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";

export default function AddProductForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string>("");

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;

    if (info && typeof info === "object" && "secure_url" in info) {
      setImages((prev) => [...prev, info.secure_url as string].slice(0, 4));
    }
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !info.trim()) {
      setError("Name and description are required.");
      return;
    }

    if (images.length === 0) {
      setError("Add at least 1 image");
      return;
    }

    setStatus("saving");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, info, images }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setStatus("error");
      return;
    }

    router.push("/");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0d14] text-[#f1f5f9]">
      {/* 1. Fine Architectural Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161f30_1px,transparent_1px),linear-gradient(to_bottom,#161f30_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />

      {/* 2. Soft Ambient Radial Steel Spotlight Blur */}
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-slate-500/5 blur-[120px] pointer-events-none" />

      {/* 3. Deep Core Accent Shadow Spotlight */}
      <div className="absolute top-[40%] -right-[20%] w-[800px] h-[800px] rounded-full bg-blue-500/[0.02] blur-[160px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Add Product
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm font-medium text-slate-400">
            Create a new catalog entry with up to 4 product images.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800" />
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Product Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Info */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Description
            </label>
            <textarea
              required
              rows={5}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Images */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Images
              </label>
              <span className="text-xs font-bold text-slate-500">
                {images.length} / 4
              </span>
            </div>

            {/* Image grid */}
            <div className="flex flex-wrap gap-3">
              {images.map((url) => (
                <div
                  key={url}
                  className="group relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    aria-label="Remove image"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-red-400/50 bg-red-500/80 text-xs font-bold text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Upload tile */}
              {images.length < 4 && (
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={handleUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] text-slate-400 transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/5 hover:text-blue-300"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Upload
                      </span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            <p className="mt-2 text-xs font-medium text-slate-500">
              Upload up to 4 images. First image is used as the cover.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-red-300">{error}</p>
            </div>
          )}

          {/* Save Button — inline, not fixed */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === "saving"}
              className="group flex items-center gap-2 rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-500 to-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(239,68,68,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(239,68,68,0.5)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "saving" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}