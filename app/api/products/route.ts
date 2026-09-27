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

// POST /api/products -> create a product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, info, images } = body as { name?: string; info?: string; images?: string[] };

    if (!name || !info || !images || images.length === 0) {
      return NextResponse.json(
        { error: "name, info and at least 1 image are required" },
        { status: 400 }
      );
    }
    if (images.length > 4) {
      return NextResponse.json({ error: "Maximum 4 images allowed" }, { status: 400 });
    }

    await connectDB();
    const created = await ProductModel.create({ name, info, images });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/products failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/products?id=xxxxx -> delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await ProductModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}