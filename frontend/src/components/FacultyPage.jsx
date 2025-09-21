import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        📂 Uploaded Files
      </h2>
      {files.length === 0 ? (
        <p className="text-gray-500 text-lg">No files uploaded yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-lg">
              <th className="border px-6 py-3">File Name</th>
              <th className="border px-6 py-3">Size (KB)</th>
              <th className="border px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-6 py-3">{f.Key}</td>
                <td className="border px-6 py-3">{(f.Size / 1024).toFixed(2)}</td>
                <td className="border px-6 py-3 text-center">
                  <button
                    onClick={() => handleDownload(f.Key)}
                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
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
        className="mt-6 w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
      >
        🔄 Refresh Files
      </button>
    </div>
  );
}

export default FacultyPage;
