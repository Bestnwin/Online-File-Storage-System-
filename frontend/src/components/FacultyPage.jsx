import React, { useState, useEffect } from "react";
import axios from "axios";
import FileList from "./FileList";

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

  useEffect(() => {
    fetchFiles();
  }, []);

  return <FileList files={files} refreshFiles={fetchFiles} />;
}

export default FacultyPage;
