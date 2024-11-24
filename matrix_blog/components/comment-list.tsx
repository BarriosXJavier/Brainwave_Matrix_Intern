import { Comment } from "@prisma/client";

type CommentWithAuthor = Comment & { author: { name: string } };

export default function CommentList({
  comments,
}: {
  comments: CommentWithAuthor[];
}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b pb-4">
              <p className="mb-1">{comment.content}</p>
              <p className="text-sm text-gray-600">
                By {comment.author.name} on{" "}
                {comment.createdAt.toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
