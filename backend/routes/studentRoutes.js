const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/studentController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Student upload route
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
