import mongoose, { Schema } from "mongoose";

const assetsSchema = new Schema(
    {
        asset_id: String,
        public_id: String,
        version: Number,
        version_id: String,
        signature: String,
        width: Number,
        height: Number,
        format: String,
        resource_type: String,
        tags: Array,
        pages: Number,
        bytes: Number,
        type: String,
        etag: String,
        placeholder: Number,
        url: String,
        secure_url: String,
        asset_folder: String,
        display_name: String,
        original_filename: String,
        api_key: String,
        preview_id: String,
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Assets = mongoose.model("Asset", assetsSchema);

export default Assets;
