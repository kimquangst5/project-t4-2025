import mongoose, { Schema } from "mongoose";
// import slug from "mongoose-slug-updater";
const productsSchema = new Schema(
    {
        name: String,
        slug: String,
        categories: [mongoose.SchemaTypes.ObjectId],
        brands: [mongoose.SchemaTypes.ObjectId],
        featured: Boolean,
        description_content: String,
        description_short: String,
        post_tags: [String],
        seo_information: {
            title: String,
            description: String,
            keyword: [String],
        },
        number_of_attributes: Number,
        atribute_1: mongoose.SchemaTypes.ObjectId,
        atribute_2: mongoose.SchemaTypes.ObjectId,
        tier_variations: [
            {
                atribute_value_1: mongoose.SchemaTypes.ObjectId,
                atribute_value_2: mongoose.SchemaTypes.ObjectId,
                status: Boolean,
                SKU: String,
                price_before_discount: Number,
                price_after_discount: Number,
                stock: Number,
                position: Number,
            },
        ],
        images: [
            {
                assets_id: mongoose.SchemaTypes.ObjectId,
                position: Number,
                attribute_1_id: mongoose.SchemaTypes.ObjectId,
                attribute_1_value: mongoose.SchemaTypes.ObjectId,
            },
        ],
        price_min_before: Number,
        price_max_before: Number,
        price_min_after: Number,
        price_max_after: Number,
    },
    {
        timestamps: true,
        autoCreate: true,
    },
);

productsSchema.pre("save", function (next) {
    // Nếu mảng tier_variations không thay đổi thì bỏ qua
    if (!this.isModified("tier_variations")) return next();

    const vars = this.tier_variations || [];
    if (vars.length) {
        // Trích mảng giá để tính
        const beforePrices = vars.map((v) => v.price_before_discount);
        const afterPrices = vars.map((v) => v.price_after_discount);
        // Tính min/max (có thể dùng Math.min/Math.max với spread, hoặc reduce nếu mảng lớn)
        this.price_min_before = Math.min(...beforePrices);
        this.price_max_before = Math.max(...beforePrices);
        this.price_min_after = Math.min(...afterPrices);
        this.price_max_after = Math.max(...afterPrices);
    } else {
        // Nếu không có phần tử nào, gán giá trị mặc định (ví dụ null hoặc 0)
        this.price_min_before = null;
        this.price_max_before = null;
        this.price_min_after = null;
        this.price_max_after = null;
    }
    next();
});

// mongoose.plugin(slug);
const Product = mongoose.model("Products", productsSchema);

export default Product;
