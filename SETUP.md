# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Speaker Notes PDF:**
   - Copy `/mnt/data/RoadSafetyNotes2.pdf` to `public/assets/speaker-notes/RoadSafetyNotes2.pdf`
   - Or place your PDF file at: `public/assets/speaker-notes/RoadSafetyNotes2.pdf`

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Important Notes

### Speaker Notes PDF
The speaker notes PDF is required for the "Download Speaker Notes (PDF)" button to work. Make sure to:
- Place the file at: `public/assets/speaker-notes/RoadSafetyNotes2.pdf`
- The file will be served at: `/assets/speaker-notes/RoadSafetyNotes2.pdf`

### Slide Images (Optional)
If any slides have images:
- Place images in: `public/presentation/images/`
- Reference them in `slides.json` as: `"image": "filename.png"`

### Editing Slides
- **Permanent edits**: Edit `public/presentation/slides.json` directly
- **Preview edits**: Use the "Edit JSON" button (saves to localStorage only)

## Build for Production

```bash
npm run build
npm start
```

## Deployment

See `README.md` for deployment instructions (Vercel, Netlify, etc.)

