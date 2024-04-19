import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "user already exsist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  await newUser.save();
  return res.json({ message: "User Registered Succesfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User not exsist" });
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    return res.json({ message: "Username or Password is incorrect!!!" });
  }
  // return res.json({message : "login successfull"})
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userId: user._id, message: "success" });
});

export { router as userRouter };
