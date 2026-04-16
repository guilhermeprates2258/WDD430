"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setMessage("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "seller") {
      setMessage("Only sellers can add products.");
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        sellerId: user._id || user.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to add product.");
      return;
    }

    setMessage("Product added successfully.");
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2 rounded" type="submit">
          Add Product
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}