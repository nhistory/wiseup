# WiseUp Solution Website

## Project Overview

WiseUp Solution is a business consulting company website built with Astro framework. The site offers business solutions, recruiting, and marketing services for companies looking to expand.

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS v4 (with @theme and @apply directives)
- **Fonts**: Poppins (Google Fonts)
- **Language**: Bilingual (English/Korean) with JavaScript-based language switcher

## Directory Structure

```
/src
├── pages/
│   ├── index.astro              # Homepage
│   ├── marketing.astro          # Marketing landing page
│   └── marketing/
│       ├── web.astro            # Web development packages
│       └── video.astro          # Video production page
└── styles/
    └── global.css               # Global styles with Tailwind

/public
├── images/                      # Static images
├── videos/                      # Video files
│   ├── video-page-background.mp4  # Video page hero background
│   └── golfland.mp4               # Sample video (vertical 9:16)
└── favicon.png
```

## Key Pages

### Homepage (`/`)

- Hero section with background image
- Services: Business Solution, Recruiting, Marketing
- Process workflow
- Client logos
- Contact form

### Marketing Landing (`/marketing`)

- Overview of marketing solutions
- Cards linking to Web Development and Video Production

### Web Development (`/marketing/web`)

- Pricing packages: Starter, Professional, Premium
- Add-on services
- Maintenance packages
- Portfolio section with modal

### Video Production (`/marketing/video`)

- Fullscreen video hero with background video
- Scroll-based header style transition (transparent → solid)
- Sample video section (vertical format)
- Pricing packages for video production

## Custom Components

### Language Switcher

- Stored in `localStorage` as `wiseup-lang`
- Default language: English
- Supports `data-ko`, `data-en` for text content
- Supports `data-html-ko`, `data-html-en` for HTML content

### Scroll-based Header

On video.astro, the header changes style based on scroll position:

- **In hero section**: Transparent background, white text
- **After hero**: White background, dark text

## Custom CSS Variables (global.css)

```css
--color-primary: #1565c0; /* Blue */
--color-primary-light: #1976d2;
--color-primary-dark: #0d47a1;
--color-gold: #ffcc00; /* Gold accent (for video page) */
--color-accent: #f5a623;
--color-text-dark: #1a1a2e;
--color-text-body: #4a4a68;
--color-text-muted: #8c8c9e;
```

## Development Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Recent Changes (Jan 2026)

1. Created marketing landing page with solution cards
2. Added video production page with:
   - Fullscreen video hero background
   - Scroll-based header transition
   - Gold accent color (`text-gold`) for hero text
   - Sample video section with vertical video support
3. Renamed `/web-dev` route to `/marketing/web`
4. Added dropdown navigation for Marketing submenu
