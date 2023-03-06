const express = require("express");
const {
  createProduct,
  getProduct,
} = require("../Controllers/productController");
const router = express.Router();
router.post("/add-product", createProduct);
router.get("/get-product", getProduct);
module.exports = router;
