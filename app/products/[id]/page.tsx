import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/products";
import ProductB2BView from "./ProductB2BView";
import type { Product } from "../../../types/product";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductB2BView product={product} />;
}