import express from 'express';
import { authentication } from "../middlewares/authentication.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", authentication, createProduct);

router.put("/products/:id", authentication, updateProduct);

router.delete("/products/:id", authentication, deleteProduct);

export default router;