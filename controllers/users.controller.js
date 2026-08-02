// const bcrypt = require("bcrypt");
// const jwtt = require("jsonwebtoken");

const { User } = require("../model/userSchema");

const postRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      jinsi,
      address,
      phone
    } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud." 
      });
    }

    const newUser = new User({
      username,
      password,
      firstname,
      lastname,
      birthday,
      gender: jinsi,
      address,
      phone 
    });
    await newUser.save();

    return res.status(201).json({ 
      success: true, 
      message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi." 
    });
  } catch (error) {
    console.error("Xato:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi." 
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, lastname, phone, address, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, lastname, phone, address, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "Userbupdated succesfully!",
      user: updateUser,
    });
  } catch (error) {
    res.status(5000).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deletUser = async (res, req) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted succesfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error"});
  }
};

module.exports = { postRegister, getUserById, getUsers, updateUser, deletUser };