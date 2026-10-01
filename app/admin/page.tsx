import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../lib/auth";
import AdminLoginForm from "./AdminLoginForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // Pehle se login hai to seedha dashboard
  if (verifyAdminToken(token)) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}