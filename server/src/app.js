const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabaseClient");
const documentRoutes = require("./routes/documentRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "The server is running!"
    });
});
app.get("/api/supabase-test", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .limit(1);

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Supabase connection is working!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
app.use("/api/documents", documentRoutes);
module.exports = app;