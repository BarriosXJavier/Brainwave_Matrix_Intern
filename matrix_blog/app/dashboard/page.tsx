import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <div>Access Denied</div>;
  }

  const posts = await getUserPosts(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Blog Posts</h1>
      <Link
        href="/posts/new"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Post
      </Link>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">
              {post.published ? "Published" : "Draft"} on{" "}
              {post.createdAt.toLocaleDateString()}
            </p>
            <div className="space-x-2">
              <Link href={`/posts/${post.id}/edit`} className="text-blue-500">
                Edit
              </Link>
              <Link href={`/posts/${post.id}`} className="text-green-500">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
