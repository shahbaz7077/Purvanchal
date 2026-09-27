// Cloudinary URL mein "/upload/" ke baad quality/format params daal deta hai
export function highQualityImage(url: string): string {
  return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
}