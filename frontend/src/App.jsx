// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import FacultyPage from "./components/FacultyPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import FacultyGate from "./components/FacultyGate";
import StudentGate from "./components/StudentGate";
import "./index.css";

function App() {
  const [facultyVerified, setFacultyVerified] = useState(false);
  const [studentVerified, setStudentVerified] = useState(false);

  return (
    <Router>
      {/* Full hacker theme wrapper */}
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Student Section */}
          <Route
            path="/student"
            element={
              studentVerified ? (
                <div className="flex flex-col min-h-screen">
                  <Navbar title="👨‍🎓 Student Portal" />
                  <main className="flex-1">
                    <Upload onUploadSuccess={() => {}} />
                  </main>
                </div>
              ) : (
                <StudentGate onVerified={() => setStudentVerified(true)} />
              )
            }
          />

          {/* Faculty Section */}
          <Route
            path="/faculty"
            element={
              facultyVerified ? (
                <div className="flex flex-col min-h-screen">
                  <Navbar title="👩‍🏫 Faculty Portal" />
                  <main className="flex-1">
                    <FacultyPage />
                  </main>
                </div>
              ) : (
                <FacultyGate onVerified={() => setFacultyVerified(true)} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
