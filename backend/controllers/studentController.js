const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const BUCKET_NAME = process.env.AWS_BUCKET;

// Student Upload
const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("❌ No file uploaded");

    const params = {
      Bucket: BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
    res.send("✅ File uploaded successfully (Student)!");
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("❌ Upload failed");
  }
};

module.exports = { uploadFile };
