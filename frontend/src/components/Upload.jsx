// src/components/Upload.jsx
import React, { useState } from "react";
import axios from "axios";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return setStatus("❌ no file selected");
    if (!name || !rollno) return setStatus("❌ name and roll number required");

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
      setStatus("✅ upload successful");
      setFile(null);
      setProgress(0);
      setName("");
      setRollno("");
      onUploadSuccess();
    } catch (err) {
      setStatus("❌ upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      {/* Title */}
      <h2 className="text-2xl mb-6">
        <span className="text-green-300">&gt; </span> Upload Assignment
      </h2>

      {/* Student Info */}
      <div className="mb-6">
        <p className="mb-2 text-green-300 text-sm">&gt; enter full name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full max-w-xl px-3 py-2 bg-black border border-green-700 text-green-200 rounded-md focus:outline-none focus:border-green-400"
        />
      </div>

      <div className="mb-6">
        <p className="mb-2 text-green-300 text-sm">&gt; enter roll number:</p>
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="21BCS0000"
          className="w-full max-w-xl px-3 py-2 bg-black border border-green-700 text-green-200 rounded-md focus:outline-none focus:border-green-400"
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <p className="mb-2 text-green-300 text-sm">&gt; choose file:</p>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full max-w-xl text-green-200 bg-black border border-green-700 rounded-md file:bg-green-800 file:text-green-200 file:border-none file:px-3 file:py-1 hover:file:bg-green-700"
        />
        {file && <p className="mt-2 text-green-200 text-sm">&gt; {file.name}</p>}
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full max-w-xl bg-green-900/30 border border-green-700 rounded mb-4">
          <div
            className="bg-green-600 text-xs leading-none py-1 text-center text-black rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Status */}
      {status && (
        <p
          className={`text-sm mb-4 ${
            status.startsWith("✅") ? "text-green-300" : "text-red-500"
          }`}
        >
          &gt; {status}
        </p>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="px-5 py-3 border border-green-700 rounded-md bg-black/70 
                   transition transform shadow-inner text-green-300
                   hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]
                   hover:border-green-400 hover:text-green-100"
      >
        &gt; upload
      </button>
    </div>
  );
}

export default Upload;
