const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const BUCKET_NAME = process.env.AWS_BUCKET;

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("❌ No file uploaded");

    const { name, rollno } = req.body;
    if (!name || !rollno) {
      return res.status(400).send("❌ Name and Roll Number required");
    }

    // Clean up name and roll number (remove spaces)
    const cleanName = name.trim().replace(/\s+/g, "");
    const cleanRoll = rollno.trim().replace(/\s+/g, "");

    // Extract extension from original file
    const ext = req.file.originalname.split(".").pop();

    // New filename format: rollno_name_timestamp.extension
    const newFileName = `${cleanRoll}_${cleanName}_${Date.now()}.${ext}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: newFileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    res.json({ message: "✅ File uploaded successfully", filename: newFileName });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("❌ Upload failed");
  }
};

module.exports = { uploadFile };
