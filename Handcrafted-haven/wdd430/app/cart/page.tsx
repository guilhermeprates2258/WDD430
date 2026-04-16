"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

function getCartKey() {
  if (typeof window === "undefined") return "cart_guest";

  const storedUser = localStorage.getItem("user");
  if (!storedUser) return "cart_guest";

  const user: User = JSON.parse(storedUser);
  return `cart_${user._id}`;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const cartKey = getCartKey();
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function removeFromCart(id: string) {
    const cartKey = getCartKey();
    const updatedCart = cart.filter((item) => item._id !== id);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)]">
          <p className="text-[var(--muted-foreground)]">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)] md:flex-row md:items-center"
            >
              <img
                src={product.image}
                alt={`${product.name} product image`}
                className="h-28 w-full rounded-xl object-cover md:w-32"
              />

              <div className="flex-1">
                <p className="text-sm text-[var(--muted-foreground)]">
                  {product.category}
                </p>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
              </div>

              <button
                onClick={() => removeFromCart(product._id)}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="mt-3 text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </main>
  );
}