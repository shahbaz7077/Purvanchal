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
    <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 px-6 py-14">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="text-center text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Our Products
        </h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800" />

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by name..."
          className="mx-auto mt-8 block w-full max-w-md rounded-lg border-2 border-blue-100 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
        />

        {loading ? (
          <p className="mt-10 text-center text-sm font-medium text-slate-600">
            Loading...
          </p>
        ) : products.length === 0 ? (
          <p className="mt-10 text-center text-sm font-medium text-slate-600">
            No products found.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-white">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-[13px] font-bold capitalize text-blue-950 group-hover:text-blue-700">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] font-medium capitalize text-slate-600">
                    {product.info}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border-2 border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition-colors hover:border-blue-400 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border-2 border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition-colors hover:border-blue-400 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}