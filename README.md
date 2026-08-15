# SENTHAMIZHVELAN M — Portfolio

An atmospheric, typography-led portfolio built to showcase AI/ML engineering work.

**Live** → [https://senthamizhvelan04.github.io/portfolio/](https://senthamizhvelan04.github.io/portfolio/)

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 · Vite 7 · TypeScript |
| Styling | Custom design system (`tokens.css` + `refined.css`) |
| Animations | CSS scroll-triggered reveals via `IntersectionObserver` |
| 3D Card | Pure CSS perspective tilt (no Three.js) |
| Routing | React Router v7 |
| Fonts | Anton (display) · Outfit (body) |

## Features

- **Marquee hero** — split "THA" (solid) / "MIZH" (outlined) with portrait reveal
- **Scroll-driven animations** — viewport-aware entrance effects with staggered timing
- **Interactive ID card** — CSS 3D tilt card with pointer tracking
- **Project showcase** — tabbed view with real screenshots and tech breakdowns
- **Technology workbench** — interactive stack organized by discipline
- **Contact form** — sends pre-formatted messages via WhatsApp
- **About page** — typography-led resume with downloadable PDF
- **Accessible** — full keyboard nav, `prefers-reduced-motion` support

## Quick Start

```bash
# install
npm install

# dev server
npm run dev

# production build
npm run build
```

## Project Structure

```
src/
├── App.tsx                          # Routes + hero layout
├── main.tsx                         # Entry point
├── styles.css                       # Base Tailwind config
├── refined.css                      # Full design system (1600+ lines)
├── components/
│   ├── BandCard.tsx                 # CSS 3D tilt ID card
│   ├── ContactSection.tsx           # Contact form + socials
│   ├── FrontendDeveloperSection.tsx  # Expertise overview
│   ├── ProjectPreview.tsx           # Project card thumbnails
│   ├── ScrollFlow.tsx               # Scroll animation observer
│   ├── Showcase.tsx                 # Projects + tech tabs
│   └── WelcomeScreen.tsx            # Animated splash screen
└── pages/
    └── About.tsx                    # /about route
```

## Design

The visual language is defined in [`design.md`](design.md) and [`tokens.css`](tokens.css).

**Genre**: Atmospheric technical — dark, quiet canvas that prioritizes proof over decoration.

## Deploy

Deployed on **GitHub Pages** via the `gh-pages` branch.

```bash
npm run build
npx gh-pages -d dist
```

## License

MIT

---

Built by **Senthamizhvelan M** · [GitHub](https://github.com/senthamizhvelan04) · [LinkedIn](https://linkedin.com/in/senthamizhvelan)
