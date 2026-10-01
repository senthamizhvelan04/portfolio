# Design — Senthamizhvelan Portfolio

A locked design system for the portfolio. Home and About share one visual and interaction language.

## Genre
Atmospheric technical — a dark, quiet canvas that prioritizes proof over decoration.

## Macrostructure family
- Marketing page: Marquee Hero followed by a proof-led portfolio grid and a statement close.
- Content page: Long Document with visible sections and no internal scrolling panels.
- App pages: Not applicable.

## Theme
- Paper: oklch(0.145 0.012 255)
- Raised paper: oklch(0.185 0.014 255)
- Ink: oklch(0.95 0.008 255)
- Secondary ink: oklch(0.76 0.012 255)
- Rule: oklch(0.32 0.016 255)
- Accent: oklch(0.76 0.13 225)
- Focus: oklch(0.84 0.15 220)

## Typography
- Display: Anton, weight 400, roman.
- Body: Outfit, weights 300–600.
- Mono/outlier: ui-monospace, used only for technical labels.
- Display tracking: -0.025em.
- The one-word hero may use clamp(4rem, 13vw, 12rem).

## Spacing
A named four-point scale is defined in tokens.css.

## Motion
- Hero portrait reveal once.
- In-page content uses the original viewport-aware scale, slide, and stagger language while the user scrolls; it resets after leaving view so it can replay on return.
- Tab content crossfade.
- Button feedback through colour and a one-pixel translation.
- Reduced motion removes spatial animation and limits transitions to 150ms.

## Microinteractions stance
- Keyboard-first, hover-second.
- Visible focus rings appear instantly.
- No looping decorative motion.
- No celebratory success states.

## CTA voice
- Primary: off-white fill, dark text, compact rectangular radius.
- Secondary: transparent surface with a quiet rule.
- Labels stay short and remain on one line.

## Per-page allowances
- Home may use the supplied portrait and authentic project screenshots.
- About is typography-led and uses no decorative enrichment.

## What pages MUST share
- Wordmark, accent placement, typography, focus treatment, button voice, and section rhythm.
- Tinted near-black surfaces rather than pure black.
- Solid headings; metallic treatment is reserved for the hero name.

## What pages MAY differ on
- Home is image-led and asymmetric.
- About is a readable long document.
- Project cards may vary in span according to importance.

## Exports
The canonical CSS export is tokens.css.