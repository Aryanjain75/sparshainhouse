import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/Resturent";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import shortid from "shortid";

connect();

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
     
      const orders = await User.find({});
      if (!orders.length) {
        console.log(orders);
        return NextResponse.json({ message: 'No orders ' }, { status: 404 });
      }
  
      return NextResponse.json({ orders, message: "Success" }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  