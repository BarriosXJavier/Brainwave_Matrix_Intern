"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleOAuthSignIn = async (provider: string) => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        console.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="space-y-4">
        <button
          onClick={() => handleOAuthSignIn("google")}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleOAuthSignIn("github")}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
