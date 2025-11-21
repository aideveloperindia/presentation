"use client";

import { useState, useEffect } from "react";
import { SlidesData, Language } from "./types";
import PresentationViewer from "@/components/PresentationViewer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [slidesData, setSlidesData] = useState<SlidesData | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem("presentation-slides");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSlidesData(parsed);
        return;
      } catch (e) {
        console.error("Error parsing saved slides:", e);
      }
    }

    // Fallback to loading from file
    fetch("/presentation/slides.json")
      .then((res) => res.json())
      .then((data) => {
        setSlidesData(data);
      })
      .catch((err) => {
        console.error("Error loading slides:", err);
      });
  }, []);

  if (!slidesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="flex-1 relative">
        <PresentationViewer slides={slidesData.slides} language={language} />
      </main>
      <Footer />
    </div>
  );
}
