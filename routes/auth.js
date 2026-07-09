const express = require("express");
const router = express.Router();

const {
    login,
    getProfile,
    getAttendance,
    getTimetable,
    getResults,
    getLeaveRequests
} = require("../controllers/authController");

// Login
router.post("/login", login);

// Student Profile
router.get("/profile/:roll_no", getProfile);
router.get("/attendance/:roll_no", getAttendance);
router.get("/timetable", getTimetable);
router.get("/results/:roll_no", getResults);
router.get("/leave/:roll_no", getLeaveRequests);
module.exports = router;