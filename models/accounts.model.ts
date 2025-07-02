import mongoose, { Schema } from "mongoose";
import { STATUS_ACCOUNT } from "../constants/status.const";

const account_schema = new Schema(
    {
        username: {
          type: String,
          unique: true
        },
        password: String,
        status: {
            type: Number,
            default: STATUS_ACCOUNT.ACTIVE,
        },
        token: String
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    },
);

const Accounts = mongoose.model("Admin Account", account_schema);

export default Accounts;
