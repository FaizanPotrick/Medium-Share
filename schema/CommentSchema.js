const mongoose = require("mongoose");
const Comment = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    user_email_address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.connection
  .useDb("Web_GDSC")
  .model("Comment", Comment);
