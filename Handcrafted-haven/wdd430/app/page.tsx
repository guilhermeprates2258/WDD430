import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import HomeHeroActions from "@/components/HomeHeroActions";
import HeroGraphic from "@/components/HeroGraphic";
import type { Metadata } from "next";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sellerId?: string;
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
  const url = query
    ? `${baseUrl}/api/products?${query}`
    : `${baseUrl}/api/products`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse featured artisan-made products, explore categories, and discover handcrafted pieces at Handcrafted Haven.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const products = await getProducts(resolvedSearchParams);

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-10 md:py-14">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Artisan marketplace
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
            Handcrafted Haven
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
            Discover handcrafted pieces made with intention, beauty, and care.
            A calm place to explore meaningful creations from talented artisans.
          </p>

          <HomeHeroActions />
        </div>

        <HeroGraphic />
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Browse artisan-made items and refine your search by category or price.
          </p>
        </div>

        <ProductFilters />

        {products.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-[var(--border-soft)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)]">
            <p className="text-lg font-medium text-[var(--foreground)]">
              No products found
            </p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
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