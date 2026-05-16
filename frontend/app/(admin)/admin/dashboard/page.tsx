import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getCurrentAdminSession } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <AdminDashboard />
    </main>
  );
}
