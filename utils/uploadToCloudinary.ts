// function for upload file / img to cloudinary
import { v2 as cloudinary } from 'cloudinary';
const uploadToCloudinary = async (file: any) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDIANRY_CLOUD_NAME,
        api_key: process.env.CLOUDIANRY_API_KEY,
        api_secret: process.env.CLOUDIANRY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    console.log('in upload to cloudinary and this is file', file);
    const result = await cloudinary.uploader.upload(file.path,
        {
            public_id: 'posts',
            folder: 'tiles image',
        }
    )
    return(result.secure_url);
}

export default uploadToCloudinary;
