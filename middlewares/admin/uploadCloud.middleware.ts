import { NextFunction, Request, Response } from "express";
import streamUploadHelper from "../../helpers/streamUpload.helper";
import Assets from "../../models/assets.model";

const image_multiple = async (req: Request, res: Response, next: NextFunction) => {
     for (const file of req["files"]) {
         let filename = Buffer.from(file.originalname, "latin1").toString(
             "utf8",
         );
         const upload = async (buffer: Buffer) => {
             let result = await streamUploadHelper(buffer, filename);
             const newAssets = new Assets(result);
             await newAssets.save();
         };

         await upload(file.buffer);
     }
     next();
}

export { image_multiple };