const express = require("express");
const { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword 
} = require("../controllers/authController");
const { registerLimiter, loginLimiter, passwordResetLimiter } = require("../middlewares/rateLimiter");


const router = express.Router();


router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/forgot-password", passwordResetLimiter, forgotPassword);
router.post("/reset-password/:token", passwordResetLimiter, resetPassword);

module.exports = router;