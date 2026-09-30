"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { highQualityImage } from "../../../lib/cloudinary-url";
import ScrollNut from "../../components/ScrollNut";

type Product = {
  id: string;
  name: string;
  info: string;
  images: string[];
};

export default function ProductB2BView({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white pb-24">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to products
        </Link>

        {/* Main image */}
        <div className="aspect-square sm:aspect-video bg-slate-900 border border-slate-800 rounded-xl relative flex items-center justify-center shadow-md overflow-hidden">
          {product.images?.[activeImage] ? (
            <Image
              src={highQualityImage(product.images[activeImage])}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-contain p-6"
              quality={95}
              priority
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="mx-auto w-24 h-24 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                ⚙️
              </div>
              <p className="text-slate-400 font-mono text-xs">
                NO_IMAGE_AVAILABLE
              </p>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-3 flex-wrap">
            {product.images.map((url, i) => (
              <button
                key={url + i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-20 overflow-hidden rounded-lg bg-white border-2 transition-all ${
                  activeImage === i
                    ? "border-blue-600 shadow-sm"
                    : "border-slate-200 hover:border-slate-400"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={highQualityImage(url)}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 capitalize">
          {product.name}
        </h1>

        {/* Description */}
        {product.info && (
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {product.info}
          </p>
        )}
      </main>

      {/* Scroll to top widget */}
      <ScrollNut />
    </div>
  );
}