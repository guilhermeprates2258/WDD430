"use client";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const exists = cart.find((item: Product) => item._id === product._id);

    if (exists) {
      alert("Product already in cart");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 w-fit rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
    >
      Add to Cart
    </button>
  );
}