import { connect } from "@/dbconfig/dbconfig";
import Address from "@/models/Address";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const { userid, street, city, state, zipCode, country, phoneNo } = await request.json();
        
        if (!userid || !street || !city || !state || !zipCode || !country || !phoneNo) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newAddress = new Address({
            user: userid,
            street,
            city,
            state,
            zipCode,
            country,
            phoneNo:phoneNo,
        });

        await newAddress.save();

        return NextResponse.json({ message: "Address added successfully" }, { status: 201 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
