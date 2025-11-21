export interface Slide {
  id: number;
  title: {
    en: string;
    te: string;
  };
  bullets: {
    en: string[];
    te: string[];
  };
  image?: string;
}

export interface SlidesData {
  slides: Slide[];
}

export interface StudyMaterialSection {
  id: number;
  title_en: string;
  title_te: string;
  content_en: string;
  content_te: string;
  images?: string[];
}

export interface StudyMaterialData {
  sections: StudyMaterialSection[];
}

export type Language = "en" | "te";