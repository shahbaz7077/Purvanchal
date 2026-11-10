import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://purvanchal-1.vercel.app";
  const products = await getAllProducts(); // DB se
  return [
    { url: base, lastModified: new Date() },
    ...products.map((p) => ({
      url: `${base}/products/${p.id}`,
      lastModified: p.updatedAt,
    })),
  ];
}