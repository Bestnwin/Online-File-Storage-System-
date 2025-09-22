const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/studentController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload route
router.post("/upload", upload.single("file"), uploadFile);

// Student PIN verification
router.post("/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (pin === process.env.STUDENT_PIN) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "❌ Invalid Student PIN" });
  }
});

module.exports = router;
