import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/BirthdayhallBooking";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Connect to the database
connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, phone, date, time, noOfPeople, message } = await request.json();
    // Validate input
    if (!name || !email || !phone || !date || !time || !noOfPeople || !message) {
      return NextResponse.json({ message: "User details are invalid" }, { status: 404 });
    }
    // Decode the JWT token from cookies
    const token = request.cookies.get("Token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const tokenString = token.value; 
    const decoded = jwt.decode(tokenString) as JwtPayload;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    // Create a new birthday hall booking
    const booking = new User({
      userid: decoded.id,
      name,
      email,
      phone,
      date,
      time,
      noOfPeople,
      message
    });
    // Save the booking to the database
    await booking.save();

    return NextResponse.json({ message: "Booking successful" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
