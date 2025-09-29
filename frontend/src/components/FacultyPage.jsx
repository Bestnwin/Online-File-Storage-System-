// src/components/FacultyPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function FacultyPage() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/faculty/files");
      setFiles(res.data);
    } catch (err) {
      setError("❌ Failed to fetch files.");
    }
  };

  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/faculty/download/${filename}`
      );
      window.open(res.data.downloadUrl, "_blank");
    } catch (err) {
      alert("❌ Download failed.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Format upload time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="max-w-5xl mx-auto px-6 py-8 rounded-lg border border-green-800/40 bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <h2 className="text-2xl mb-6">
          <span className="text-green-300">&gt; </span> Faculty Dashboard
        </h2>

        {error && <p className="text-red-500 mb-4">&gt; {error}</p>}

        {/* File list */}
        <div className="space-y-3">
          {files.length === 0 ? (
            <p className="text-green-300 text-sm">&gt; no files uploaded yet</p>
          ) : (
            files.map((f, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-green-800/40 py-2"
              >
                <span className="text-green-200 text-sm">
                  &gt; {f.Key} ({(f.Size / 1024).toFixed(2)} KB) —{" "}
                  {formatDate(f.LastModified)}
                </span>
                <button
                  onClick={() => handleDownload(f.Key)}
                  className="mt-2 md:mt-0 px-4 py-1 border border-green-700 rounded-md bg-black/70 
                             transition transform shadow-inner text-green-300 text-sm
                             hover:scale-105 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]
                             hover:border-green-400 hover:text-green-100"
                >
                  &gt; download
                </button>
              </div>
            ))
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchFiles}
          className="mt-6 w-full px-6 py-3 border border-green-700 rounded-md bg-black/70 
                     transition transform shadow-inner text-green-300 font-medium
                     hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]
                     hover:border-green-400 hover:text-green-100"
        >
          &gt; refresh files
        </button>
      </div>
    </div>
  );
}

export default FacultyPage;
