"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
  bio?: string;
  photo?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    photo: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm({
        name: parsed.name || "",
        bio: parsed.bio || "",
        photo: parsed.photo || "",
      });
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        ...form,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to update profile.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    window.dispatchEvent(new Event("authChanged"));
    setMessage("Profile updated successfully.");
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <p>You need to be logged in to view your profile.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]"
      >
        <div className="grid gap-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded border p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              minLength={2}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              className="w-full rounded border p-2 bg-zinc-100"
              value={user.email}
              disabled
              aria-disabled="true"
            />
          </div>

          <div>
            <label htmlFor="photo" className="mb-1 block text-sm font-medium">
              Photo URL
            </label>
            <input
              id="photo"
              type="url"
              className="w-full rounded border p-2"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
            />
          </div>

          {user.role === "seller" && (
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
            </div>
          )}

          <div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Account type: <span className="font-semibold capitalize">{user.role}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-fit rounded bg-[var(--accent-strong)] px-4 py-2 text-white hover:opacity-90"
          >
            Save Profile
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-[var(--foreground)]" role="status">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}