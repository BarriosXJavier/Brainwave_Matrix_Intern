import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getAdminData() {
  const [users, posts] = await Promise.all([
    prisma.user.findMany(),
    prisma.post.findMany({ include: { author: true } }),
  ]);
  return { users, posts };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return <div>Access Denied</div>;
  }

  const { users, posts } = await getAdminData();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul className="divide-y">
          {users.map((user) => (
            <li key={user.id} className="py-2">
              <span>
                {user.name} ({user.email})
              </span>
              <Link
                href={`/admin/users/${user.id}`}
                className="ml-4 text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id} className="py-2">
              <span>
                {post.title} by {post.author.name}
              </span>
              <Link
                href={`/admin/posts/${post.id}`}
                className="ml-4 text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
