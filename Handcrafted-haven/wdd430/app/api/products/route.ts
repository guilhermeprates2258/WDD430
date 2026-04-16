import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const sellerId = searchParams.get("sellerId");

    const filter: any = {};

    // filtro por nome
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // filtro por categoria
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    // filtro por preço
    if (min || max) {
      filter.price = {};

      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    // filtro por vendedor
    if (sellerId) {
      filter.sellerId = sellerId;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, description, price, image, category, sellerId } = body;

    if (!name || !description || !price || !image || !category || !sellerId) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      description,
      price: Number(price),
      image,
      category,
      sellerId,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product." },
      { status: 500 }
    );
  }
}