"use client";

import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId?: string;
};

type Review = {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  async function loadReviews(id: string) {
    const res = await fetch(`/api/reviews?productId=${id}`);
    if (res.ok) {
      const data = await res.json();
      setReviews(data);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    params.then(async (p) => {
      setProductId(p.id);

      const productRes = await fetch(`/api/products/${p.id}`);
      if (productRes.ok) {
        const productData = await productRes.json();
        setProduct(productData);
      }

      await loadReviews(p.id);
    });
  }, [params]);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setMessage("Please login first.");
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);

    if (parsedUser.role !== "customer") {
      setMessage("Only customers can leave reviews.");
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId: parsedUser._id,
        rating,
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to submit review.");
      return;
    }

    setMessage("Review submitted successfully.");
    setComment("");
    setRating("5");
    await loadReviews(productId);
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        {user?.role === "seller" ? "Product Reviews" : "Product Details"}
      </h1>

      {product && (
        <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="mb-4 h-72 w-full rounded object-cover"
          />
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="mt-2 text-zinc-600">{product.description}</p>
          <p className="mt-3 text-xl font-bold">${product.price}</p>
          <p className="mt-1 text-sm text-zinc-500">Category: {product.category}</p>

          {user?.role !== "seller" && (
            <div className="mt-5">
              <AddToCartButton product={product} />
            </div>
          )}
        </div>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center">
            <p className="text-zinc-600">No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold">Rating: {review.rating}/5</p>
                <p className="mt-2 text-zinc-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {user?.role === "customer" && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Leave a Review</h2>

          <form
            onSubmit={handleReviewSubmit}
            className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <select
              className="w-full rounded border p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>

            <textarea
              className="w-full rounded border p-2"
              placeholder="Write your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              type="submit"
              className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
            >
              Submit Review
            </button>
          </form>
        </section>
      )}

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </main>
  );
}