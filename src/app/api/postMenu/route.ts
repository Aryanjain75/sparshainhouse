import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbconfig/dbconfig";
import { Items } from "@/models/Menu";

connect();

export async function POST(request: NextRequest) {
    try {
        const rs = await request.json();
        console.log(rs);
        const { imageid, discount, cuisine, foodname, price, discounted_price, rating, tags } = rs;
        // Check if any required field is missing
        if (!imageid || !discount || !cuisine || !foodname || price.trim() == "" || discounted_price.trim() == "" ) {
            return NextResponse.json({ message: "Please provide all details" }, { status: 400 });
        }

        const item = new Items({
            "CloudanaryImageId": imageid,
            "DISCOUNT": discount,
            "CUSSINE": cuisine,
            "FOODNAME": foodname,
            "PRICE": price,
            "DISCOUNTED_PRICE": discounted_price,
            "RATINGS": rating || 0, // Default rating to 0 if not provided
            "TAGS": tags || [] // Default tags to empty array if not provided
        });
        
        await item.save();
        return NextResponse.json({ message: "Item added successfully" }, { status: 201 });

    } catch (e: any) {
        console.error(e); // Log the error for debugging purposes
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function OPTIONS(request: NextRequest) {
    return NextResponse.json({}, { status: 204 });
}
