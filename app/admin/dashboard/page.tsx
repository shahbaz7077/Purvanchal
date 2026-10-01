import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminToken } from "../../../lib/auth";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!verifyAdminToken(token)) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 px-6">
      <h1 className="text-xl font-bold text-blue-950">Admin Panel</h1>

      <Link
        href="/addProduct"
        className="w-full max-w-xs rounded-lg bg-blue-700 px-6 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
      >
        Add Product
      </Link>

      <Link
        href="/deleteProduct"
        className="w-full max-w-xs rounded-lg border-2 border-red-200 px-6 py-3 text-center text-sm font-bold text-red-600 hover:bg-red-50"
      >
        Delete Product
      </Link>
    </main>
  );
}