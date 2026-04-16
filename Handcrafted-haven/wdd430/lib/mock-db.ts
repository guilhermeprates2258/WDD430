export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "seller";
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sellerId: string;
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
};

export const users: User[] = [
  {
    id: "u1",
    name: "Guilherme",
    email: "gui@email.com",
    password: "123456",
    role: "user",
  },
  {
    id: "u2",
    name: "Luis",
    email: "luis@email.com",
    password: "123456",
    role: "seller",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Modern Lamp",
    description: "A stylish handmade lamp.",
    price: 49.99,
    image: "https://via.placeholder.com/300",
    sellerId: "u2",
  },
];

export const reviews: Review[] = [];