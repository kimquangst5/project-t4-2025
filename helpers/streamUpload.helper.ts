import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import path from "path";
export default (buffer: Buffer, filename: any) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const noSuffix = filename.split(":upload:")[0];
    const Suffix = filename.split(":upload:")[1];
    // 2. Lấy ra phần tên (loại luôn phần extension nếu có)
    const { name: cleanName } = path.parse(noSuffix);

    return new Promise((resolve: any, reject: any) => {
        let stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "Kim_Quang",
                public_id: `${cleanName}-${Date.now()}`,
                use_filename: true,
                unique_filename: false,
                format: "webp",
            },
            (error, result) => {
                if (result) {
                  result["preview_id"] = Suffix;
                    resolve(result);
                } else {
                    reject(error);
                }
            },
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};
