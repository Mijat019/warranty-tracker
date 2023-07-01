import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    labels: string[];
    warrantyIds: string[];
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    labels: {
        type: [String],
    },
    warrantyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Warranty" }],
});

export const User = mongoose.model<IUser>("User", UserSchema);
