import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { userId, name, bio, photo } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must have at least 2 characters." },
        { status: 400 }
      );
    }

    if (bio && bio.length > 300) {
      return NextResponse.json(
        { message: "Bio must be 300 characters or less." },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        bio: bio?.trim() || "",
        photo: photo?.trim() || "",
      },
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
        message: "Profile updated successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile." },
      { status: 500 }
    );
  }
}