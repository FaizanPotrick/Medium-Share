const express = require("express");
const router = express.Router();
const User = require("../schema/UserSchema");
const Comment = require("../schema/CommentSchema");

router.get("/api/comment/post/:post_id/:comment", async (req, res) => {
  const { user_id } = req.cookies;
  const { post_id, comment } = req.params;

  const user_response = await User.findById(user_id);
  if (user_response === null) {
    return res.status(400).json("Invalid Request");
  }

  try {
    await Comment.create({
      post_id: post_id,
      user_email_address: user_response.email_address,
      message: comment,
    });
    res.status(200).json("Successfully Comment Created");
  } catch (error) {
    res.status(400).json("Invalid Request");
  }
});

module.exports = router;
