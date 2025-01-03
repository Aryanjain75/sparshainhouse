import { connect } from "@/dbconfig/dbconfig";
import { Items } from "@/models/Menu";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const tagSet = new Set();
        const response = await Items.find({});
        response.forEach(item => {
            item.TAGS.forEach(tag => {
                tagSet.add(tag);
            });
        });
        const uniqueTags = Array.from(tagSet);
        return NextResponse.json(uniqueTags);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
