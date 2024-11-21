"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [matrixText, setMatrixText] = useState("");

  useEffect(() => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";
    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 50; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      setMatrixText(result);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl whitespace-nowrap"
              style={{
                top: `${i * 10}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: "matrix-fall 10s linear infinite",
              }}
            >
              {matrixText}
            </div>
          ))}
        </div>
        <div className="z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">MatrixBlog</h1>
          <p className="text-xl mb-8">Decoding the Digital Realm</p>
          <Button className="bg-green-500 text-black hover:bg-green-600">
            Enter the Matrix
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About MatrixBlog</h2>
          <p className="text-lg mb-8">
            Dive into the digital undercurrents of our world. MatrixBlog is your
            portal to understanding the intricate web of technology, philosophy,
            and culture that shapes our digital existence.
          </p>
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Illusion of Digital Privacy",
                description: "Unraveling the myths of online anonymity.",
              },
              {
                title: "Quantum Computing: A New Paradigm",
                description: "Exploring the future of computational power.",
              },
              {
                title: "The Ethics of AI",
                description:
                  "Navigating the moral maze of artificial intelligence.",
              },
            ].map((post, index) => (
              <Card key={index} className="bg-gray-800 border-green-500">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="link"
                    className="text-green-500 hover:text-green-400"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Resistance</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter and stay updated with the latest in the
            digital underground.
          </p>
          <form className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black border-green-500 text-green-500 placeholder-green-700"
            />
            <Button
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-green-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} MatrixBlog. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
