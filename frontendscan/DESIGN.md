---
title: AttendFlow Design System
tags: [design-system, brand, landing-page]
colors:
  brand-50: "#eff6ff"
  brand-100: "#dbeafe"
  brand-200: "#bfdbfe"
  brand-300: "#93c5fd"
  brand-400: "#60a5fa"
  brand-500: "#3b82f6"
  brand-600: "#2563eb"
  brand-700: "#1d4ed8"
  brand-800: "#1e40af"
  brand-900: "#1e3a8a"
  brand-950: "#172554"
  navy-950: "#020617"
  navy-900: "#0f172a"
  navy-800: "#111827"
  navy-700: "#1e293b"
  surface-dark: "#0f172a"
  surface-elevated: "#111827"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-glass: "rgba(255, 255, 255, 0.12)"
  text-primary: "#f8fafc"
  text-muted: "#cbd5e1"
  text-soft: "#94a3b8"
typography:
  font-family: "Geist, Inter, system-ui, sans-serif"
  weights: [400, 500, 600, 700]
  h1: "clamp(2.25rem, 5vw, 4.5rem)"
  h2: "clamp(1.875rem, 4vw, 3rem)"
  h3: "1.125rem"
  body: "1rem"
  small: "0.875rem"
  xs: "0.75rem"
rounded:
  button: "0.75rem"
  card: "1rem"
  badge: "9999px"
  icon-box: "0.75rem"
  input: "0.5rem"
spacing:
  section-py: "6rem"
  section-py-sm: "8rem"
  container: "7.5rem"
components:
  - Navbar
  - Hero
  - Features
  - Trust
  - DashboardPreview
  - Testimonials
  - FAQ
  - CTA
  - Footer
  - Button
  - Badge
  - Card
  - AnimatedSection
---

# AttendFlow Design System

## Overview

AttendFlow is a smart QR attendance platform targeting modern educational institutions. The landing page is a **Brand**-register project: the design IS the product. Every pixel communicates precision, trust, and modern reliability.

**North Star:** "The Precision Desk" — every interface element feels calibrated, deliberate, and exact. Nothing is approximate.

**Color Character:** "Blueprint Blue + Midnight Navy" — a deep navy foundation with a vivid blue accent that references architectural blueprints, engineering precision, and institutional trust.

**Elevation Philosophy:** "Hybrid Glass + Shadow" — glassmorphism for hover/card states with soft shadows for depth, never one or the other exclusively.

### Scene
A university administrator or department head in a well-lit office, evaluating attendance software on a large monitor during work hours. The page needs to feel professional, calm, and capable — not flashy or consumer-oriented.

---

## Colors

### Brand Blue Ramp

The primary brand color is `#2563eb` (brand-600). It serves as the anchor for all interactive elements, gradients, and accent moments across the page.

| Token       | Hex       | Role                            |
|-------------|-----------|----------------------------------|
| brand-50    | `#eff6ff` | Lightest tint, subtle backgrounds |
| brand-100   | `#dbeafe` | Section bg highlights             |
| brand-200   | `#bfdbfe` | Borders, decorative elements      |
| brand-300   | `#93c5fd` | Hover states, secondary accents   |
| brand-400   | `#60a5fa` | Active states, dark mode accents  |
| brand-500   | `#3b82f6` | Default interactive color         |
| brand-600   | `#2563eb` | **Primary brand color**           |
| brand-700   | `#1d4ed8` | Hover on primary buttons          |
| brand-800   | `#1e40af` | Pressed / active states           |
| brand-900   | `#1e3a8a` | Deep accents, text on light bg    |
| brand-950   | `#172554` | Darkest tint                      |

### Navy Surface Ramp (Dark Mode)

| Token     | Hex       | Role                        |
|-----------|-----------|------------------------------|
| navy-950  | `#020617` | Near-black, deepest surface  |
| navy-900  | `#0f172a` | **Default dark surface**     |
| navy-800  | `#111827` | Elevated surfaces, cards     |
| navy-700  | `#1e293b` | Borders, subtle dividers     |

### Semantic Tokens

Dark mode tokens for the `dark` class context:

- `--color-surface-dark`: `#0f172a` — body background
- `--color-surface-elevated`: `#111827` — card/section backgrounds
- `--color-border-subtle`: `rgba(255, 255, 255, 0.08)` — faint dividers
- `--color-border-glass`: `rgba(255, 255, 255, 0.12)` — glass card borders
- `--color-text-primary`: `#f8fafc` — body text
- `--color-text-muted`: `#cbd5e1` — secondary text
- `--color-text-soft`: `#94a3b8` — tertiary / caption text

