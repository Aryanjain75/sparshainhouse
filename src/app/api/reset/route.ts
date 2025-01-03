import { connect } from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import user from "@/models/Registration";

connect();

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { token, password } = res;

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const foundUser = await user.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!foundUser) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    foundUser.Password = password;
    foundUser.forgetPasswordToken = undefined;
    foundUser.forgetPasswordTokenExpiry = undefined;
    await foundUser.save();

    return NextResponse.json({ message: "Password successfully reset" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
