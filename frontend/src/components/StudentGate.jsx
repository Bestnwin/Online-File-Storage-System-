import React, { useState } from "react";
import axios from "axios";

function StudentGate({ onVerified }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/student/verify-pin", { pin });
      if (res.data.success) {
        onVerified(); // ✅ no sessionStorage
      }
    } catch (err) {
      setError("❌ Invalid Student PIN. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-4">🔒 Student Login</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-80">
        <input
          type="password"
          placeholder="Enter Student PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}

export default StudentGate;
