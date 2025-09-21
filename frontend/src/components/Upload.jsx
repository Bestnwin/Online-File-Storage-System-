import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return alert("⚠️ Please select a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/student/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) =>
          setProgress(Math.round((p.loaded * 100) / p.total)),
      });
      alert("✅ File uploaded successfully!");
      setFile(null);
      setProgress(0);
      onUploadSuccess();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        📤 Upload Assignment
      </h2>
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {file ? (
          <p className="text-lg text-gray-700">{file.name}</p>
        ) : (
          <p className="text-gray-500 text-lg">
            Drag & Drop or Click to Select File
          </p>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {progress > 0 && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-blue-600 text-sm leading-none py-1 text-center text-white rounded mt-6"
        >
          {progress}%
        </motion.div>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Upload File
      </button>
    </motion.div>
  );
}

export default Upload;
