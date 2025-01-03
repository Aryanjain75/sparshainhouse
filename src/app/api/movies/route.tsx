import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import movies from "@/models/movies";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

connect();

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'devj7oonz',
    api_key: '651936225214174',
    api_secret: 'Xk32-a3iLAGMf7Iv5o3DwVaDk9w'
});

export async function POST(request: NextRequest) {
    try {
        const res = await request.json();
        const { titleText, titleType, originalTitleText, primaryImage, heros, releaseYear, ratingsSammary, runtime, certificateratting, canRate, titleGenres } = res;
        const RunTime = Number(runtime);
        let image: string | null = null;

        // Validation checks
        if (!titleText) return NextResponse.json({ error: "Please provide title" }, { status: 404 });
        if (!titleType) return NextResponse.json({ error: "Please provide title type" }, { status: 404 });
        if (!originalTitleText) return NextResponse.json({ error: "Please provide movie name" }, { status: 404 });
        if (!heros || !Array.isArray(heros) || heros.length === 0) return NextResponse.json({ error: "Please provide heros" }, { status: 404 });
        if (!releaseYear) return NextResponse.json({ error: "Please provide year" }, { status: 404 });
        if (!ratingsSammary) return NextResponse.json({ error: "Please provide rating" }, { status: 404 });
        if (typeof RunTime !== 'number' || RunTime <= 0) return NextResponse.json({ error: "Please provide a valid runtime" }, { status: 404 });
        if (!certificateratting) return NextResponse.json({ error: "Please provide certificate rating" }, { status: 404 });
        if (typeof canRate !== 'boolean') return NextResponse.json({ error: "Please provide rating option" }, { status: 404 });
        if (!titleGenres || !Array.isArray(titleGenres) || titleGenres.length === 0) return NextResponse.json({ error: "Please provide genres" }, { status: 404 });

        // Handling primaryImage
        if (typeof primaryImage === 'string') {
            const isCloudinaryUrl = primaryImage.startsWith('https://res.cloudinary.com/');
            if (isCloudinaryUrl) {
                image = primaryImage;
            } else {
                throw new Error("Invalid image URL");
            }
        } else if (primaryImage && primaryImage instanceof File) {
            const fileBuffer = Buffer.from(await primaryImage.arrayBuffer());
            const filePath = `public/uploads/${primaryImage.name}`;
            await fs.promises.writeFile(filePath, fileBuffer);

            const avatarResponse = await uploadOnCloudinary(filePath);
            if (avatarResponse) {
                image = avatarResponse.secure_url;
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }

            // Remove the file after upload
            await fs.promises.unlink(filePath);
        }

        const Movies = new movies({
            titleText,
            titleType,
            originalTitleText,
            primaryImage: image,
            heros,
            releaseYear,
            ratingsSammary,
            runtime: RunTime,
            certificateratting,
            canRate,
            titleGenres
        });

        await Movies.save();
        return NextResponse.json({ message: "Successful" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const res = await movies.find({});

        return NextResponse.json({ res }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
