const express = require("express");
const router = express.Router();
const {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostBySlug,
    getPostByTag,
    searchPosts,
    incrementView,
    likePost,
    getTopPosts,
} = require("../controllers/blogPostController");
const { protect } = require("../middleware/authMiddleware");

// Admin-only middleware
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};

// Routes
router.get("/tag/:tag", getPostByTag); // must come before /slug/:slug
router.get("/search", searchPosts);
router.get("/trending", getTopPosts);

router.post("/", protect, createPost);
router.get("/", getAllPosts);

router.get("/slug/:slug", getPostBySlug); // placed after /tag and /search
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);
router.post("/:id/view", incrementView);
router.post("/:id/like", protect, likePost);

module.exports = router;
