import jwt from "jsonwebtoken";
import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Kiểm tra email tồn tại
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXIST });
    }

    // Mã hóa mật khẩu
    const hashPass = await hashPassword(password);
    
    // Tạo mới tài khoản

    const user = await User.create({ ...req.body, password: hashPass });
    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Kiểm tra email tồn tại chưa
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessages.EMAIL_NOT_FOUND });
    }

    // Kiểm tra password có khớp không
    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessages.INVALID_PASSWORD });
    }

    // Tạo token
    const token = jwt.sign({ id: userExist._id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    // Trả về token cho người dùng
    userExist.password = undefined;
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      token,
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
