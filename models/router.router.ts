import mongoose, { Schema } from "mongoose";

const routerSchema = new Schema(
    {
     type: String,
     management_variable: String,
     products: {
          path: String,
          create: String
     }
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Router = mongoose.model("Router", routerSchema);

export default Router;
