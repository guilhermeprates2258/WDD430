"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sellerId?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

export default function ProductCard({ product }: { product: Product }) {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

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

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to delete product.");
      return;
    }

    router.refresh();
  }

  const isSeller = user?.role === "seller";
  const isOwner = isSeller && user?._id === product.sellerId;

  const detailsLabel = isSeller ? "Reviews" : "View Details";
  const sellerLabel = isSeller ? "See Other Products" : "View Seller";

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-[var(--muted-foreground)]">{product.category}</p>

        <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
          {product.name}
        </h3>

        <p className="mt-2 text-xl font-bold text-[var(--foreground)]">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/products/${product._id}`}
            className="inline-block rounded-md bg-[var(--accent-strong)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            {detailsLabel}
          </Link>

          {product.sellerId && (
            <Link
              href={`/seller/${product.sellerId}`}
              className="inline-block rounded-md border border-[var(--border-soft)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-2)]"
            >
              {sellerLabel}
            </Link>
          )}
        </div>

        {isOwner ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/dashboard/edit-product/${product._id}`}
              className="rounded-md border border-[var(--border-soft)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-2)]"
            >
              Edit Product
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete Product
            </button>
          </div>
        ) : !isSeller ? (
          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        ) : null}

        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}