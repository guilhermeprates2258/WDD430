"use client";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sellerId?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller";
};

function getCartKey() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return "cart_guest";

  const user: User = JSON.parse(storedUser);
  return `cart_${user._id}`;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const handleAddToCart = () => {
    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const exists = cart.find((item: Product) => item._id === product._id);

    if (exists) {
      alert("Product already in cart");
      return;
    }

    cart.push(product);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
    >
      Add to Cart
    </button>
  );
}