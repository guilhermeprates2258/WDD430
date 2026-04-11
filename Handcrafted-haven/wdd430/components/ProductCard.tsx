import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-zinc-500">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-zinc-900">
          {product.name}
        </h3>
        <p className="mt-2 text-xl font-bold text-zinc-800">
          ${product.price.toFixed(2)}
        </p>

        <Link
          href={`/products/${product._id}`}
          className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}