const { Schema, connection } = require("mongoose");

const User = new Schema({
  email_address: {
    type: String,
    trim: true,
    maxlength: 150,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = connection.useDb("Web_GDSC").model("User", User);
