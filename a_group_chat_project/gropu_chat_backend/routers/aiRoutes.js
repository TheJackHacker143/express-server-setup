const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aiController");


router.post("/predict", aiController.predictTyping);

router.post("/replies", aiController.smartReplies);


module.exports = router;