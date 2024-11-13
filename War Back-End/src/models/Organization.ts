import mongoose, { Schema, Document } from "mongoose";

interface Resource {
  name: string;
  amount: number;
}

export interface IOrganization extends Document {
  name: string;
  resources: Resource[];
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  resources: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
