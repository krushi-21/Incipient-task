import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Roles = mongoose.model("Role", roleSchema);

export default Roles;
