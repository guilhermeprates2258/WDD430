import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;