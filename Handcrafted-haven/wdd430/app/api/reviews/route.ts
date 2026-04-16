import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/lib/models/Review";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const filter: { productId?: string } = {};
    if (productId) {
      filter.productId = productId;
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { productId, userId, rating, comment } = body;

    if (!productId || !userId || !rating || !comment) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      productId,
      userId,
      rating: Number(rating),
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Failed to create review." },
      { status: 500 }
    );
  }
}