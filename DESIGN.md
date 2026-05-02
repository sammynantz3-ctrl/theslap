# Design Brief

## Direction

TheSlap.com — Early 2010s youth-oriented social network with vibrant orange/red palette, blocky navigation, and playful retro web 2.0 aesthetic.

## Tone

Maximalist playful pop with nostalgia for early social web — chunky buttons, bold typography, bright saturated colors, cartoon-friendly illustration style.

## Differentiation

Blocky navigation tabs with hover highlights, chunky rounded buttons, vibrant feed rhythm with alternating background sections, and cartoonish social interaction elements.

## Color Palette

| Token      | Light OKLCH     | Dark OKLCH      | Role                     |
| ---------- | --------------- | --------------- | ------------------------ |
| background | 0.98 0.006 75   | 0.14 0.02 25    | Warm cream to warm black |
| foreground | 0.18 0.025 25   | 0.95 0.01 60    | Dark brown to warm light |
| primary    | 0.6 0.28 15     | 0.7 0.26 15     | Vibrant orange-red       |
| accent     | 0.65 0.24 195   | 0.72 0.22 195   | Bright teal/cyan         |
| card       | 1.0 0.0 0       | 0.18 0.022 25   | Pure white to warm dark  |
| muted      | 0.94 0.03 75    | 0.22 0.025 25   | Subtle backgrounds       |

## Typography

- Display: Bricolage Grotesque — bold chunky headings, navigation, CTAs
- Body: DM Sans — friendly, modern, readable at any size
- Scale: h1 `text-5xl md:text-7xl font-bold`, h2 `text-3xl font-bold`, label `text-sm font-bold uppercase`, body `text-base`

## Elevation & Depth

Subtle layering with elevated shadows on cards and interactive elements — no drop shadows, only hover states with shadow-elevated and shadow-subtle utilities.

## Structural Zones

| Zone    | Background            | Border         | Notes                         |
| ------- | --------------------- | -------------- | ----------------------------- |
| Header  | primary with tabs     | bottom thick   | Blocky nav tabs, chunky CTA  |
| Content | alternating muted/bg  | none           | Feed sections with padding   |
| Footer  | muted/30              | top subtle     | Secondary info, links        |

## Spacing & Rhythm

Large section gaps (2rem–3rem) with alternating background colors creating visual rhythm; chunky buttons (14px–16px rounded) with bold weight; card padding 1.5rem–2rem.

## Component Patterns

- Buttons: Chunky (0.875rem 1.75rem), rounded-xl, bold weight, hover: lift and shadow
- Cards: Full rounded-lg, white/dark card background, subtle shadow or border
- Badges: Full rounded-full, small accent color, white text
- Nav tabs: Bold font, thick bottom border on active, hover color shift

## Motion

- Entrance: Fade in 0.3s on page load for cards
- Hover: Button lift (translateY -2px) + shadow, tab color + border shift 0.2s
- Decorative: None; focus on functional polish

## Constraints

- Minimum contrast AA+ (L difference >= 0.7 on all text)
- All buttons use chunky token; never arbitrary sizing
- Navigation always high contrast and immediately recognizable
- No gradients; solid saturated colors only

## Signature Detail

Blocky, chunky-weighted navigation tabs with thick bottom border highlighting — a retro nod to early 2000s web design and Nickelodeon's bold visual language.
