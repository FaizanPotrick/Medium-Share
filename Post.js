const express = require("express");
const router = express.Router();
const User = require("./schema/UserSchema");
const Post = require("./schema/PostSchema");
const Comment = require("./schema/CommentSchema");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const app = initializeApp({
  storageBucket: process.env.BUCKET_URL,
});
const storage = getStorage(app);
router.get("/api/post/all", async (req, res) => {
  const post_response = await Post.aggregate([
    {
      $addFields: {
        user_id: {
          $toObjectId: "$user_id",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        _id: {
          $toString: "$_id",
        },
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
        user_id: 0,
        updatedAt: 0,
        __v: 0,
        user: {
          _id: 0,
          password: 0,
          __v: 0,
        },
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
    {
      $unwind: "$user",
    },
  ]);
  res.status(200).json(post_response);
});
router.get("/api/post/user", async (req, res) => {
  const { user_id } = req.cookies;
  const post_response = await Post.aggregate([
    {
      $match: {
        user_id: user_id,
      },
    },
    {
      $addFields: {
        user_id: {
          $toObjectId: "$user_id",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        _id: {
          $toString: "$_id",
        },
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
        user_id: 0,
        updatedAt: 0,
        __v: 0,
        user: {
          _id: 0,
          password: 0,
          __v: 0,
        },
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
    {
      $unwind: "$user",
    },
  ]);
  res.status(200).json(post_response);
});
router.post("/api/post/registration", async (req, res) => {
  const { user_id } = req.cookies;
  const { name, description, mind_map_link } = req.body;
  const { photo } = req.files;
  try {
    const photoRef = ref(storage, "/photos/" + photo.name);
    const photo_upload = await uploadBytes(photoRef, photo.data);
    const photo_url = await getDownloadURL(
      ref(storage, photo_upload.metadata.fullPath)
    );
    await Post.create({
      user_id: user_id,
      name: name,
      description: description,
      mind_map_link: mind_map_link,
      photo_url: photo_url,
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
});
router.post("/api/comment/registration", async (req, res) => {
  const { user_id } = req.cookies;
  const { post_id, comment } = req.body;
  try {
    const user_response = await User.findById(user_id);
    await Comment.create({
      post_id: post_id,
      user_email_address: user_response.email_address,
      message: comment,
    });
    res.status(200).json("Successfully Comment Created");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});

module.exports = router;
