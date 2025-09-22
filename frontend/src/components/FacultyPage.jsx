import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function FacultyPage() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/faculty/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/faculty/download/${filename}`
      );
      window.open(res.data.downloadUrl, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
      alert("❌ Download failed");
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-10"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        📂 Uploaded Files
      </h2>
      {files.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No files uploaded yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-lg">
              <th className="border px-6 py-3 text-left">File Name</th>
              <th className="border px-6 py-3 text-left">Size (KB)</th>
              <th className="border px-6 py-3 text-left">Uploaded On</th>
              <th className="border px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-6 py-3">{f.Key}</td>
                <td className="border px-6 py-3">{(f.Size / 1024).toFixed(2)}</td>
                <td className="border px-6 py-3">{formatDate(f.LastModified)}</td>
                <td className="border px-6 py-3 text-center">
                  <button
                    onClick={() => handleDownload(f.Key)}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={fetchFiles}
        className="mt-6 w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
      >
        🔄 Refresh Files
      </button>
    </motion.div>
  );
}

export default FacultyPage;
