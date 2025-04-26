
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="quiz-header text-white p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="rounded-full bg-white/10 p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse-light"
            >
              <rect x="2" y="7" width="20" height="15" rx="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blockchain NPTEL Quiz</h1>
            <p className="text-sm text-blue-100">
              Test your knowledge of blockchain technology
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
          <a
            href="https://nptel.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            NPTEL Website
          </a>
          <span className="px-3 py-1 bg-white/10 rounded-full">
            12 Weeks of Content
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
