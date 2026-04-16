"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

export default function UserActions() {
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

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/";
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-zinc-600">
        Welcome, <span className="font-semibold text-zinc-900">{user.name}</span>
      </span>

      <Link
        href="/profile"
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
      >
        Profile
      </Link>

      {user.role === "seller" && (
        <Link
          href="/dashboard/add-product"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add Product
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
}