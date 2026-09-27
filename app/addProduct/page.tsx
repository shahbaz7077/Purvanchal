"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";

export default function AddProductPage() {
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

    if (images.length === 0) {
      setError("Add at least 1 image");
      return;
    }

    setStatus("saving");

    const res = await fetch("/api", {
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
    <main className="mx-auto max-w-md px-6 py-14">
      <h1 className="text-xl font-bold text-navy">Add product</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy">Info</label>
          <textarea
            required
            rows={4}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy">
            Images ({images.length}/4)
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <div key={url} className="relative">
                <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {images.length < 4 && (
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUpload}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="mt-3 rounded-lg border border-line px-4 py-2 text-sm font-medium text-navy hover:bg-surface"
                >
                  Upload image
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === "saving" ? "Saving..." : "Save product"}
        </button>
      </form>
    </main>
  );
}