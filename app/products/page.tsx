"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), search });
      const res = await fetch(`/api/products?${params.toString()}`);

      if (!res.ok) {
        setProducts([]);
        setTotalPages(1);
        return;
      }

      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
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
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        {/* Header Section */}
        <div className="relative text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            The Standard of Quality
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-300">
            True luxury lies in the details. Explore a collection meticulously
            engineered to look flawless and perform perfectly.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mx-auto mt-12 max-w-md">
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
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search our catalog..."
            className="block w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3.5 text-sm font-medium text-white placeholder-slate-500 shadow-lg backdrop-blur-md transition-all duration-300 focus:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Content Renderers */}
        {loading ? (
          <div className="mt-24 flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-400" />
            <p className="text-sm font-bold text-slate-300 animate-pulse">
              Verifying catalog...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-24 text-center">
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
              No items found matching your search.
            </p>
          </div>
        ) : (
          /* Product Cards */
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-blue-950/40"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/60">
                  {product.images &&
                  product.images[0] &&
                  product.images[0] !== "" ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800/60 text-slate-500">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0  from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info Content Block */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-black capitalize text-white transition-colors group-hover:text-blue-200">
                      {product.name}
                    </h3>
                    <div className="rounded-xl bg-white/5 px-3 py-1 text-xs font-bold text-slate-200 border border-white/10 shrink-0 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-colors duration-300">
                      Explore
                    </div>
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-400 capitalize">
                    {product.info}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-bold text-slate-300 transition-all duration-300 hover:border-blue-400/40 hover:text-white disabled:pointer-events-none disabled:opacity-20 shadow-sm"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>
            <span className="text-xs font-extrabold text-slate-500 tracking-wider">
              PAGE <span className="text-white">{page}</span> OF {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-bold text-slate-300 transition-all duration-300 hover:border-blue-400/40 hover:text-white disabled:pointer-events-none disabled:opacity-20 shadow-sm"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}