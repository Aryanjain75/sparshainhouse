import { connect } from "@/dbconfig/dbconfig";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("Token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tokenString = token.value; // Convert the RequestCookie to a string
    const decoded = jwt.decode(tokenString) as JwtPayload;

    if (!decoded || typeof decoded !== 'object') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ username: decoded.name });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
