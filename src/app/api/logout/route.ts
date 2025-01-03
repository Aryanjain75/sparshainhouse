import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({ "Logout": "Successful" });
        response.cookies.set("Token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (e: any) {
        return NextResponse.json({ "error": e.message }, { status: 500 });
    }
}
