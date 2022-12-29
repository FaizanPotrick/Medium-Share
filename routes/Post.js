const express = require("express");
const router = express.Router();
const User = require("../schema/UserSchema");
const Post = require("../schema/PostSchema");
const Image = require("../schema/ImageSchema");
const mongoose = require("mongoose");

router.get("/api/post/all", async (req, res) => {
  const { user_id } = req.query;

  const post_response = await Post.aggregate([
    {
      $match: {
        user_id: user_id
          ? new mongoose.Types.ObjectId(user_id)
          : { $exists: true },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post_id",
        as: "comments",
      },
    },
    {
      $project: {
        updatedAt: 0,
        __v: 0,
        comments: {
          post_id: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  res.status(200).json(post_response);
});

router.post("/api/post/register", async (req, res) => {
  const { user_id } = req.cookies;
  const { name, description } = req.body;
  const { image } = req.files;

  try {
    const post_response = await Post.create({
      user_id: user_id,
      name: name,
      description: description,
    });
    await Image.create({
      post_id: post_response._id,
      data: image.data,
      contentType: image.mimetype,
    });
    res.status(200).json("Successfully Post Created");
  } catch (error) {
    res.status(400).json("Invalid Request");
  }
});

router.get("/api/post/like/:post_id", async (req, res) => {
  const { user_id } = req.cookies;
  const { post_id } = req.params;

  const user_response = await User.findById(user_id);
  if (user_response === null) {
    return res.status(400).json("Invalid Request");
  }

  const post_response = await Post.findOne({
    _id: post_id,
    likes: user_id,
  });
  if (post_response !== null) {
    return res.status(201).json("Already Liked");
  }

  try {
    await Post.findByIdAndUpdate(post_id, {
      $push: { likes: user_id },
    });
    res.status(200).json("Successfully liked the post");
  } catch (error) {
    res.status(400).json("Invalid Request");
  }
});

router.get("/api/image/:post_id", async (req, res) => {
  const { post_id } = req.params;

  const { contentType, data } = await Image.findOne({
    post_id: post_id,
  });
  res.contentType(contentType).send(data);
});

module.exports = router;
