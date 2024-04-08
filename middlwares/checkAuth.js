import { errorMessages } from "../constants/message.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = async (req, res, next) => {
  try {
    // Lấy token từ người dùng
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: errorMessages.TOKEN_INVALID,
      });
    }
    // Kiểm tra xem token đó có chính xác không
    const decode = verifyToken(token);
    if (!decode) {
      return res.status(400).json({
        message: errorMessages.TOKEN_INVALID,
      });
    }
    // Lấy thông tin người dùng đăng nhập
    const user = await User.findById(decode._id);
    // Đẩy dữ liệu lên response
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};