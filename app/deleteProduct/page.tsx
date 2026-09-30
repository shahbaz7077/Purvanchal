"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "../../types/product";

type EditState = {
  id: string;
  name: string;
  info: string;
};

export default function DeleteProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit state — null means no row is being edited
  const [editing, setEditing] = useState<EditState | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: "1", search });
      const res = await fetch(`/api/products?${params.toString()}`);

      if (!res.ok) {
        setProducts([]);
        return;
      }

      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        if (editing?.id === id) setEditing(null);
      } else {
        alert("Could not delete product");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (product: Product) => {
    setEditing({ id: product.id, name: product.name, info: product.info });
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;

    const name = editing.name.trim();
    const info = editing.info.trim();

    if (!name || !info) {
      alert("Name and description are required.");
      return;
    }

    setSavingId(editing.id);
    try {
      const res = await fetch(`/api/products?id=${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, info }),
      });

      if (!res.ok) {
        alert("Could not update product");
        return;
      }

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, name: updated.name, info: updated.info }
            : p
        )
      );
      setEditing(null);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update product");
    } finally {
      setSavingId(null);
    }
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
            Manage Products
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800" />
        </div>

        {/* Search Input Bar */}
        <div className="relative mx-auto mt-10 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="block w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3.5 text-sm font-medium text-white placeholder-slate-500 shadow-lg backdrop-blur-md transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-400" />
            <p className="text-sm font-bold text-slate-300 animate-pulse">
              Loading catalog...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-slate-400">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-300">
              No products found.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            {products.map((product) => {
              const isEditing = editing?.id === product.id;

              return (
                <div
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-900/60 border border-white/5">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* View mode: name + info */}
                    {!isEditing && (
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold capitalize text-white">
                          {product.name}
                        </p>
                        <p className="truncate text-xs font-medium text-slate-400">
                          {product.info}
                        </p>
                      </div>
                    )}

                    {/* View mode: buttons */}
                    {!isEditing && (
                      <div className="flex flex-shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(product)}
                          className="rounded-lg border-2 border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="rounded-lg border-2 border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300 transition-all duration-300 hover:border-red-400 hover:bg-red-500/20 hover:text-red-200 disabled:opacity-40"
                        >
                          {deletingId === product.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Edit mode: form */}
                  {isEditing && (
                    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editing.name}
                          onChange={(e) =>
                            setEditing({ ...editing, name: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-white placeholder-slate-500 transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Description
                        </label>
                        <textarea
                          value={editing.info}
                          onChange={(e) =>
                            setEditing({ ...editing, info: e.target.value })
                          }
                          rows={3}
                          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-white placeholder-slate-500 transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          disabled={savingId === product.id}
                          className="rounded-lg border-2 border-slate-500/40 bg-slate-500/10 px-3 py-1.5 text-xs font-bold text-slate-300 transition-all duration-300 hover:border-slate-400 hover:bg-slate-500/20 hover:text-white disabled:opacity-40"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveEdit}
                          disabled={savingId === product.id}
                          className="rounded-lg border-2 border-blue-500/40 bg-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-200 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/30 hover:text-white disabled:opacity-40"
                        >
                          {savingId === product.id ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}