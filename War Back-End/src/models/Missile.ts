import mongoose, { Schema, Document } from "mongoose";

export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

const MissileSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  speed: { type: Number, required: true },
  intercepts: [{ type: String }],
  price: { type: Number, required: true },
});

export default mongoose.model<IMissile>("Missile", MissileSchema);
