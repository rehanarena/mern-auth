import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';
import { errorHandler } from "../utils/error.js";

export const adminlogin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const admin = await Admin.findOne({ name });
    if (!admin) return errorHandler(401, "Admin not found");

    if (password !== admin.password) return errorHandler(404, "wrong password");

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = admin._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

export const adminHome = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" }); 
  }
};
export const addUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Username already exists" });
    }

    if (emailExist) {
      return res.json({ success: false, message: "Email already exists" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    next(error);
  }
};
export const adminLogout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout Success");
};

export const edituserData = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const userEdit = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const { id } = req.params;
    const editedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          username: userName,
          email: email,
        },
      }
    );
    console.log(`Edited User : ${editedUser}`);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteuser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    console.log(deleteduser);
    res.status(200).json("user deleted");
  } catch (error) {
    console.log(error);
  }
};
