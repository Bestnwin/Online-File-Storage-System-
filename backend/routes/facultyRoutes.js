const express = require("express");
const { listFiles, downloadFile } = require("../controllers/facultyController");

const router = express.Router();

// Faculty routes
router.get("/files", listFiles);
router.get("/download/:filename", downloadFile);

module.exports = router;
