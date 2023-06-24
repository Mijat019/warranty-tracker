import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    salt: string;
    warrantyIds: string[];
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    warrantyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Warranty" }],
});

export default mongoose.model<IUser>("User", UserSchema);
