import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYKEYKEY,
    api_secret: process.env.CLOUDINARYAPISECREATE
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const { userId }: { userId: string } = await request.json();
        if (!userId) {
            return NextResponse.json({ error: "Please login first" }, { status: 401 });
        }

        // Additional processing code here...

    } catch (e: any) {
        return NextResponse.json({ error: "Sorry, server is down", details: e.message }, { status: 500 });
    }
}
