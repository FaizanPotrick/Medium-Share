const { Schema, connection } = require("mongoose");

const Post = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true,
    },
    likes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("Web_GDSC").model("Post", Post);
