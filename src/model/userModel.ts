import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const EmailRegExPattern: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
}
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: {
        validator: function (value: string) {
          return EmailRegExPattern.test(value);
        },
        message: "Please Enter Valid Email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [6, "Password Must be At least Six Characters"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
