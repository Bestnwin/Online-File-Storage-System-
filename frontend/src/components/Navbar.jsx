// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-black text-green-400 font-mono px-6 py-3 border-b border-green-800/40 shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Fake terminal prompt with title */}
        <span className="text-green-300 text-sm md:text-base">
          root@fileshare:~$ <span className="text-green-200">{title}</span>
        </span>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 border border-green-700 rounded-md bg-black/70 
                     transition transform text-green-300 text-sm shadow-inner
                     hover:scale-105 hover:shadow-[0_0_10px_rgba(34,197,94,0.7)]
                     hover:border-green-400 hover:text-green-100"
        >
          &gt; back
        </button>
      </div>
    </div>
  );
}

export default Navbar;
