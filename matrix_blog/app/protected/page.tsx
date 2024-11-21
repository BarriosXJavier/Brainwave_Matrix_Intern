import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You can only see this page if you are signed in</p>
    </div>
  );
}
