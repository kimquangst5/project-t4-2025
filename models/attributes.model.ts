import mongoose, { Schema } from "mongoose";

const attributeSchema = new Schema(
    {
        name: String,
        array_value: [
          {
               value: String,
               description: String,
          }
        ]
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Attribute = mongoose.model("Attribute", attributeSchema);

export default Attribute;
