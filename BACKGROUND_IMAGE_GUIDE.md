# Background Image Guide for Slides

## Image Specifications

### Recommended Dimensions

**For Web Display:**
- **Size**: 1920px × 1357px (A4 Landscape ratio - 1.414:1)
- **Alternative**: 1920px × 1080px (16:9 ratio - more common for presentations)
- **Recommended**: Use 1920px × 1357px for best compatibility with PDF generation

**For PDF Generation:**
- The PDF uses A4 Landscape format (297mm × 210mm)
- At 2x scale: 1123px × 794px (for print quality)
- Your source image should be larger for best quality (1920px × 1357px recommended)

### File Formats
- **Format**: JPG or PNG
- **Quality**: High quality (90%+ for JPG, PNG-24 for PNG)
- **Color Mode**: RGB

### File Names
- **English Background**: `bg-en.jpg` or `bg-en.png`
- **Telugu Background**: `bg-te.jpg` or `bg-te.png`
- **Location**: `public/presentation/images/`

---

## Color Code Suggestions

### English Background (bg-en.jpg)
**Option 1 - Professional Blue Gradient:**
```
Top to Bottom:
- Top: #1e40af (Royal Blue)
- Middle: #3b82f6 (Blue)
- Bottom: #60a5fa (Light Blue)

Or Left to Right:
- Left: #1e3a8a (Dark Blue)
- Right: #3b82f6 (Blue)
```

**Option 2 - Clean Professional:**
```
Gradient:
- Top: #1e40af (Navy Blue)
- Bottom: #60a5fa (Sky Blue)

With subtle pattern/texture overlay
```

**RGB Values:**
- Primary Blue: rgb(30, 64, 175) - #1e40af
- Medium Blue: rgb(59, 130, 246) - #3b82f6
- Light Blue: rgb(96, 165, 250) - #60a5fa

**Hex Codes for Design Tools:**
- #1e40af (Dark/Navy Blue)
- #3b82f6 (Medium Blue)
- #60a5fa (Light Blue)

---

### Telugu Background (bg-te.jpg)
**Option 1 - Telangana Inspired (Orange/Red):**
```
Top to Bottom:
- Top: #dc2626 (Red)
- Middle: #f97316 (Orange)
- Bottom: #fb923c (Light Orange)

Or Diagonal:
- Top Left: #dc2626 (Red)
- Bottom Right: #f97316 (Orange)
```

**Option 2 - Warm Professional:**
```
Gradient:
- Top: #ea580c (Deep Orange)
- Bottom: #fb923c (Light Orange)

With subtle pattern
```

**RGB Values:**
- Primary Red: rgb(220, 38, 38) - #dc2626
- Medium Orange: rgb(249, 115, 22) - #f97316
- Light Orange: rgb(251, 146, 60) - #fb923c

**Hex Codes for Design Tools:**
- #dc2626 (Red)
- #f97316 (Orange)
- #fb923c (Light Orange)

---

## Design Recommendations

1. **Gradient Style**: Use subtle gradients (not too dramatic)
2. **Texture**: Add very subtle texture/pattern for depth
3. **Opacity**: Background will have 85% white overlay for text readability
4. **Colors**: Keep colors professional but distinct between EN/TE
5. **No Text**: Background should not contain any text or logos (add those separately if needed)

## Example Gradient (CSS for reference)

**English (Blue):**
```css
background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
```

**Telugu (Orange/Red):**
```css
background: linear-gradient(135deg, #dc2626 0%, #f97316 50%, #fb923c 100%);
```

## Quick Color Palette

### English
- Primary: `#1e40af` (rgb(30, 64, 175))
- Secondary: `#3b82f6` (rgb(59, 130, 246))
- Accent: `#60a5fa` (rgb(96, 165, 250))

### Telugu
- Primary: `#dc2626` (rgb(220, 38, 38))
- Secondary: `#f97316` (rgb(249, 115, 22))
- Accent: `#fb923c` (rgb(251, 146, 60))

---

## After Creating Images

1. Save images as:
   - `public/presentation/images/bg-en.jpg`
   - `public/presentation/images/bg-te.jpg`

2. The slides will automatically use these backgrounds based on the selected language

3. Text will have a semi-transparent white overlay (85% opacity) for readability

---

**Yes, one consistent background image per language is perfect!** You don't need separate images for each slide. The same background will be used for all slides, with the language determining which background image is shown.

