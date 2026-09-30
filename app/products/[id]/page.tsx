import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/products";
import ProductB2BView from "./ProductB2BView";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return <ProductB2BView product={product} />;
}