import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";

import {billItems} from "@/models/billing";
// Connect to the database
connect();
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        // Fix: Use orderid directly in query instead of trying to use it as _id
        const items = await billItems.findOne({orderid: id});
        return NextResponse.json({ message: items }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
