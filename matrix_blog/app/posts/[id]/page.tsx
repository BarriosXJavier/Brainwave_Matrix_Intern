import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import SocialShare from "@/components/social-share";

const prisma = new PrismaClient();

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, comments: { include: { author: true } } },
  });
  return post;
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const session = await getServerSession(authOptions);

  if (!post) {
    return <div>Post not found</div>;
  }

  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author.name} on {post.createdAt.toLocaleDateString()}
      </p>
      <div className="prose mb-8">{post.content}</div>
      <SocialShare url={postUrl} title={post.title} />
      <CommentList comments={post.comments} />
      {session && <CommentForm postId={post.id} />}
    </div>
  );
}
