// src/components/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Welcome to File Share Hub"; // ✅ fixed text

  // Typing animation using slice (no undefined issue)
  useEffect(() => {
    let index = 0;
    const t = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((s) => !s), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl px-6 py-10 rounded-lg border border-green-800/40 bg-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        {/* big terminal style title */}
        <h1 className="text-3xl md:text-4xl text-green-400 leading-snug select-none">
          <span className="opacity-95">{text}</span>
          {showCursor && <span className="ml-1 animate-blink">|</span>}
        </h1>

        <p className="mt-4 text-sm text-green-300/90 select-none">
          Select your role to continue...
        </p>

        {/* command-like options */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {/* Student */}
          <Link
            to="/student"
            className="block px-5 py-3 border border-green-700 rounded-md bg-black/70 
                       transition transform shadow-inner
                       hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]
                       hover:border-green-400 hover:text-green-100"
          >
            <span className="text-green-300 text-sm">&gt; </span>
            <span className="text-green-200 font-medium ml-2">login --student</span>
          </Link>

          {/* Faculty */}
          <Link
            to="/faculty"
            className="block px-5 py-3 border border-green-700 rounded-md bg-black/70 
                       transition transform shadow-inner
                       hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]
                       hover:border-green-400 hover:text-green-100"
          >
            <span className="text-green-300 text-sm">&gt; </span>
            <span className="text-green-200 font-medium ml-2">login --faculty</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
