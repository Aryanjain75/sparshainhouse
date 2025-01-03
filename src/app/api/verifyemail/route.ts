import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import user from "@/models/Registration";

connect();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        console.log(await user.find({}));
        const foundUser = await user.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!foundUser) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        foundUser.isVerified = true;
        foundUser.verifyToken = undefined;
        foundUser.verifyTokenExpiry = undefined;
        await foundUser.save();

        return NextResponse.json({ message: "Email successfully verified" });
    } catch (e: any) {
        console.error("Error:", e);
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
