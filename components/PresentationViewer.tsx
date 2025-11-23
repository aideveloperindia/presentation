"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Slide, Language } from "@/app/types";

interface PresentationViewerProps {
  slides: Slide[];
  language: Language;
}

export default function PresentationViewer({ slides, language }: PresentationViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentSlideIndex];

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
    }
  }, [slides.length]);

  const previousSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        previousSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Home") {
        goToSlide(0);
      } else if (e.key === "End") {
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, goToSlide, previousSlide, nextSlide]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => previousSlide(),
    trackMouse: false,
  });


  const generatePDF = async () => {
    if (!slideContainerRef.current || slides.length === 0) return;

    setIsGeneratingPDF(true);
    setGenerationProgress(0);

    try {
      // Dynamically import client-side only libraries
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const slideWidth = pdf.internal.pageSize.getWidth();
      const slideHeight = pdf.internal.pageSize.getHeight();

      // Store original slide
      const originalIndex = currentSlideIndex;
      const originalContainer = slideContainerRef.current.cloneNode(true) as HTMLElement;
      
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = "1123px"; // A4 landscape at 2x scale
      tempContainer.style.height = "794px";
      tempContainer.style.backgroundColor = "white";
      document.body.appendChild(tempContainer);

      for (let i = 0; i < slides.length; i++) {
        setGenerationProgress(Math.round((i / slides.length) * 100));

        // Create slide element
        const slideElement = document.createElement("div");
        slideElement.style.width = "1123px";
        slideElement.style.height = "794px";
        slideElement.style.padding = "60px";
        slideElement.style.backgroundColor = "white";
        slideElement.style.fontFamily = "Arial, sans-serif";
        slideElement.style.display = "flex";
        slideElement.style.flexDirection = "column";
        slideElement.style.gap = "40px";

        const slide = slides[i];
        const lang = language;

        // Title
        const titleElement = document.createElement("h1");
        titleElement.textContent = slide.title[lang];
        titleElement.style.fontSize = "48px";
        titleElement.style.fontWeight = "bold";
        titleElement.style.margin = "0";
        titleElement.style.color = "#1a1a1a";
        slideElement.appendChild(titleElement);

        // Bullets
        const bulletsContainer = document.createElement("div");
        bulletsContainer.style.display = "flex";
        bulletsContainer.style.flexDirection = "column";
        bulletsContainer.style.gap = "24px";
        bulletsContainer.style.fontSize = "32px";
        bulletsContainer.style.color = "#333";

        slide.bullets[lang].forEach((bullet) => {
          const bulletElement = document.createElement("div");
          bulletElement.textContent = `• ${bullet}`;
          bulletElement.style.lineHeight = "1.6";
          bulletsContainer.appendChild(bulletElement);
        });

        slideElement.appendChild(bulletsContainer);

        // Image if exists
        if (slide.image) {
          const imgElement = document.createElement("img");
          imgElement.src = `/presentation/images/${slide.image}`;
          imgElement.style.maxWidth = "800px";
          imgElement.style.maxHeight = "400px";
          imgElement.style.objectFit = "contain";
          imgElement.style.alignSelf = "center";
          slideElement.appendChild(imgElement);

          // Wait for image to load
          await new Promise((resolve) => {
            if (imgElement.complete) {
              resolve(null);
            } else {
              imgElement.onload = () => resolve(null);
              imgElement.onerror = () => resolve(null);
            }
          });
        }

        tempContainer.appendChild(slideElement);

        // Render to canvas
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for rendering

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        tempContainer.removeChild(slideElement);

        // Add page if not first
        if (i > 0) {
          pdf.addPage();
        }

        // Convert canvas to image and add to PDF
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, slideWidth, slideHeight, undefined, "FAST");
      }

      // Cleanup
      document.body.removeChild(tempContainer);
      setGenerationProgress(100);

      // Save PDF
      pdf.save("road-safety-presentation-slides.pdf");
      setIsGeneratingPDF(false);
      setGenerationProgress(0);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsGeneratingPDF(false);
      setGenerationProgress(0);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (!currentSlide) return null;

  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col relative">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative" {...handlers}>
        {/* Slide container */}
        <div
          ref={slideContainerRef}
          className="flex-1 flex items-center justify-center p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              ref={slideRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg shadow-2xl p-12 max-w-5xl w-full min-h-[500px] flex flex-col gap-8 relative overflow-hidden"
              style={{
                background: language === "en" 
                  ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)" 
                  : "linear-gradient(135deg, #dc2626 0%, #f97316 50%, #fb923c 100%)",
              }}
            >
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-white/90 rounded-lg z-0"></div>
              <div className="relative z-10 flex flex-col gap-8 items-center text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {currentSlide.title[language]}
                </h1>

                <ul className="space-y-4 flex-1 flex flex-col items-center">
                  {currentSlide.bullets[language].map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl"
                    >
                      • {bullet}
                    </motion.li>
                  ))}
                </ul>

                {currentSlide.image && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/presentation/images/${currentSlide.image}`}
                      alt={currentSlide.title[language]}
                      className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={previousSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous slide"
        >
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next slide"
        >
          <svg
            className="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-gray-700 text-xs font-medium">
          Slide {currentSlideIndex + 1} of {slides.length}
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={showThumbnails ? "Hide thumbnails" : "Show thumbnails"}
          >
            {showThumbnails ? "Hide" : "Show"} Thumbnails
          </button>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-2 py-1 rounded-lg shadow-lg transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              autoPlay
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white"
            }`}
            aria-label={autoPlay ? "Stop autoplay" : "Start autoplay"}
          >
            {autoPlay ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 overflow-x-auto"
          >
            <div className="flex gap-3 justify-center">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    idx === currentSlideIndex
                      ? "border-blue-600 shadow-lg scale-105"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title[language]}`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 p-2 flex flex-col items-center justify-center text-xs text-gray-700 font-medium">
                    <div className="truncate w-full text-center">{slide.title[language]}</div>
                    <div className="text-gray-500 mt-1">#{idx + 1}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download buttons at bottom */}
      <div className="bg-white border-t border-gray-200 p-6 flex justify-center">
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          aria-label="Download slides as PDF"
        >
          {isGeneratingPDF ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating... {generationProgress}%
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Slides (PDF)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
