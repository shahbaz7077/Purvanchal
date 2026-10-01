import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../lib/auth";
import DeleteProductForm from "./DeleteProductForm";

export default async function DeleteProductPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!verifyAdminToken(token)) {
    redirect("/admin");
  }

  return <DeleteProductForm />;
}