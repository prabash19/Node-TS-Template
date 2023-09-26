import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import createToken from "../utils/token.js";
import passwordCompare from "../utils/comparePassword.js";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return next(
        new ErrorHandler("Please enter name, email and password", 400)
      );
    }
    const dublicateEmail = await userModel.findOne({ email });
    if (dublicateEmail) {
      return next(new ErrorHandler("Email Already Exists", 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const { token, options } = createToken(user._id);
    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "Successfully Registered",
      user,
    });
  }
);
export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isCorrectPassword = await passwordCompare(password, user.password);
    if (!isCorrectPassword) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    } else {
      const { token, options } = createToken(user._id);
      res.status(201).cookie("token", token, options).json({
        message: "Logged In Successfully",
      });
    }
  }
);
export const logOut = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: "true",
      message: "Logged Out Successfully",
    });
  }
);
