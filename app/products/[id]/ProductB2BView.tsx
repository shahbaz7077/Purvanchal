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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasImages = product.images && product.images.length > 0;

  const showNext = () => {
    setActiveImage((i) => (i + 1) % product.images.length);
  };

  const showPrev = () => {
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  };

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

        {/* Main image — ab click karne par fullscreen khulega */}
        <button
          type="button"
          onClick={() => hasImages && setIsLightboxOpen(true)}
          disabled={!hasImages}
          className="w-full aspect-square sm:aspect-video bg-slate-900 border border-slate-800 rounded-xl relative flex items-center justify-center shadow-md overflow-hidden cursor-zoom-in disabled:cursor-default"
        >
          {hasImages ? (
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
        </button>

        {/* Thumbnails — click se active image badalta hai, aur yeh bhi fullscreen kholta hai */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-3 flex-wrap">
            {product.images.map((url, i) => (
              <button
                key={url + i}
                type="button"
                onClick={() => {
                  setActiveImage(i);
                  setIsLightboxOpen(true);
                }}
                className={`relative h-20 w-20 overflow-hidden rounded-lg bg-white border-2 transition-all ${
                  activeImage === i
                    ? "border-blue-600 shadow-sm"
                    : "border-slate-200 hover:border-slate-400"
                }`}
                aria-label={`View image ${i + 1} full screen`}
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

      {/* Fullscreen lightbox */}
      {isLightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            ✕
          </button>

          {product.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          <div
            className="relative h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={highQualityImage(product.images[activeImage])}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
              quality={95}
            />
          </div>

          {product.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {product.images.length > 1 && (
            <p className="absolute bottom-4 text-xs font-mono text-white/70">
              {activeImage + 1} / {product.images.length}
            </p>
          )}
        </div>
      )}

      {/* Scroll to top widget */}
      <ScrollNut />
    </div>
  );
}