"use client";

import { useState } from "react";

export default function BecomeSellerPage() {
  const [message, setMessage] = useState("");

  async function handleBecomeSeller() {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setMessage("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await fetch("/api/sellers/become", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to become a seller.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    setMessage("You are now a seller.");
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Seller Account</h1>

      <button
        onClick={handleBecomeSeller}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Become a Seller
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}