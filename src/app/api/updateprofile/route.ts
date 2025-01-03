import { NextResponse, NextRequest } from 'next/server';
import { connect } from "@/dbconfig/dbconfig";
import { uploadOnCloudinary } from "@/components/utils/cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import user from "@/models/Registration";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single('image'));

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: 'devj7oonz', 
  api_key: '651936225214174', 
  api_secret: 'Xk32-a3iLAGMf7Iv5o3DwVaDk9w'
});

connect();

export async function PUT(request: NextRequest) {
  try {
    const form = await request.formData();
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const id = form.get('id') as string;
    const file = form.get('image');

    let image: string | null = null;

    if (file && file instanceof Blob) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const filePath = `public/uploads/${file.name}`;
      fs.writeFileSync(filePath, fileBuffer);

      const uploader = async (path: string) => await uploadOnCloudinary(path);
      const avatarResponse = await uploader(String(file));

      if (avatarResponse) {
        image = avatarResponse.secure_url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }

      // Remove the file after upload
      fs.unlinkSync(filePath);
    }
    else{
      console.log("data incomplete"+form);
    }

    const data = {
      name,
      email,
      image,
    };

    console.log(data);
    const res = await user.findOneAndUpdate(
      { _id: id },
      { $set: { url: image, name, email } },
      { new: true }
    );

    if (!res) {
      throw new Error("User not found");
    }

    return NextResponse.json({ message: "Profile updated successfully", data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
