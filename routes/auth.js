const express = require("express");
const router = express.Router();
console.log("AUTH ROUTES LOADED");


const {
    login,
    getProfile,
    getAttendance,
    getTimetable,
    getResults,
    getLeaveRequests,
    submitLeaveRequest
} = require("../controllers/authController");

// Login
router.post("/login", login);

// Student Profile
router.get("/profile/:roll_no", getProfile);
router.get("/attendance/:roll_no", getAttendance);
router.get("/timetable", getTimetable);
router.get("/results/:roll_no", getResults);
router.get("/leave/:roll_no", getLeaveRequests);
console.log("POST /leave route loaded");
router.get("/leave", (req, res) => {
    res.send("GET leave route working");
});
router.post("/leave", submitLeaveRequest);
module.exports = router;