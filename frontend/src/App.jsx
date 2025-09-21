import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import FileList from "./components/FileList";

function App() {
  const [files, setFiles] = useState([]);
  const [role, setRole] = useState(null); // Student or Faculty

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    if (role === "Faculty") {
      fetchFiles(); // only fetch for faculty
    }
  }, [role]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📦 AWS S3 File Storage</h1>

      {/* Role Selection */}
      {!role && (
        <div>
          <h3>Login as:</h3>
          <button onClick={() => setRole("Student")} style={{ marginRight: "10px" }}>
            👨‍🎓 Student
          </button>
          <button onClick={() => setRole("Faculty")}>👩‍🏫 Faculty</button>
        </div>
      )}

      {/* Student View */}
      {role === "Student" && (
        <div>
          <h2>Welcome, Student 👨‍🎓</h2>
          <Upload onUploadSuccess={() => {}} />
        </div>
      )}

      {/* Faculty View */}
      {role === "Faculty" && (
        <div>
          <h2>Welcome, Faculty 👩‍🏫</h2>
          <FileList files={files} refreshFiles={fetchFiles} />
        </div>
      )}
    </div>
  );
}

export default App;
