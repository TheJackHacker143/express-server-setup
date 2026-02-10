const express = require("express");
const router = express.Router();
const premiumController = require("../controllers/premiumController");
router.put("/updateStatus/:id", premiumController.updatePremiumStatus);
router.get("/updateStatus/:id", premiumController.getpremiumStatus);

module.exports = router;
