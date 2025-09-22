import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import FacultyPage from "./components/FacultyPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import FacultyGate from "./components/FacultyGate";
import './index.css'
import StudentGate from "./components/StudentGate";

function App() {
  const [facultyVerified, setFacultyVerified] = useState(false);
  const [studentVerified, setStudentVerified] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Student */}
          <Route
            path="/student"
            element={
              studentVerified ? (
                <>
                  <Navbar title="👨‍🎓 Student Portal" />
                  <Upload onUploadSuccess={() => {}} />
                </>
              ) : (
                <StudentGate onVerified={() => setStudentVerified(true)} />
              )
            }
          />

          {/* Faculty */}
          <Route
            path="/faculty"
            element={
              facultyVerified ? (
                <>
                  <Navbar title="👩‍🏫 Faculty Portal" />
                  <FacultyPage />
                </>
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
