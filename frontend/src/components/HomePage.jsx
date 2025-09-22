import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-6"
      >
        📦 Welcome to S3 File Storage Portal
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xl mb-10 max-w-2xl"
      >
        Upload assignments securely as a student or access uploaded files as a faculty member.
      </motion.p>

      <div className="flex gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/student")}
          className="bg-white text-blue-700 w-64 h-44 flex flex-col justify-center items-center rounded-lg shadow-lg cursor-pointer"
        >
          <h2 className="text-2xl font-bold">👨‍🎓 Student</h2>
          <p className="text-gray-600">Upload Assignments</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/faculty")}
          className="bg-white text-green-700 w-64 h-44 flex flex-col justify-center items-center rounded-lg shadow-lg cursor-pointer"
        >
          <h2 className="text-2xl font-bold">👩‍🏫 Faculty</h2>
          <p className="text-gray-600">View & Download Files</p>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
