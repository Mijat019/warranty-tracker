import mongoose, { Document, Schema } from "mongoose";

export interface IWarranty extends Document {
    productName: string;
    labels: string[];
    startDate: Date;
    endDate: Date;
    user: string;
}

const WarrantySchema = new Schema({
    productName: { type: String },
    labels: { type: [String] },
    startDate: { type: Date },
    endDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<IWarranty>("Warranty", WarrantySchema);
