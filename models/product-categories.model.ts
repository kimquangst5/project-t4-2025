import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-updater";
import Status from "./status.model";

mongoose.plugin(slug);

let ProductCategories;

export async function getProductCategoriesModel() {
    if (ProductCategories) {
        return ProductCategories;
    }

    const statusDoc = await Status.findOne({})
        .select("product_categories")
        .lean();
    const allowedStatuses = statusDoc.product_categories;

    const productCategoriesSchema = new Schema(
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

    ProductCategories = mongoose.model(
        "Product Categories",
        productCategoriesSchema,
    );
    return ProductCategories;
}
