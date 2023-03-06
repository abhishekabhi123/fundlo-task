const express = require("express");
const { register, login, getUser, updateUser } = require("../Controllers/authController");
const { checkUser, checkAdmin } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/admin", checkAdmin, login);
router.get("/getUser", getUser);
router.put("/update/:id",updateUser);

module.exports = router;
