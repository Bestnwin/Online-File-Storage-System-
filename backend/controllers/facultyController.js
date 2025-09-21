const { ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");
const BUCKET_NAME = process.env.AWS_BUCKET;

// Faculty: List files
const listFiles = async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));
    res.json(data.Contents || []);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).send("❌ Failed to list files");
  }
};

// Faculty: Download file
const downloadFile = async (req, res) => {
  try {
    const params = { Bucket: BUCKET_NAME, Key: req.params.filename };
    const command = new GetObjectCommand(params);

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    res.json({ downloadUrl: url });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("❌ Failed to download file");
  }
};

module.exports = { listFiles, downloadFile };
