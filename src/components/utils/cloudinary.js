import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { promisify } from 'util';
import dotenv from "dotenv";
dotenv.config();

const unlinkAsync = promisify(fs.unlink);

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: `${process.env.CLOUDNAME}`, 
    api_key: `${process.env.CLOUDINARYKEYKEY}`, 
    api_secret: `${process.env.CLOUDINARYAPISECREATE}`
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        if (fs.existsSync(localFilePath)) {
            console.log("confirm");
        }
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
          console.log("error");
        }
        throw error;
    }
};
