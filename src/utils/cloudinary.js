import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

const uploadonCloudinary = async (filePath) => {
    if(!filePath) {
        console.error("No file path provided for upload.");
        return null;
    }
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            public_id: "sample_image",
            resource_type: "image"
        });
        console.log("file uploaded successfully", result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(filePath); // Delete the file if upload fails
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
}

export { uploadonCloudinary };