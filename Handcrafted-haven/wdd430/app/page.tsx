import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}