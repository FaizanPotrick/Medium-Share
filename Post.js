const express = require("express");
const router = express.Router();
const User = require("./schema/UserSchema");
const Post = require("./schema/PostSchema");

router.get("/api/post/all", async (req, res) => {
  const post_response = await Post.find();
  const post = post_response.reverse();
  res.status(200).json(post);
});
router.get("/api/post/user", async (req, res) => {
  const { user_id } = req.cookies;
  const post_response = await Post.find({ user_id: user_id });
  const post = post_response.reverse();
  res.status(200).json(post);
});
router.post("/api/post/registration", async (req, res) => {
  const { user_id } = req.cookies;
  const { name, description, mind_map_link } = req.body;
  try {
    const user_response = await User.findById(user_id);
    await Post.create({
      user_id: user_id,
      user_email_address: user_response.email_address,
      name: name,
      description: description,
      mind_map_link: mind_map_link,
    });
    res.status(200).json("Successfully Post Created");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});
router.post("/api/post/likes", async (req, res) => {
  const { user_id } = req.cookies;
  const { post_id } = req.body;
  try {
    const post_response = await Post.findOne({
      _id: post_id,
      likes: user_id,
    });
    if (post_response !== null) {
      return res.status(201).json("Already Liked");
    }
    await Post.findByIdAndUpdate(post_id, {
      $push: { likes: user_id },
    });
    res.status(200).json("Successfully liked the post");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});
router.get("/api/post/rating", async (req, res) => {
  const { user_id } = req.cookies;
  const { post_id, rating } = req.body;
  try {
    await Post.findByIdAndUpdate(post_id, {
      $push: { ratings: [{ user_id: user_id, value: rating }] },
    });
    res.status(200).json({
      message: "Successfully rating the post",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
