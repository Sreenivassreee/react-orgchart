import mongoose, { Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  imageUrl: string;
  area: string;
  profileUrl: string;
  office: string;
  tags: string;
  isLoggedUser: boolean;
  positionName: string;
  id: string;
  parentId: string;
  size: string;
}

const employeeSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  area: String,
  profileUrl: String,
  office: String,
  tags: String,
  isLoggedUser: Boolean,
  positionName: String,
  id: String,
  parentId: String,
  size: String,
});

export default mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", employeeSchema);
