# Design Brief

## Direction

**Medical Clinic Modern** — Professional dental website combining clinical credibility with contemporary design. Emphasis on trust, precision, and patient confidence through clean typography and elevated visual hierarchy.

## Tone

Refined healthcare minimalism. The bright cyan accent (#00AEEF) is reserved for CTAs and active states. Soft, approachable layouts contrast with geometric sans-serif typography to feel both professional and human.

## Differentiation

Interactive gallery with zoom/lightbox for before-after case studies. Doctor profiles emphasize credentials and specialization. Strategic cyan highlights signal trustworthy medical branding without overwhelming the layout.

## Color Palette

| Token          | OKLCH                | Role                                         |
|---|---|---|
| background     | 0.98 0.008 230       | Light, cool off-white base                   |
| foreground     | 0.18 0.015 230       | Deep cool-gray text                          |
| card           | 1.0 0.004 230        | Pure white card surfaces                     |
| primary        | 0.68 0.12 230        | Cyan medical accent (#00AEEF equivalent)     |
| accent         | 0.68 0.12 230        | Interactive highlights & CTAs                |
| muted          | 0.94 0.01 230        | Secondary backgrounds & disabled states      |
| destructive    | 0.55 0.22 25         | Red alerts & warnings                        |

## Typography

- **Display:** Space Grotesk — geometric sans-serif for headings, confidence without coldness
- **Body:** General Sans — readable, humanist sans-serif for paragraphs and labels  
- **Scale:** Hero `text-6xl font-bold tracking-tight`, sections `text-3xl font-bold`, labels `text-sm uppercase tracking-wider`, body `text-base`

## Elevation & Depth

Subtle shadows distinguish surfaces. Cards use `shadow-card` for content grouping; elevated sections use `shadow-elevated` for modal emphasis. No drop shadows on text — hierarchy via weight and size alone.

## Structural Zones

| Zone    | Background       | Border                | Notes                                           |
|---|---|---|---|
| Header  | bg-background    | border-b border-border | Minimal nav, logo, language toggle              |
| Hero    | Image + overlay  | —                     | Full viewport, gradient card for doctor profile |
| Content | Alternating      | —                     | bg-card / bg-muted alternation for rhythm       |
| Gallery | bg-background    | —                     | Light grid, card-shadow on hover                |
| Footer  | bg-foreground    | border-t              | Dark footer with address, WhatsApp button       |

## Spacing & Rhythm

Section gaps: 5rem (`section:`) vertical spacing. Content grouping: 2rem between cards. Micro-spacing: 1rem (gutter), 0.5rem (compact). Gallery items use consistent 1.5rem gap for balanced visual rhythm.

## Component Patterns

- **Buttons:** Cyan primary (`bg-primary text-primary-foreground`), round radii (`rounded-lg`), hover-lift via `shadow-elevated`
- **Cards:** White background, subtle border, `shadow-card`, gap content with 1.5rem padding
- **Gallery:** Light grid, image zoom on hover (+scale-105), lightbox overlay fade-in
- **Doctor Profile:** Large hero image, credential badges with cyan accent underline, bio italics

## Motion

- **Entrance:** Fade-in + slide-up (0.5s ease-out) on page load for gallery items
- **Hover:** Scale +5% on gallery images, button lift (shadow+translate) on hover
- **Decorative:** None; focus on functional clarity

## Constraints

- No rounded corners above `rounded-lg` (0.625rem) except pills for badges
- Cyan accent used only on CTAs, active states, and credential highlights
- Spanish language throughout; all copy supports diacritics
- Gallery images load progressively with placeholder backgrounds

## Signature Detail

Cyan accent underlines on doctor credentials and service headings — a medical precision mark signaling expertise without overwhelming the layout.

