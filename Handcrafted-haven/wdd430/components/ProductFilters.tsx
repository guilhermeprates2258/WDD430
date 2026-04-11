"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
  "Religious Art",
  "Home Decor",
  "Figurines",
  "Gifts",
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  function applyFilters() {
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (min) params.set("min", min);
    if (max) params.set("max", max);

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMin("");
    setMax("");
    router.push("/");
  }

  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-900">Filter Products</h3>
        <p className="text-sm text-zinc-500">
          Search by name, category, or price range.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="e.g. Jesus Christ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-zinc-900"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="min"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Min Price
          </label>
          <input
            id="min"
            type="number"
            min="0"
            placeholder="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label
            htmlFor="max"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Max Price
          </label>
          <input
            id="max"
            type="number"
            min="0"
            placeholder="100"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-zinc-900"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={applyFilters}
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Apply Filters
        </button>

        <button
          onClick={clearFilters}
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}