import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/products";
import { highQualityImage } from "../../../lib/cloudinary-url";

{/* <Image src={highQualityImage(product.images[0])} ... /> */}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <Link href="/products" className="text-sm text-muted hover:underline">
        ← Back to products
      </Link>

      <h1 className="mt-4 text-2xl font-bold capitalize text-navy">
        {product.name}
      </h1>

      {/* Pehli image bari, baaki chhoti thumbnails ki tarah */}
      <div className="mt-6 space-y-3">
  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-blue-50 sm:aspect-video">
    <Image
  src={highQualityImage(product.images[0])}
  alt={product.name}
  fill
  sizes="(min-width: 768px) 700px, 100vw"
  className="object-contain"
  quality={95}
  priority
/>
  </div>

  {product.images.length > 1 && (
    <div className="flex gap-3">
      {product.images.slice(1).map((url, i) => (
        <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg bg-blue-50">
          <Image
            src={url}
            alt={`${product.name} ${i + 2}`}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  )}
</div>

      <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
        {product.info}
      </p>
    </main>
  );
}