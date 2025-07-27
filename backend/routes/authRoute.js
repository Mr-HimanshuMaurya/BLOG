const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile

// Upload Image Route
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ imageUrl: req.file.path }); // Cloudinary returns image URL in req.file.path
});

module.exports = router;
