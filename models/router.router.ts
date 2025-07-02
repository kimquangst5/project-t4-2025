import mongoose, { Schema } from "mongoose";

const routerSchema = new Schema(
    {
        type: String,
        management_variable: String,
        routers: {
            path: String,
            index: {
                name: String,
                title: String,
                description: String,
                keyword: [String],
            },
            update: {
                name: String,
            },
        },
        products: {
            path: String,
            create: {
                name: String,
                title: String,
                description: String,
                keyword: [String],
                post: String,
            },
        },
        login: {
            name: String,
            title: String,
            description: String,
            keyword: [String],
            patch: String,
        },
        accounts: {
            path: String,
            create: {
                name: String,
                title: String,
                description: String,
                keyword: [String],
                post: String
            },
        },
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Router = mongoose.model("Router", routerSchema);

export default Router;
