const supabase = require("../config/supabase");

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { roll_no, dob } = req.body;

        if (!roll_no || !dob) {
            return res.status(400).json({
                success: false,
                message: "Roll Number and DOB are required."
            });
        }

        const { data, error } = await supabase
            .from("students")
            .select("*")
            .eq("roll_no", roll_no)
            .eq("dob", dob)
            .single();

        if (error || !data) {
            return res.status(401).json({
                success: false,
                message: "Invalid Roll Number or DOB."
            });
        }

        res.json({
            success: true,
            student: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ================= STUDENT PROFILE =================
const getProfile = async (req, res) => {
    try {
        const { roll_no } = req.params;

        const { data, error } = await supabase
            .from("students")
            .select("*")
            .eq("roll_no", roll_no)
            .single();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            student: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const getAttendance = async (req, res) => {
    try {
        const { roll_no } = req.params;

        console.log("Received:", JSON.stringify(roll_no));

        const { data, error } = await supabase
            .from("attendance")
            .select("*");

        console.log("All attendance rows:", data);

        const filtered = data.filter(
            row => row.roll_no.trim() === roll_no.trim()
        );

        console.log("Filtered:", filtered);

        res.json({
            success: true,
            attendance: filtered
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getTimetable = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("time table")
            .select("*")
            .order("Day")
            .order("Period");

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            timetable: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const getResults = async (req, res) => {
    try {
        const { roll_no } = req.params;

        const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("roll_no", roll_no)
            .order("subject");

        if (error) throw error;

        res.json({
            success: true,
            results: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    login,
    getProfile,
    getAttendance,
    getTimetable,
    getResults
};