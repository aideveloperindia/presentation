# Road Safety Digital Platform - Presentation Website

A standalone Next.js presentation website for displaying an editable slideshow with English/Telugu language toggle and PDF download features.

## Features

- ✅ Next.js 14 App Router with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Editable slideshow with 15 slides
- ✅ English (EN) / Telugu (TE) language toggle
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Touch swipe support for mobile devices
- ✅ Progress indicator (slide counter + progress bar)
- ✅ Collapsible thumbnail strip
- ✅ Auto-play toggle (5 seconds per slide)
- ✅ Framer Motion transitions
- ✅ Lazy-loaded images
- ✅ Client-side PDF generation for all slides
- ✅ Speaker notes PDF download
- ✅ Edit JSON modal (localStorage preview)
- ✅ Full accessibility support (ARIA labels, keyboard focus)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the speaker notes PDF:
   - Copy `/mnt/data/RoadSafetyNotes2.pdf` to `public/assets/speaker-notes/RoadSafetyNotes2.pdf`
   - Or place your speaker notes PDF at: `public/assets/speaker-notes/RoadSafetyNotes2.pdf`

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build & Production

1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Project Structure

```
presentation/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page route
│   ├── globals.css         # Global styles
│   └── types.ts            # TypeScript types
├── components/
│   ├── PresentationViewer.tsx  # Main presentation component
│   ├── Header.tsx              # Site header with language toggle
│   ├── Footer.tsx              # Site footer
│   ├── LanguageToggle.tsx      # EN/TE toggle component
│   └── EditModal.tsx           # JSON editor modal
├── public/
│   ├── presentation/
│   │   ├── slides.json         # Slide content (editable)
│   │   └── images/             # Slide images (optional)
│   └── assets/
│       └── speaker-notes/
│           └── RoadSafetyNotes2.pdf  # Speaker notes PDF
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Editing Slides

### Method 1: Edit JSON File
Edit `public/presentation/slides.json` directly. The file structure is:

```json
{
  "slides": [
    {
      "id": 1,
      "title": {
        "en": "English Title",
        "te": "Telugu Title"
      },
      "bullets": {
        "en": ["Bullet 1", "Bullet 2"],
        "te": ["Bullet 1 in Telugu", "Bullet 2 in Telugu"]
      },
      "image": "optional-image.png"
    }
  ]
}
```

### Method 2: Edit JSON Modal (Preview Only)
1. Click the "Edit JSON" button (bottom-right, purple button)
2. Edit the JSON in the modal
3. Click "Save to LocalStorage" to preview changes
4. Note: Changes are stored in browser localStorage only (for preview)

## PDF Generation

### Download Slides (PDF)
- Click the "Download Slides (PDF)" button at the bottom
- Generates a PDF with all slides in the current language
- Uses A4 landscape format
- Shows progress indicator during generation
- All slides are rendered client-side using html2canvas + jsPDF

### Download Speaker Notes (PDF)
- Click the "Download Speaker Notes (PDF)" button at the bottom
- Downloads the file from `/assets/speaker-notes/RoadSafetyNotes2.pdf`
- Make sure the PDF file exists in `public/assets/speaker-notes/`

## Navigation

- **Arrow Left / Home**: Go to first slide
- **Arrow Right / End**: Go to last slide
- **Arrow Up**: Previous slide
- **Arrow Down**: Next slide
- **Swipe Left**: Next slide (mobile)
- **Swipe Right**: Previous slide (mobile)
- **Click navigation arrows**: Previous/Next slide
- **Click thumbnail**: Jump to specific slide

## Test Checklist

### ✅ Language Toggle
- [ ] Toggle between EN and TE updates all slide content
- [ ] Title and bullets change language immediately
- [ ] Thumbnails show correct language titles

### ✅ Navigation
- [ ] Left/Right arrow buttons work
- [ ] Keyboard navigation (←/→/Home/End) works
- [ ] Swipe gestures work on mobile
- [ ] Thumbnail navigation works
- [ ] Slide counter updates correctly

### ✅ PDF Downloads
- [ ] "Download Slides (PDF)" generates a PDF with all slides
- [ ] PDF contains correct content in selected language
- [ ] Progress indicator shows during generation
- [ ] "Download Speaker Notes (PDF)" downloads the provided PDF file
- [ ] PDFs are high quality and readable

### ✅ Accessibility
- [ ] All buttons have ARIA labels
- [ ] Keyboard focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader compatible

### ✅ Additional Features
- [ ] Thumbnail strip toggles correctly
- [ ] Auto-play works (5 second intervals)
- [ ] Progress bar updates with slide changes
- [ ] Edit JSON modal saves to localStorage
- [ ] Page transitions are smooth

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js
4. Deploy!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to:
1. Set Node.js version to 18+ in deployment settings
2. Run `npm run build` in build command
3. Set start command to `npm start`

## Dependencies

- `next`: Next.js framework
- `react` & `react-dom`: React library
- `typescript`: TypeScript support
- `tailwindcss`: Utility-first CSS framework
- `framer-motion`: Animation library
- `html2canvas`: Client-side HTML to canvas conversion
- `jspdf`: PDF generation library
- `react-swipeable`: Touch swipe gestures

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Speaker notes PDF must be placed at `public/assets/speaker-notes/RoadSafetyNotes2.pdf`
- Slide images (if used) should be placed in `public/presentation/images/`
- PDF generation is fully client-side - no server required
- Edit JSON modal uses localStorage for preview (changes don't persist to file)

## License

Copyright © 2024 Road Safety Digital Platform. All rights reserved.

