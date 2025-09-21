import React from "react";
import axios from "axios";

function FileList({ files, refreshFiles }) {
  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(`http://localhost:5000/faculty/download/${filename}`);
      const downloadUrl = res.data.downloadUrl;
      window.open(downloadUrl, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
      alert("❌ Download failed");
    }
  };

  return (
    <div>
      <h2>📂 Available Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((f, i) => (
            <li key={i}>
              {f.Key}{" "}
              <button onClick={() => handleDownload(f.Key)}>Download</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={refreshFiles} style={{ marginTop: "10px" }}>
        🔄 Refresh
      </button>
    </div>
  );
}

export default FileList;
