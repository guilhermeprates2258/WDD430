import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
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

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-6xl text-center">
        <h1 className="text-4xl font-bold text-zinc-900">
          Handcrafted Haven
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Discover unique handmade creations from talented artisans.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-zinc-600">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}