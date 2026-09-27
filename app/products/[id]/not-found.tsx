import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="text-lg font-bold text-navy">Product not found</h1>
      <p className="mt-2 text-sm text-muted">
        This product may have been removed.
      </p>
      <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
        Back to products
      </Link>
    </main>
  );
}