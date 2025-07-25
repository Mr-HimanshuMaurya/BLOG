const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getDashboardSummary } = require("../controllers/dashboardController");

router.get("/", protect, adminOnly, getDashboardSummary);

module.exports = router;