// src/components/FacultyGate.jsx
import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function FacultyGate({ onVerified }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/faculty/verify-pin", { pin });
      if (res.data.success) {
        onVerified();
      } else {
        setError("❌ Invalid Faculty PIN. Try again.");
      }
    } catch (err) {
      setError("❌ Invalid Faculty PIN. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* Navbar always visible */}
      <Navbar title="👩‍🏫 Faculty Portal" />

      {/* PIN login form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6">
            <span className="text-green-300">&gt; </span> Enter PIN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-green-300 text-sm">
                &gt; faculty pin:
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-green-700 text-green-200 rounded-md focus:outline-none focus:border-green-400"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">&gt; {error}</p>
            )}

            <button
              type="submit"
              className="w-full px-5 py-3 border border-green-700 rounded-md bg-black/70 
                         transition transform shadow-inner text-green-300
                         hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]
                         hover:border-green-400 hover:text-green-100"
            >
              &gt; unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultyGate;
