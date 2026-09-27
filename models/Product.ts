import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    info: { type: String, required: true, trim: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length >= 1 && arr.length <= 4,
        message: "Upload between 1 and 4 images",
      },
    },
  },
  { timestamps: true }
);

// Next.js dev mein model dobara define na ho, is liye check karte hain
export const ProductModel = models.Product || model("Product", ProductSchema);
export default ProductModel;
export type { mongoose };