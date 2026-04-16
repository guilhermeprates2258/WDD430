import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password, role, bio, photo } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All required fields must be filled in." },
        { status: 400 }
      );
    }

    if (!["customer", "seller"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must have at least 2 characters." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must have at least 6 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toLowerCase())) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role,
      bio: bio?.trim() || "",
      photo: photo?.trim() || "",
    });

    return NextResponse.json(
      {
        message: "User created successfully.",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Failed to register user." },
      { status: 500 }
    );
  }
}