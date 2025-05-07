import mongoose, { Schema } from "mongoose";

const statusSchema = new Schema(
    {
        product_categories: {
            ACTIVE: {
                name: String,
                code: String,
            },
            INACTIVE: {
                name: String,
                code: String,
            },
        },
        branch: {
            ACTIVE: {
                name: String,
                code: String,
            },
            INACTIVE: {
                name: String,
                code: String,
            },
        },
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Status = mongoose.model("Status", statusSchema);

export default Status;
