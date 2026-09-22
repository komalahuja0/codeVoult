const express = require("express");
const multer = require("multer");
const supabase = require("../config/supabaseClient");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "text/plain",
            "text/markdown",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only PDF, TXT, and Markdown files are allowed."
                )
            );
        }
    },
});

router.post("/", upload.single("document"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a document.",
            });
        }

        const { data, error } = await supabase
            .from("documents")
            .insert([
                {
                    original_name: req.file.originalname,
                    file_size: req.file.size,
                    mime_type: req.file.mimetype,
                },
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Document uploaded and saved successfully.",
            document: data,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;