Light mode uses Tailwind defaults: `bg-white`, `text-navy-950`, borders at `gray-200/50`.

### Usage Rules

- **Primary buttons & links → brand-600.** Blue carries the interaction weight.
- **Dark mode body → navy-900.** Not pure black — the slight blue cast ties to the brand.
- **Light mode body → white.** Clean, professional, high contrast.
- **Accent elements (gradient icon boxes, active tab indicators) → brand-600 or brand-400.**
- **Success signals → `emerald-400/500`** for "live" dots, positive badges, progress complete.
- **Never use purple or teal.** Every accent color is blue-family or emerald.

---

## Typography

### Font Stack

**Primary:** Geist (via `next/font/local`, woff2)
- 4 weights loaded: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- CSS variable: `--font-geist-sans`

**Fallback:** `"Inter", system-ui, sans-serif`

**Mono:** `"Geist Mono", monospace` (reserved for code, not currently used in components)

### Type Scale

| Level        | Size                        | Weight | Usage                         |
|-------------|-----------------------------|--------|-------------------------------|
| Display/h1  | `clamp(2.25rem, 5vw, 4.5rem)` | 700  | Hero heading, main title       |
| h2          | `clamp(1.875rem, 4vw, 3rem)`  | 700  | Section headings               |
| h3          | `1.125rem` (18px)            | 600   | Card titles                    |
| Body (p)    | `1rem` (16px)               | 400   | Paragraphs, descriptions       |
| Small       | `0.875rem` (14px)            | 400   | Secondary text, metadata       |
| XS          | `0.75rem` (12px)             | 400-500 | Captions, timestamps, tabs   |

### Type Rules

- **Hero heading** uses `text-balance` for even line breaks.
- **Section headings** alternate plain + brand-600 span for emphasis (e.g., "Trusted by **educators** worldwide").
- **Body text** is gray-500 dark:text-muted — muted but legible (targets ~4.5:1 contrast).
- **Line length** constrained by `max-w-2xl` (42rem) for reading sections.
- **No uppercase tracking** on section eyebrows. The design deliberately avoids the "section kicker" pattern.
- **Button labels:** verb + object ("Start Free", "Watch Demo"), never generic.

---

## Elevation & Surfaces

### Philosophy: Hybrid Glass + Shadow

The UI mixes glassmorphism and shadow-based depth depending on context:

| Context                  | Treatment                          | Why                            |
|--------------------------|------------------------------------|--------------------------------|
| Navbar (scrolled)        | `bg-white/70 backdrop-blur-xl`     | Translucent glass, functional  |
| Cards (resting)          | `border` + subtle `shadow`         | Clean, legible hierarchy       |
| Cards (hover)            | `hover:shadow-xl hover:-translate-y-1` + glass overlay | Hybrid approach       |
| Dashboard mockup         | `shadow-2xl shadow-brand-600/5` + `border-border-glass` | Depth + glass         |
| Feature cards            | `border border-border-subtle`      | Minimal resting state          |
| Feature cards (hover)    | `shadow-xl shadow-brand-600/5` + brand gradient overlay | Brand glow          |
| Glass utility classes    | `backdrop-filter: blur(20px)`      | Shared glass token             |

