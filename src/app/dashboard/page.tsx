import DashboardClient from "@/components/DashboardClient";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);

  return <DashboardClient uid={session?.user.uid ?? ""} />;
}
