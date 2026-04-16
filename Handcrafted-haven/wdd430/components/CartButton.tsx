"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

function getCartKey() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return "cart_guest";

  const user: User = JSON.parse(storedUser);
  return `cart_${user._id}`;
}

export default function CartButton() {
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
    const cartKey = getCartKey();
    const cart: Product[] = JSON.parse(localStorage.getItem(cartKey) || "[]");
    setCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();

    const handleStorageChange = () => updateCartCount();
    const handleCartUpdated = () => updateCartCount();
    const handleAuthChanged = () => updateCartCount();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("authChanged", handleAuthChanged);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("authChanged", handleAuthChanged);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="fixed right-6 top-6 z-50 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-zinc-700"
    >
      Cart
      {count > 0 && (
        <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}