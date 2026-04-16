import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sellerId?: string;
};

type Seller = {
  _id: string;
  name: string;
  bio?: string;
  photo?: string;
};

async function getSellerProducts(id: string): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products?sellerId=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch seller products.");
  }

  return res.json();
}

async function getSeller(id: string): Promise<Seller | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SellerProfilePage({ params }: Props) {
  const { id } = await params;
  const [products, seller] = await Promise.all([
    getSellerProducts(id),
    getSeller(id),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <img
            src={seller?.photo || "https://via.placeholder.com/120?text=Seller"}
            alt={seller?.name ? `${seller.name} profile photo` : "Seller profile photo"}
            className="h-24 w-24 rounded-full object-cover border border-[var(--border-soft)]"
          />

          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Seller Profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
              {seller?.name || "Artisan"}
            </h1>
            <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
              {seller?.bio || "This artisan shares handcrafted pieces with care and creativity."}
            </p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-[var(--border-soft)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)]">
          <p className="text-lg font-medium text-[var(--foreground)]">
            No products found for this seller.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}