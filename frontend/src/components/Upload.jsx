import React, { useState } from "react";
import axios from "axios";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("⚠️ Please select a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ File uploaded successfully!");
      setFile(null);
      onUploadSuccess(); // refresh files in App.jsx
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>📤 Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>
    </div>
  );
}

export default Upload;
