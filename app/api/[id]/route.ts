import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import ProductModel from "../../../models/Product";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  const deleted = await ProductModel.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}