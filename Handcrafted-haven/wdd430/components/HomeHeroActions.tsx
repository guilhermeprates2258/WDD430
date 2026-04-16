"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

export default function HomeHeroActions() {
  const [user, setUser] = useState<User | null>(null);

  function loadUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    loadUser();

    const handleAuthChanged = () => loadUser();
    const handleStorageChange = () => loadUser();

    window.addEventListener("authChanged", handleAuthChanged);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!user) {
    return (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/login"
          className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  if (user.role === "seller") {
    return (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/dashboard/add-product"
          className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add Product
        </Link>

        <Link
          href={`/seller/${user._id}`}
          className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          See My Products
        </Link>
      </div>
    );
  }

  return null;
}