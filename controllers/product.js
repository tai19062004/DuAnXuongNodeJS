import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import ProductModel from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await ProductModel.find().populate("category");
    if (data && data.length > 0) {
      return res.status(200).json({
        message: successMessages.GET_PRODUCT_SUCCESS,
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const data = await ProductModel.create(req.body);
    const updateCategory = await Category.findByIdAndUpdate(
      data.category,
      {
        $push: { products: data._id },
      },
      { new: true }
    );

    if (!data || !updateCategory) {
      return res.status(400).json({ message: "Them san pham that bai!" });
    }
    return res.status(201).json({
      message: successMessages.CREATE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await ProductModel.findById(req.params.id).populate("category");
    if (!data) {
      return res.status(400).json({ message: "Lay san pham that bai!" });
    }
    return res.status(201).json({
      message: successMessages.GET_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const data = await ProductModel.findByIdAndUpdate(`${req.params.id}`, req.body, {
      new: true,
    });
    const updateCategory = await Category.findByIdAndUpdate(
      data.category,
      {
        $push: { products: data._id },
      },
      { new: true }
    );
    if (!data || !updateCategory) {
      return res.status(400).json({ message: "Update san pham that bai!" });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Xoá cứng (Không nên dùng)
export const removeProductById = async (req, res, next) => {
  try {
    const data = await ProductModel.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: successMessages.DELETE_PRODUCT_SUCCESS,
        data,
      });
    }
    return res.status(400).json({ message: errorMessages.DELETE_FAIL });
  } catch (error) {
    next(error);
  }
};

// Xoá mềm
export const softRemoveProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_PRODUCT_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};