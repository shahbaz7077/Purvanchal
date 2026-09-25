export type Product = {
  id: string;
  name: string;
  subtitle: string;
  images: string[]; // Cloudinary URLs
  description: string;
  availability: string;
  featured: boolean;
};