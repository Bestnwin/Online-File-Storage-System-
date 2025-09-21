const express = require("express");
const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const stream = require("stream");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ S3 client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET;

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload file
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const params = {
      Bucket: BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));
    res.send("✅ File uploaded successfully!");
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("❌ Upload failed");
  }
});

// ✅ List files
app.get("/files", async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));
    res.json(data.Contents || []);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).send("❌ Failed to list files");
  }
});

// ✅ Download file
app.get("/download/:filename", async (req, res) => {
  try {
    const params = { Bucket: BUCKET_NAME, Key: req.params.filename };
    const command = new GetObjectCommand(params);

    // Get a signed URL (valid for 60s)
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.json({ downloadUrl: url });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("❌ Failed to download file");
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
