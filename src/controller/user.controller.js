const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(
      "data coming in create controller",
      username,
      email,
      phone,
      password,
    );
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({
        success: false,
        message: "Email Already Register!!",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const response = await User.create({
      username,
      email,
      phone,
      password: hashpassword,
    });
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User Not Registered!!",
      });
    }
    console.log("existUser", existUser);
    const passwordcheck = await bcrypt.compare(password, existUser.password);
    console.log("passwordcheck", passwordcheck);
    if (!passwordcheck) {
      return res.status(500).json({
        success: false,
        message: "Password does not match!!",
      });
    }
    // console.log("login data coming", email, password);
    const token = jwt.sign({ username: existUser.username, email: existUser.email }, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "User Login successfully",
      token,
      user: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User not found!!",
      });
    }
    if(username){
      existUser.username=username
    }
    if(phone){
      existUser.phone=phone
    }
    if(password){
      existUser.password=await bcrypt.hash(password, 10);
    }
    const updatedUser=await existUser.save()
    console.log("Updated data:",updatedUser)
    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User not found!!",
      });
    }
    const passwordcheck = await bcrypt.compare(password, existUser.password);
    console.log("passwordcheck", passwordcheck);
    if (!passwordcheck) {
      return res.status(500).json({
        success: false,
        message: "Password does not match!!",
      });
    }
    console.log("Deleted User:", existUser)
    await User.deleteOne({email})
    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
      data: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  // getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
