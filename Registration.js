const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./schema/UserSchema");
router.post("/api/registration", async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const email_address_check = await User.findOne({
      email_address: email_address,
    });
    if (email_address_check !== null) {
      return res.status(201).json("Email Address already exist");
    }
    const user_response = await User.create({
      email_address: email_address,
      password: bcrypt.hashSync(password, 10),
    });
    res
      .cookie("user_id", user_response._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json("Successfully Registered");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});
router.post("/api/login", async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const user_response = await User.findOne({
      email_address: email_address,
    });
    if (user_response === null) {
      return res.status(201).json("Invalid Credential");
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user_response.password
    );
    if (!passwordMatch) {
      return res.status(201).json("Invalid Credential");
    }
    res
      .cookie("user_id", user_response._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json("Successfully Logged In");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});
module.exports = router;
