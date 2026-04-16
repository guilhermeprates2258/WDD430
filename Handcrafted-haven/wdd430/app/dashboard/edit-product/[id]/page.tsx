"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [productId, setProductId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    params.then(async (p) => {
      setProductId(p.id);

      const res = await fetch(`/api/products/${p.id}`);
      const data: Product = await res.json();

      if (res.ok) {
        setForm({
          name: data.name,
          description: data.description,
          price: String(data.price),
          image: data.image,
          category: data.category,
        });
      }
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to update product.");
      return;
    }

    setMessage("Product updated successfully.");
    router.push(`/products/${productId}`);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
        <input
          className="w-full rounded border p-2"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="w-full rounded border p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full rounded border p-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
        >
          Save Changes
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </main>
  );
}