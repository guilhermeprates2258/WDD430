import { notFound } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

async function getProduct(id: string): Promise<Product | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product.");
  }

  return response.json();
}

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-zinc-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-zinc-900">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-zinc-800">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-7 text-zinc-600">
            {product.description}
          </p>

          <button className="mt-8 w-fit rounded-md bg-zinc-900 px-6 py-3 text-white transition hover:bg-zinc-700">
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}