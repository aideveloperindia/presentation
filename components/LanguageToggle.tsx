"use client";

import { Language } from "@/app/types";

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageToggle({
  language,
  onLanguageChange,
}: LanguageToggleProps) {
  return (
    <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          language === "en"
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Switch to English"
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange("te")}
        className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          language === "te"
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Switch to Telugu"
        aria-pressed={language === "te"}
      >
        TE
      </button>
    </div>
  );
}
