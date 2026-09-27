import { connectDB } from "./mongodb";
import ProductModel from "../models/Product";
import type { Product } from "../types/product";
import { Types } from "mongoose";

type ProductDoc = {
  _id: { toString: () => string };
  name: string;
  info: string;
  images: string[];
  createdAt: Date;
};

function toProduct(doc: ProductDoc): Product {
  return {
    id: doc._id.toString(),
    name: doc.name,
    info: doc.info,
    images: doc.images,
    createdAt: doc.createdAt.toISOString(),
  };
}

// Home page ke liye — sab products
export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const docs = (await ProductModel.find().sort({ createdAt: -1 }).lean()) as unknown as ProductDoc[];
  return docs.map(toProduct);
}

// /products page ke liye — search + pagination
export async function getPaginatedProducts({
  search = "",
  page = 1,
  limit = 9
}: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; total: number; totalPages: number }> {
  await connectDB();

  // Case-insensitive, name ke kisi bhi hisse se match — "similar" naam dhund leta hai
  const filter = search ? { name: { $regex: search, $options: "i" } } : {};

  const total = await ProductModel.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const docs = (await ProductModel.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()) as unknown as ProductDoc[];

  return { products: docs.map(toProduct), total, totalPages };
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  await connectDB();
  const doc = (await ProductModel.findById(id).lean()) as unknown as ProductDoc | null;

  return doc ? toProduct(doc) : null;
}