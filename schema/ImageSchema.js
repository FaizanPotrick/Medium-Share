const { Schema, connection } = require("mongoose");

const Image = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

module.exports = connection.useDb("Web_GDSC").model("Image", Image);
