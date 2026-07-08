const express = require("express");
const router = express.Router();

const { login, getProfile } = require("../controllers/authController");

// Login
router.post("/login", login);

// Student Profile
router.get("/profile/:roll_no", getProfile);

module.exports = router;