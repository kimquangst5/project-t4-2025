import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-updater";
import Status from "./status.model";

mongoose.plugin(slug);

let Branch: any;

export async function getBranchModel() {
    if (Branch) {
        return Branch;
    }

    const statusDoc = await Status.findOne({}).select("branch").lean();
    const allowedStatuses = statusDoc.branch;

    const branchSchema = new Schema(
        {
            name: { type: String, required: true },
            slug: {
                type: String,
                slug: "name",
                unique: true,
                slugPaddingSize: 3,
            },
            deleted: {
                type: Boolean,
                default: false,
            },
            status: {
                type: String,
                default: allowedStatuses.ACTIVE.code,
                required: true,
            },
            description: String,
            thumbnail: String,
        },
        {
            timestamps: true,
            autoCreate: true,
            autoIndex: true,
        },
    );

    Branch = mongoose.model("Branch", branchSchema);
    return Branch;
}
