import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-4 py-2 border rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}
