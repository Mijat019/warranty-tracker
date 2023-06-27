import mongoose, { Document, Schema } from "mongoose";

export interface IWarranty extends Document {
    productName: string;
    labels: string[];
    startDate: Date;
    endDate: Date;
    user: string;
    imageNames: string[];
}

const WarrantySchema = new Schema({
    productName: { type: String },
    labels: { type: [String] },
    startDate: { type: Date },
    endDate: { type: Date },
    imageNames: { type: [String] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Warranty = mongoose.model<IWarranty>("Warranty", WarrantySchema);
