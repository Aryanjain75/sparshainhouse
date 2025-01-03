import { connect } from "@/dbconfig/dbconfig";
import user from "@/models/Registration";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connect();

// Define the interface for the JWT payload
interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { password, newpassword } = await request.json();
    const token = request.cookies.get("Token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Login First" }, { status: 400 });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Sparsha") as JwtPayload;

    const User = await user.findOne({ _id: decoded.id });

    if (!User) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.Password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const newHashedPassword = await bcrypt.hash(newpassword, 10); // Using 10 as salt rounds
    console.log(await user.findOneAndUpdate(
      { _id: User._id },
      {
        $set: {
          Password: newHashedPassword
        },
      }
    ));

    return NextResponse.json({ message: "Password updated" }, { status: 202 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
