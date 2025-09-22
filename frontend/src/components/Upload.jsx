import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("⚠️ Please select a file first");
    if (!name || !rollno) return alert("⚠️ Please enter your name and roll number");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("rollno", rollno);

    try {
      await axios.post("http://localhost:5000/student/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) =>
          setProgress(Math.round((p.loaded * 100) / p.total)),
      });
      alert("✅ File uploaded successfully!");
      setFile(null);
      setProgress(0);
      setName("");
      setRollno("");
      onUploadSuccess();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-10"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        📤 Upload Your Assignment
      </h2>

      {/* Student Info */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Roll Number</label>
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="Enter your roll number"
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      {/* File Upload */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50"
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
        <div className="w-full bg-gray-200 rounded mt-6">
          <div
            className="bg-blue-600 text-sm leading-none py-2 text-center text-white rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Upload File
      </button>
    </motion.div>
  );
}

export default Upload;
