const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_email_address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 150,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      lowercase: true,
      required: true,
    },
    mind_map_link: {
      type: String,
      trim: true,
      required: true,
    },
    likes: [],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.connection.useDb("Web_GDSC").model("Post", User);
