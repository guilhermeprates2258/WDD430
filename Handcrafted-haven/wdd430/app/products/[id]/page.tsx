import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

async function getProducts(): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getProducts();

  const product = products.find((item) => item._id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          ← Back to products
        </Link>

        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-md md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[500px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-zinc-900">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-bold text-zinc-800">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 leading-7 text-zinc-600">
              {product.description ||
                "This handcrafted product was carefully created to bring charm, quality, and uniqueness to your collection."}
            </p>

            <button className="mt-8 w-fit rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700">
              <AddToCartButton product={product} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}