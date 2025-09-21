import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload";
import FacultyPage from "./components/FacultyPage";
import "./index.css";
function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-8">📦 S3 Portal</h1>
          <nav className="space-y-4">
            <Link
              to="/student"
              className="block px-3 py-2 rounded hover:bg-blue-600 transition"
            >
              👨‍🎓 Student Upload
            </Link>
            <Link
              to="/faculty"
              className="block px-3 py-2 rounded hover:bg-blue-600 transition"
            >
              👩‍🏫 Faculty Files
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center text-gray-600 text-lg">
                  Select a role from the sidebar to continue.
                </div>
              }
            />
            <Route path="/student" element={<Upload onUploadSuccess={() => {}} />} />
            <Route path="/faculty" element={<FacultyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
