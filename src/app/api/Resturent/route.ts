import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Resturent";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import shortid from "shortid";

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, phone, date, time, noOfPeople, message } = await request.json();
    if (!name || !email || !phone || !date || !time || !noOfPeople || !message) {
      return NextResponse.json({ message: "User details are invalid" }, { status: 404 });
    }
    const token = request.cookies.get("Token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const tokenString = token.value;
    const decoded = jwt.decode(tokenString) as JwtPayload;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const orderid = shortid.generate();

    const booking = new User({
      orderid,
      userid: decoded.id,
      name,
      email,
      phone,
      date,
      time,
      noOfPeople,
      message
    });
    await booking.save();

    return NextResponse.json({ message: "Booking successful" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("Token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const tokenString = token.value;
    const decoded = jwt.decode(tokenString) as JwtPayload;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
   
    const orders = await User.find({ email: decoded.email });
    console.log(orders);
    if (!orders.length) {
      console.log(orders);
      return NextResponse.json({ message: 'No orders found for this email' }, { status: 404 });
    }

    return NextResponse.json({ orders, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
