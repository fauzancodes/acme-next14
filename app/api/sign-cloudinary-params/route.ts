import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET
 
  const signature = cloudinary.utils.api_sign_request(paramsToSign, cloudinaryApiSecret ? cloudinaryApiSecret : "");
  
  return Response.json({ signature });
}