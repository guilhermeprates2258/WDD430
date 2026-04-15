import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-md">
        <h1 className="text-3xl font-bold text-zinc-900">Product not found</h1>
        <p className="mt-4 text-zinc-600">
          The product you are looking for does not exist or is no longer available.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-700"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}