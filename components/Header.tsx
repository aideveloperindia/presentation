"use client";

import LanguageToggle from "./LanguageToggle";
import { Language } from "@/app/types";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Road Safety Digital Platform
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="https://roadsafetyeventsbypadalarahul.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Visit Website
          </a>
          <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
}
