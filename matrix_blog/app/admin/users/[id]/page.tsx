"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

export default function EditUser({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={user.isAdmin}
              onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })}
              className="mr-2"
            />
            Is Admin
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
