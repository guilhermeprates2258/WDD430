"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-zinc-600 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="bg-zinc-900 text-white px-6 py-3 rounded-md"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-zinc-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Total: ${total.toFixed(2)}
              </h2>

              <button className="bg-zinc-900 text-white px-6 py-3 rounded-md">
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}