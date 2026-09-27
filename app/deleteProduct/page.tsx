"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "../../types/product";

export default function DeleteProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      } else {
        alert("Could not delete product");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Delete Product
        </h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="mx-auto mt-8 block w-full rounded-lg border-2 border-blue-100 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
        />

        {loading ? (
          <p className="mt-8 text-center text-sm font-medium text-slate-600">
            Loading...
          </p>
        ) : products.length === 0 ? (
          <p className="mt-8 text-center text-sm font-medium text-slate-600">
            No products found.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border-2 border-blue-100 bg-white p-3"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-blue-50">
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

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold capitalize text-blue-950">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-slate-600">{product.info}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="flex-shrink-0 rounded-lg border-2 border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}