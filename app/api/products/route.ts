import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import ProductModel from "../../../models/Product";
import { getPaginatedProducts } from "../../../lib/products";
// GET /api/products?search=chain&page=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");

    const data = await getPaginatedProducts({ search, page, limit: 9 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/products failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
c
