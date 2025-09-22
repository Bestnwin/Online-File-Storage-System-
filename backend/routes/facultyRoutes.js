const express = require("express");
const {
  listFiles,
  downloadFile,
  deleteFile,
} = require("../controllers/facultyController");

const router = express.Router();

router.get("/files", listFiles);
router.get("/download/:filename", downloadFile);
router.delete("/delete/:filename", deleteFile);

// Faculty PIN verification
router.post("/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (pin === process.env.FACULTY_PIN) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "❌ Invalid PIN" });
  }
});

module.exports = router;
