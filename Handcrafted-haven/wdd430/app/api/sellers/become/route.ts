import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "seller" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Seller account created successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Become seller error:", error);
    return NextResponse.json(
      { message: "Failed to update account." },
      { status: 500 }
    );
  }
}