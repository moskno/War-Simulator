import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  region: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
