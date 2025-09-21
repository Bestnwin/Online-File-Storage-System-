import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload";
import FacultyPage from "./components/FacultyPage";
import { motion } from "framer-motion";
import './index.css'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 font-sans">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-72 bg-blue-800 text-white flex flex-col p-8 shadow-lg"
        >
          <h1 className="text-3xl font-extrabold mb-10 tracking-wide">
            📦 S3 Portal
          </h1>
          <nav className="space-y-6 text-lg">
            <Link
              to="/student"
              className="block px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              👨‍🎓 Student Upload
            </Link>
            <Link
              to="/faculty"
              className="block px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              👩‍🏫 Faculty Files
            </Link>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 p-10"
        >
          {/* Topbar */}
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 border-b pb-4"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to the File Storage Portal
            </h2>
            <p className="text-lg text-gray-500">
              Securely upload and access assignments via AWS S3
            </p>
          </motion.header>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center text-gray-600 text-xl mt-20"
                >
                  👉 Select a role from the sidebar to continue.
                </motion.div>
              }
            />
            <Route path="/student" element={<Upload onUploadSuccess={() => {}} />} />
            <Route path="/faculty" element={<FacultyPage />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