### Glass Classes

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.dark .glass {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-hover:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 0 30px rgba(37, 99, 235, 0.1);
}
.dark .glass-hover:hover {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(59, 130, 246, 0.3);
}
```

### Border Tokens

- `border-border-subtle`: default dividers, card borders (rgba white 0.08)
- `border-border-glass`: glass card outlines (rgba white 0.12)
- Light mode fallback: `border-gray-200/50`

---

## Components

### Navbar
- Fixed, full-width, transparent by default
- Scrolled state: `bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl` + bottom border
- Logo left, nav links center, theme toggle + CTA right
- Hover links: gray→brand color transition
- Mobile: hamburger → `AnimatePresence` slide-down menu
- Theme toggle: Sun/Moon icon swap with `useTheme()`

### Hero
- Full-viewport height (`min-h-screen`), `pt-16` for navbar clearance
- **Background stack:** white base → mesh gradient → grid pattern → spotlight blur
- **Mouse tracking parallax** via `useMotionValue`/`useSpring`/`useTransform` on floating cards
- **Left column:** badge, h1, paragraph, 2 CTAs, trust markers
- **Right column:** 6 floating glass cards with staggered entrance delays (0.6–1.4s):
  - Live Attendance card: animated counter (`AnimatedNumber`), sparkline SVG, progress bar
  - QR Code card: mock scan widget
  - Quick Stats card: label/value pairs
  - Activity Feed card: recent scans with green dots
  - Heatmap card: mini bar chart for weekly attendance
  - All cards use `FloatCard` wrapper with `glass` class + parallax transform

### Features
- 6 cards in responsive grid: 1col→2col→3col at breakpoints
- Each card: gradient icon box (brand-600→brand-400 diagonal), title, description
- Hover state: `-translate-y-1` lift + `shadow-xl shadow-brand-600/5` + gradient overlay
- Staggered entrance by index (0.08s delay per card)

### Trust
- 3 stat cards with icon blocks and large numbers
- "Featured Institutions" logo grid (placeholder, no actual logos — design only)
- Centered layout

### DashboardPreview
- Mockup inside a glass-bordered container with `shadow-2xl shadow-brand-600/5`
- Fake dashboard chrome: app header with tabs (Overview active), user avatar
- **KPI row:** 4 metric cards (Today, This Week, Avg Duration, Compliance)
- **Bar chart:** animated SVG bars with gradient fill, hover tooltips
- **Quick actions panel:** 3 action buttons (Generate QR, Send Reminder, Export Report)
- **Sessions table:** course rows with attendance progress bars

### Testimonials
- Animated carousel with `AnimatePresence` fade+slide transitions
- Quote icon (decorative, 10% opacity), 5-star rating row, testimonial body, author block
- Dot navigation: current dot scales 3x width horizontally, bg-brand-500
- Background: white bg, no section fill

### FAQ (paired with Testimonials)
- `border-b` accordion items with ChevronDown rotation
- `AnimatePresence` height animation for answer reveal
- Hover: text turns brand-500
- Single open item at a time pattern

### CTA
- Dark section: `bg-navy-950`, brand-400 accent, white text
- Background: mesh gradient + grid pattern + spotlight blur
- Primary button inverted: `bg-white text-navy-950`
- Feature checkmarks row (Enterprise Secure, GDPR Ready, Real-Time Analytics)
- Border separator: `border-border-subtle`

### Footer
- `border-t`, `bg-gray-50/50 dark:bg-navy-950/50`
- Link columns (Product, Solutions, Resources, Company)
- Social icons row
- Copyright bar with logo

### Button (`ui/button.tsx`)
- **4 variants:** `primary` (bg-brand-600 + shadow-brand-600/20), `secondary` (bg-gray-100), `ghost`, `outline`
- **4 sizes:** sm/md/lg/xl with proportional padding/scaling
- Shared: `rounded-xl`, `font-medium`, `transition-all duration-200`, `focus-visible` ring, `active:scale-[0.98]`, `disabled:opacity-50`
- Supports `asChild` (Slot) for polymorphic rendering

### Badge (`ui/badge.tsx`)
- **3 variants:** `default` (border-brand-600/20, text-brand-500), `outline`, `success` (text-emerald-500, border-emerald-500/20)
- `rounded-full`, `font-medium text-xs`

### Card (`ui/card.tsx`)
- `GlassCard`: rounded-2xl, p-6, glass class, optional glow prop
- `GlassCardLight`: same but with glass-light class

### AnimatedSection (`ui/animated-section.tsx`)
- Wraps content in `motion.div` with: opacity 0→1, y 40→0, viewport once, margin -100px
- Custom bezier ease `[0.25, 0.1, 0.25, 1]`
- Configurable `delay` prop for staggered reveals

---

## Do's and Don'ts

### Do
- Use brand-600 for ALL primary interactive elements (buttons, links, active states)
- Use the navy ramp (`#0f172a` → `#020617`) for dark surfaces, never pure black
- Apply glass treatment sparingly — navbar scrolled state, floating cards in hero, hover elevation
- Keep body text at 16px with enough contrast against its background
- Animate entrance with staggered delays — sections reveal in sequence, not all at once
- Use emerald-400/500 for success/live indicators (green dots, positive badges)
- Cap hero h1 at `clamp(2.25rem, 5vw, 4.5rem)` — never larger

### Don't
- Don't use gradient text (`background-clip: text`) anywhere
- Don't use side-stripe borders on cards or callouts
- Don't apply glassmorphism as the default surface treatment
- Don't use numbered section markers (01, 02, 03) as section headers
- Don't use uppercase tracked section eyebrows above every heading
- Don't animate CSS layout properties (use transform + opacity only)
- Don't gate content visibility behind animated reveals (content must be visible before animation fires)
- Don't use purple, teal, orange, or warm-toned neutrals as accents — blue family only
- Don't skip `prefers-reduced-motion` media query — animations must degrade gracefully (already implemented in globals.css line 144-151)
- Don't use hero-metric template as a crutch (big number + small label grid) — the hero uses floating cards instead
