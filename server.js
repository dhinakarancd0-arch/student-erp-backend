
console.log("SERVER FILE LOADED");const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const supabase = require("./config/supabase");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🎉 Student ERP Backend Running Successfully!"
    });
});

// Test Route
app.get("/hello", (req, res) => {
    res.send("Hello! Backend is working.");
});

// Test Supabase Connection
// Test Supabase Connection
app.get("/test-db", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("students")
            .select("id")
            .limit(1);

        console.log("Data:", data);
        console.log("Error:", error);

        res.json({
            data,
            error
        });

    } catch (err) {
        res.json({
            catchError: err.message
        });
    }
});
const PORT = process.env.PORT || 3000;
app.use((req, res) => {
    res.status(404).json({
        path: req.originalUrl,
        message: "Route not found"
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});