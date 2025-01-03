import bcrypt from 'bcryptjs';
import { connect } from "@/dbconfig/dbconfig";
import user from "@/models/Registration";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { Email, Password } = await request.json();
    const User = await user.findOne({ Email });

    if (!User) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    if (!User.isVerified) {
      return NextResponse.json({ error: "User not verified. Please check your email to verify your account." }, { status: 403 });
    }

    const isPasswordCorrect = await bcrypt.compare(Password, User.Password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
    }

    // Log the JWT secret to ensure it is being loaded correctly
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const payload = { id: User._id, name: User.Name, email: User.Email, isAdmin: User.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'Sparsha', { expiresIn: '1d' });

    const response = NextResponse.json({ isadmin: User.isAdmin, username: User.Name }, { status: 200 });
    response.cookies.set("Token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
