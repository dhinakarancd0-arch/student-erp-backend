const supabase = require("../config/supabase");

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { roll_no, dob, role } = req.body;

        if (!roll_no || !dob) {
            return res.status(400).json({
                success: false,
                message: "ID and DOB are required."
            });
        }

        let tableName = "students";
        let idColumn = "roll_no";

        if (role === "staff") {
            tableName = "staff";
            idColumn = "staff_id";
        }

        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq(idColumn, roll_no)
            .eq("dob", dob)
            .single();

        if (error || !data) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID or DOB."
            });
        }

        res.json({
            success: true,
            user: data,
            role: role
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// ================= STUDENT PROFILE =================
let tableName;
let idColumn;

if (req.body.role === "staff") {
    tableName = "staff";
    idColumn = "staff_id";
} else {
    tableName = "students";
    idColumn = "roll_no";
}

const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq(idColumn, roll_no)
    .eq("dob", dob)
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
// Get Leave Requests
const getLeaveRequests = async (req, res) => {
    try {
        const { roll_no } = req.params;

        const { data, error } = await supabase
            .from("leave_requests")
            .select("*")
            .eq("roll_no", roll_no)
            .order("leave_date", { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            leaveRequests: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const submitLeaveRequest = async (req, res) => {
    try {
        const {
            roll_no,
            student_name,
            leave_date,
            reason
        } = req.body;

        const { data, error } = await supabase
            .from("leave_requests")
            .insert([
                {
                    roll_no,
                    student_name,
                    leave_date,
                    reason,
                    status: "Pending"
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            message: "Leave request submitted successfully",
            data
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
    getResults,
    getLeaveRequests,
    submitLeaveRequest  
};