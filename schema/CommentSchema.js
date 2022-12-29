const { Schema, connection } = require("mongoose");

const Comment = new Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
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

module.exports = connection.useDb("Web_GDSC").model("Comment", Comment);
