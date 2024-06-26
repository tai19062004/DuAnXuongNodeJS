import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getCategories = async (req, res, next) => {
  try {
    // Kết nối sang bảng products
    const data = await Category.find({}).populate("products");
    if (data && data.length > 0) {
      return res.status(200).json({
        message: successMessages.GET_CATEGORY_SUCCESS,
        data,
      });
    }
    return res.status(404).json({ message: "Không có danh mục nào tồn tại" });
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Thêm danh mục không thành công" });
    }
    return res.status(201).json({
      message: successMessages.CREATE_CATEGORY_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    // Thực hiện kết nối sang products
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(400).json({ message: "Lấy danh mục không thành công" });
    }
    return res.status(201).json({
      message: successMessages.GET_CATEGORY_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      `${req.params.id}`,
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({ message: "Cập nhật danh mục thất bại" });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_CATEGORY_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa cứng (Không lên dùng)
export const removeCategoryById = async (req, res, next) => {
  try {
    if (req.params.id === "661242eaa8c6d4a5a8f01110") {
      return res.status(400).json({
        message: "Không thể xoá danh mục mặc định",
      });
    }

    // Cập nhật lại sản phẩm trong danh mục bị xóa về danh mục mặc định
    // B1: Lấy ra tất cả sản phẩm trong danh mục bị xóa
    const productsToUpdate = await Product.find({ category: req.params.id });
    // B2: Thực hiện cập nhật lại sản phẩm đó về danh mục mặc định
    await Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = "661242eaa8c6d4a5a8f01110";
        await product.save();
      })
    );

    const data = await Category.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: successMessages?.DELETE_CATEGORY_SUCCESS || "Successfully!",
        data,
      });
    }
    return res.status(400).json({ message: errorMessages.DELETE_FAIL });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm
export const softRemoveCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({ message: "Cap nhat danh muc that bai!" });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_CATEGORY_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};