import mongoose from "mongoose";

const userRolesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

const UserRoles = mongoose.model("UserRole", userRolesSchema);

export default UserRoles;
