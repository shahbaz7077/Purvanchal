import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/products";
import ProductB2BView from "./ProductB2BView";

type PageProps = {
  params: Promise<{ id: string }>;
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${product.name} - Industrial Product`,

    description: product.info.slice(0, 155),

    openGraph: {
      title: product.name,
      description: product.info.slice(0, 155),
      images: product.images?.[0]
        ? [product.images[0]]
        : [],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductB2BView product={product} />;
}