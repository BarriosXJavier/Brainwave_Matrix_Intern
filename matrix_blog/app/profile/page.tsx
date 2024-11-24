"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setAvatar(session.user.avatar || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar }),
      });
      if (res.ok) {
        await update({ name, avatar });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block mb-1">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {avatar && (
          <div className="mt-4">
            <Image
              src={avatar}
              alt="Avatar preview"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
