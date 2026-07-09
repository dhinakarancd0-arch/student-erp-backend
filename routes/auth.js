const express = require("express");
const router = express.Router();

const {
    login,
    getProfile,
    getAttendance
} = require("../controllers/authController");

// Login
router.post("/login", login);

// Student Profile
router.get("/profile/:roll_no", getProfile);
router.get("/attendance/:roll_no", getAttendance);

module.exports = router;