const {
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");
const BUCKET_NAME = process.env.AWS_BUCKET;

// 📂 List Files
const listFiles = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const response = await s3.send(command);

    if (!response.Contents) return res.json([]);

    // Parse rollno, name, and file
    const files = response.Contents.map((f) => {
      const parts = f.Key.split("_");
      let roll = parts[0] || "Unknown";
      let name = parts[1] || "Unknown";
      let originalFile = parts.slice(2).join("_");

      return {
        Key: f.Key,
        Roll: roll,
        Name: name,
        OriginalFile: originalFile,
        Size: f.Size,
        LastModified: f.LastModified,
      };
    });

    res.json(files);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).send("❌ Could not list files");
  }
};

// ⬇ Download File
const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    res.json({ downloadUrl: url });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("❌ Download failed");
  }
};

// 🗑 Delete File
const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    if (!filename) return res.status(400).send("❌ Filename required");

    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
    };

    await s3.send(new DeleteObjectCommand(params));
    res.json({ message: `✅ File ${filename} deleted successfully` });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("❌ Delete failed");
  }
};

module.exports = { listFiles, downloadFile, deleteFile };
