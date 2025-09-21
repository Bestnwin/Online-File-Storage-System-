import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload";
import FileList from "./components/FileList";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>📦 AWS S3 File Storage</h1>
        
        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/student" style={{ marginRight: "10px" }}>👨‍🎓 Student</Link>
          <Link to="/faculty">👩‍🏫 Faculty</Link>
        </nav>

        <Routes>
          {/* Home route */}
          <Route path="/" element={<p>Please choose a role above.</p>} />

          {/* Student route */}
          <Route path="/student" element={<Upload onUploadSuccess={() => {}} />} />

          {/* Faculty route */}
          <Route path="/faculty" element={<FacultyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Faculty Page wrapper with file fetching
import axios from "axios";
import { useState, useEffect } from "react";

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

export default App;
