import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import user from "@/models/Registration";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARYKEYKEY,
  api_secret: process.env.CLOUDINARYAPISECREATE,
});

connect();

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const id = formData.get("id") as string;
    const file = formData.get("image") as File;

    if (!name || !email || !id || !file) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public/uploads");

    // Ensure the `public/uploads` directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save the image to the `public/uploads` directory
    const filePath = path.join(uploadsDir, `${Date.now()}-${file.name}`);
    const fileBuffer = new Uint8Array(await file.arrayBuffer()); // Fixed conversion
    fs.writeFileSync(filePath, fileBuffer);

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "user-avatars",
    });

    // Clean up: Remove the local file after uploading to Cloudinary
    fs.unlinkSync(filePath);

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { error: "Failed to upload image to Cloudinary." },
        { status: 500 }
      );
    }

    // Update the user profile in the database
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { $set: { name, email, url: uploadResult.secure_url } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

