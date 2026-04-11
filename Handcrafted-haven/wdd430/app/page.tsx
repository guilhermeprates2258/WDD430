import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type SearchParams = {
  search?: string;
  category?: string;
  min?: string;
  max?: string;
};

async function getProducts(searchParams: SearchParams): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const params = new URLSearchParams();

  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.category) params.set("category", searchParams.category);
  if (searchParams.min) params.set("min", searchParams.min);
  if (searchParams.max) params.set("max", searchParams.max);

  const query = params.toString();
  const url = query ? `${baseUrl}/api/products?${query}` : `${baseUrl}/api/products`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const products = await getProducts(resolvedSearchParams);

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
        <ProductFilters />

        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
            <p className="text-lg font-medium text-zinc-800">No products found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try changing the search term, category, or price range.
            </p>
          </div>
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