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

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;