"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    bio: "",
    photo: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to create account.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChanged"));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while creating the account.");
    }
  }

  const isSeller = form.role === "seller";

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-2xl font-bold">Sign Up</h1>
      <p className="mb-6 text-sm text-[var(--muted-foreground)]">
        Create your account and choose how you want to use the store.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign up form">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded border p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border p-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium">
            Account type
          </label>
          <select
            id="role"
            className="w-full rounded border p-2"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as "customer" | "seller",
              })
            }
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {isSeller && (
          <>
            <div>
              <label htmlFor="photo" className="mb-1 block text-sm font-medium">
                Seller photo URL
              </label>
              <input
                id="photo"
                type="url"
                className="w-full rounded border p-2"
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="bio" className="mb-1 block text-sm font-medium">
                Seller bio
              </label>
              <textarea
                id="bio"
                className="w-full rounded border p-2"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                maxLength={300}
              />
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Share a short story about your craftsmanship.
              </p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full rounded bg-[var(--accent-strong)] px-4 py-2 text-white hover:opacity-90"
        >
          Create Account
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {message}
        </p>
      )}

      <p className="mt-6 text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium underline">
          Login
        </Link>
      </p>
    </main>
  );
}