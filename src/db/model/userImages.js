import mongoose from "mongoose";

const userImagesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const UserImages = mongoose.model("UserImage", userImagesSchema);

export default UserImages;
