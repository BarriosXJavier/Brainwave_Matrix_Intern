import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getPosts(page: number, pageSize: number, search?: string) {
  const skip = (page - 1) * pageSize;
  const where = {
    published: true,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);
  return { posts, total };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 6;
  const search = searchParams.search || "";
  const { posts, total } = await getPosts(page, pageSize, search);

  return (
    <div>
      <App />
      <h1 className="text-3xl font-bold mb-6">Latest posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-2">
              By {post.author.name} on {post.createdAt.toLocaleDateString()}
            </p>
            <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
