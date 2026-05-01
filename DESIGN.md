---
name: INOSX
description: Software house brand site — quiet engineering atelier
colors:
  midnight-vellum: "#0b1020"
  midnight-vellum-soft: "#0d1326"
  page-white: "#f3f6ff"
  ink-muted: "#c8d4ea"
  ink-quiet: "#8ea0bf"
  ink-receded: "#5a6a87"
  hairline: "#c7d7f01a"
  hairline-strong: "#c7d7f02e"
  drafting-cyan: "#7dd3fc"
  schematic-blue: "#60a5fa"
  deep-cyan: "#38bdf8"
  signal-success: "#86efac"
  signal-error: "#fca5a5"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontVariation: "opsz 144"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "opsz 96"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.3rem, 1.8vw, 1.65rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontVariation: "opsz 24"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.05rem, 1.35vw, 1.18rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  hairline: "0px"
  pill: "999px"
spacing:
  hairline: "1px"
  micro: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "clamp(80px, 11vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.midnight-vellum}"
    rounded: "{rounded.pill}"
    padding: "16px 26px"
  button-primary-hover:
    backgroundColor: "{colors.drafting-cyan}"
    textColor: "{colors.midnight-vellum}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.page-white}"
    rounded: "{rounded.pill}"
    padding: "11px 21px"
  field-input:
    backgroundColor: "transparent"
    textColor: "{colors.page-white}"
    rounded: "{rounded.hairline}"
    padding: "0px"
  card-product:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.hairline}"
    padding: "36px"
---

# Design System: INOSX

## 1. Overview

**Creative North Star: "The Quiet Studio"**

INOSX is a software studio, not an AI lab and not an engineering subcontractor. The visual system reflects that: a place where design and engineering are the same craft and the page itself proves the standard. It is editorial without being magazine-pretty, technical without being terminal-cold, dark without being moody. The atmosphere is a contemporary studio at work — paper-white type on a deep blue-black surface, hairline rules organizing the layout, drafting-cyan accents reserved for the moments that earn them.

The system explicitly rejects the saturated lanes that the category trains for. It is **not SaaS-cream** (no white-on-white with violet gradient blob, no inflated 3D illustrations, no hero promising "AI for everything"). It is **not AI-lab-generic** (no monospace-on-bone-paper, no asterisk-emblem, no "we believe AI will" copy). It is **not engineering-only** (no terminal aesthetic, no schematic diagrams as decoration, no "stack-first" copy that hides the product). It is not creative-agency parallax. It is not the navy-and-gold transformation-deck of a big consultancy. The voice is adult, speaks to a product leader and to a CTO at the same time, lands evidence over pitch.

Density follows the principle "show, don't promise": every section earns its space with a real artefact (real client logo, real product, real engagement). Headlines are set as editorial — large, italic-inflected Fraunces with the optical-size axis pushed wide so display-size feels carved, not inflated. Body is Inter, set long-form. White space is asymmetric on purpose: the eye travels by hierarchy, not by symmetry. The page reads as a portfolio that happens to also sell, not as a pitch deck that happens to ship.

**Key Characteristics:**
- Deep blue-black surface (`#0b1020`) tinted toward the brand hue — never pure black
- Paper-white text (`#f3f6ff`) — tinted toward the surface, never pure white
- Hairline borders at 10% opacity organize the page; no card backgrounds, no shadows
- Display set in Fraunces variable font with optical-size axis maxed out (opsz 144)
- Accent palette restrained to ≤10% of any screen — drafting cyan, pressed iris, schematic blue
- Section labels in tracked-out small-caps with Roman numerals as ordinals (`i.`, `ii.`)
- Italic Fraunces is the signature voice — used sparingly to mark accent words in headlines
- Background atmosphere via slow-drifting blurred blobs, never via gradient panels

## 2. Colors: The Vellum Palette

The palette is a single deep blue-tinted neutral surface with a paper-white type colour and a cyan-only accent family. It reads as "midnight paper" — printed material under low ambient light, not emissive screen. Violet and purple are explicitly **out of scope**: they are the saturated AI-lab tell that this brand refuses.

### Primary
- **Drafting Cyan** (`#7dd3fc`): The architect's blue. Reserved for italic accent words, eyebrow numerals, FAQ rotation glyph, focus rings, hover transitions on links and buttons, the ordinal numeral on "How we work" steps, the orb's inner glow. The only color the system pushes hard.

### Secondary
- **Schematic Blue** (`#60a5fa`): The mid-tone bridge inside the brand gradient. Used only as part of `--gradient-primary`, never as a standalone surface.
- **Deep Cyan** (`#38bdf8`): The dark anchor of the gradient. Same rule: lives inside gradients, never as a flat color.

### Neutral
- **Midnight Vellum** (`#0b1020`): The page surface. Deep blue-tinted near-black; the hue tilts the entire palette warm-cool. Body background.
- **Midnight Vellum Soft** (`#0d1326`): Used inside form fields and any soft surface that needs to recede a half-step.
- **Page White** (`#f3f6ff`): The type colour and the primary button background. Tinted slightly cool toward the surface; never `#fff`.
- **Ink Muted** (`#c8d4ea`): Body and lead paragraph text. Carries the long reading.
- **Ink Quiet** (`#8ea0bf`): Section subheads, metadata, label text, secondary copy.
- **Ink Receded** (`#5a6a87`): Decorative dividers in section labels, placeholder text, footer micro-copy.

### Hairlines
- **Hairline** (`rgba(199,215,240,0.10)`): The default 1px divider. Section bottoms, card grid lines, form field underlines, FAQ separators. The page is held together almost entirely by this single line value.
- **Hairline Strong** (`rgba(199,215,240,0.18)`): Used only on the ghost button border and the lead-form outer container. The line you can see on purpose.

### Signal
- **Signal Success** (`#86efac`) and **Signal Error** (`#fca5a5`): Form state messages only. Never used decoratively.

### Named Rules

**The Vellum Rule.** No surface is pure black or pure white. `#000` and `#fff` are forbidden. Every neutral is tinted toward the brand hue family — the blue tilt is what makes the system feel printed, not generic-dark.

**The Ten-Percent Rule.** Drafting Cyan never paints more than 10% of any screen. The accent is punctuation, not surface. If a layout looks dim, the answer is hierarchy and contrast, not adding more accent. **Violet, purple, magenta, and pink are forbidden** — they are the AI-lab tell that this brand refuses.

**The Hairline-First Rule.** Structure is communicated by 1px lines at 10% opacity, not by background colour or shadow. Cards are forbidden as a default container — use rule lines, gridlines, or nothing.

## 3. Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** Inter (with `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif fallback)

**Character:** A pair built on intentional contrast: Fraunces is a high-contrast variable serif with strong optical-size axis, set quietly until pushed to display where it becomes carved and editorial. Inter is the technical voice — quiet, even, neutral — carrying body, UI labels and meta. The pair reads as "magazine-grade publication produced by an engineering studio".

### Hierarchy

- **Display** (weight 300, `clamp(3.2rem, 8.5vw, 7.5rem)`, line-height 0.98, letter-spacing -0.04em, `font-variation-settings: opsz 144`): Hero headline only. Maximum optical size makes terminals and joinery visible — at this scale the font is meant to look carved.
- **Headline** (weight 300, `clamp(2.4rem, 5.5vw, 4.5rem)`, line-height 1.02, opsz 96): Section H2s. One step softer than display — same family, narrower optical axis.
- **Title** (weight 400, `clamp(1.3rem, 1.8vw, 1.65rem)`, line-height 1.25, opsz 24): Card H3s and FAQ summaries. Optical size dialed back so the serif reads as text-grade, not display-grade.
- **Body** (weight 400, `1rem`, line-height 1.6): Inter, default. Used for everything that is not display, label, or italic accent. Body line length capped at 65–75ch.
- **Lead** (weight 400, `clamp(1.05rem, 1.35vw, 1.18rem)`, line-height 1.55): Inter, the slightly-larger reading copy directly under H2s. Color `Ink Muted`.
- **Label** (weight 500, `0.72rem`, letter-spacing 0.22em, uppercase): Inter, tracked-out small-caps. Used for section eyebrows, form field labels, footer column heads. Always paired with a Roman numeral (`i.` `ii.`) set in Fraunces italic.

### Named Rules

**The Italic Signature Rule.** Fraunces italic at weight 300 is the brand voice. It marks one or two accent words per headline (`delivers`, `not promises`) and one or two phrases on the page. It is never used for full sentences, never for body text, and never inside buttons or labels. Italic is a punctuation mark.

**The Optical-Size Discipline.** When Fraunces appears at headline size or larger, `opsz` axis must be 96 or 144. Skipping this is the single fastest way to make the serif look like a free Google Font instead of a typeset display face.

**The Inter-Quiet Rule.** Inter never goes above weight 600. The contrast is always Fraunces:Inter, never Inter-bold:Inter-regular. Heavy Inter pulls the page into SaaS lane.

## 4. Elevation

The system is **flat by doctrine**. **Zero `box-shadow` anywhere.** Depth is read from two sources only: hairline borders and a single subtle radial gradient under the hero (`hero` background). Modal-style lifts, dropdown shadows, card hover-lifts and atmospheric blob layers are all forbidden.

### Atmospheric vocabulary (minimal)
- **Hero radial** (`radial-gradient(900px 500px at 30% 20%, rgba(125,211,252,0.06), transparent 65%)`): a single static glow under the hero, opacity 0.06. Sets ambient temperature without reading as a graphic element.
- **Orb glow** (`background: radial-gradient(circle at 50% 50%, rgba(125,211,252,0.18), transparent 70%)`, `filter: blur(28px)`): the orb's inner halo, drafting-cyan only. No `box-shadow`, no violet.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat. Containers do not lift on hover, cards do not gain shadows, modals are forbidden as a first thought. If a thing must read as raised, the answer is a hairline border or a 4-6% background tint, never `box-shadow`. The single exception is the form-success / form-error message pair, which uses an opaque dark-tinted background plus a 1px border in the same hue family.

**The No-Atmosphere Rule.** Animated background blobs, drifting radials, parallax layers, glassmorphism panels and ambient particles are forbidden. The page's atmosphere comes from typography and hairlines, not from blurred color clouds. Anything decorative that moves is treated as a tell of AI generation and refused.

## 5. Components

### Buttons
- **Shape:** pill (`border-radius: 999px`). No square buttons.
- **Primary** (form submit): `Page White` background, `Midnight Vellum` text, 1rem 1.6rem padding, weight 500, font-size 0.92rem, letter-spacing 0.01em. The dominant CTA shape.
- **Primary Hover:** background shifts to `Drafting Cyan`, lifts 1px (`translateY(-1px)`); arrow glyph shifts +3px right.
- **Ghost** (nav CTA): transparent background, `Hairline Strong` border (1px), `Page White` text. Hover: border tightens to `Ink Muted`, 1px lift.
- **No tertiary buttons.** Anything that is not Primary or Ghost is a text link. Never a third button style.

### Lang switch
- Two text buttons (`PT` `/` `EN`) with a divider slash. Active button is `Page White`, inactive is `Ink Receded`. No background, no border. Pure type-as-control.

### Cards / Containers
- **Cards are forbidden as default containers.** When a grid is needed, use border-collapsed grid lines (`Hairline`) instead of card backgrounds.
- **Product card** (the one exception): no background fill at rest; gradient soft fill on hover (`gradient-soft`). Borders supplied by the parent grid's `Hairline`. Internal padding 36px.
- **Solution item:** no card. A `Hairline` top border, italic numeral idx, H3, body. On hover the top border switches to `Drafting Cyan`.
- **Pain row:** full-width row with 1fr / 1fr / 4fr column grid, top hairline border, italic Roman numeral as the index column.

### Inputs / Fields
- **Style:** transparent background, no border on three sides; only a `Hairline` bottom border. Field input is set in **Fraunces** at 1.15rem weight 400 — the typed value is a typographic event. Label is Inter small-caps tracked-out (the **Label** spec from §3).
- **Focus:** bottom border switches from `Hairline` to `Drafting Cyan`. No box, no glow.
- **Placeholder:** `Ink Receded`, italic, weight 300. Whispered, not shouted.
- **Error / Success:** colour-only indicator (`Signal Error` / `Signal Success`) plus copy line above the line — never a red box.

### Navigation
- Sticky topbar at 76px height, backdrop-filtered (`blur(18px) saturate(140%)`), background `rgba(11,16,32,0.62)` so content shows through.
- Links: `Ink Quiet` default, `Page White` hover. No underline, no active-state pill.
- Brand wordmark in Fraunces 1.5rem weight 400 with a single italic dot (`.`) in `Drafting Cyan` — the punctuation IS the accent.

### Section labels (signature)
The single most distinctive component. Three parts in a row: italic Roman numeral (`i.`, `ii.`) in Fraunces 0.95rem `Drafting Cyan`, then a 28px hairline bar in `Ink Receded`, then small-caps tracked-out label text. Used as section eyebrows on every block. This is the spine of the page.

### Industries list (signature)
A horizontal flowing list of industry names set in Fraunces display-weight (clamp 1.4rem to 2rem) at 300, separated by `·` middle dots in `Ink Receded`. Each name turns italic on hover. Refuses the chip-grid lane entirely.

### Marquee logos (signature)
Continuous horizontal scroll of client logos, 220px slot width, 110px height, masked at both edges with a CSS gradient mask (`linear-gradient(90deg, transparent, #000 8% 92%, transparent)`). Animation: 45s linear infinite. Pauses on hover. Logos default to `opacity: 0.55`, scale to `1.06` on hover with full opacity. The grayscale fade is the brand's "we don't shout these names" gesture.

### Hero (no decoration)
The hero is a two-column typographic composition: an oversized Fraunces H1 on the left, a Lead paragraph plus a hairline-divided meta strip on the right. There is **no orb, no illustration, no graphic ornament**. The hero earns its weight from typography alone (Fraunces opsz 144 italic accents) and one subtle radial gradient (drafting-cyan at 6% opacity) painted as the section's `background`. Decorative shapes were retired during pivot v2 — they were reading as "AI lab" instead of "software studio".

### Evidence strip (signature)
Replaces the conventional "stats with big gradient numerals" pattern. Three navigable links arranged in a row, each with a one-line claim plus a small UPPERCASE cue (e.g. `SEE →`) on the right. Bottom border is transparent at rest, switches to drafting-cyan on hover. Each link anchors to a section that contains the actual evidence (`#products`, `#clients`, `#industries`). The doctrine is "show, don't promise" — numbers are replaced by navigable proof.

### Selected Work item (signature)
Three-column grid (idx / body / meta) with a 1px hairline top border. Idx is the Fraunces italic ordinal in drafting-cyan. Body holds the client wordmark (Fraunces 1.4-1.8rem) plus a single-sentence technical description. Meta is a small UPPERCASE column listing industry and stack. No quote marks, no portrait, no rating stars. The item replaces the conventional "anonymous testimonial" pattern.

### Skip link
Hidden above the viewport at rest, slides into view on `:focus` with a 0.2s `ease` translate. Sits at the top-left, page-white background on midnight-vellum text, drafting-cyan focus outline. Aterrissa em `#main` (hero section).

### Focus ring (system-wide)
A single global rule paints a 2px solid drafting-cyan outline with 3-4px offset on every `:focus-visible`. Form input/textarea fields opt out (`outline: 0`) and rely on their own bottom-border switch to drafting-cyan instead. This is the system's a11y signature.

## 6. Do's and Don'ts

### Do:
- **Do** tint every neutral toward the brand blue. `Midnight Vellum` (`#0b1020`) and `Page White` (`#f3f6ff`) are the only allowed surface and type colors.
- **Do** set every section eyebrow with the trio: italic Roman numeral, hairline bar, tracked-out label. This is the spine.
- **Do** keep accents below 10% surface coverage. `Drafting Cyan` is the only flat accent. `Schematic Blue` and `Deep Cyan` exist solely inside the brand gradient.
- **Do** push Fraunces' optical-size axis (`opsz 144` for hero, `96` for H2, `24` for H3). Variable axis is the signature.
- **Do** use one or two italic accent words per headline (Fraunces italic 300). One per section, never more.
- **Do** organize the page with `Hairline` (10%) borders. Card backgrounds are forbidden as a default.
- **Do** keep buttons to two shapes: pill primary and pill ghost. Anything else is a text link.
- **Do** set form-field values in Fraunces. The user's typed input is a typographic event, not data entry.
- **Do** mask marquee edges with a transparent gradient. Hard cuts at the viewport edge are forbidden.
- **Do** disable all motion (marquee, blobs, reveals, orb spin) when `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** use `#000` or `#fff` anywhere. Both are forbidden by the Vellum Rule.
- **Don't** add `box-shadow` to cards, fields, buttons, or modals. The system is flat by doctrine.
- **Don't** use `border-left` greater than 1px as a colored stripe accent. Side-stripe borders are an absolute ban.
- **Don't** use `background-clip: text` gradient text anywhere. Period. The previous "ordinals exception" was retired during polish — solid drafting-cyan paints the step numerals now.
- **Don't** introduce violet, purple, magenta, pink or any saturated non-cyan hue. The palette is monochrome cyan plus tinted neutrals. Adding a second accent is the fastest way to drift back into AI-lab visual territory.
- **Don't** add ambient blobs, drifting gradients, parallax layers or glassmorphism. The No-Atmosphere Rule is hard.
- **Don't** ship a card grid. Solutions, pains and products are linear-bordered, not card-filled. The product grid is the single allowed exception (and it has no background fill at rest).
- **Don't** make the page feel like SaaS-cream — no white background, no violet gradient blob behind the hero, no inflated 3D illustrations, no "AI for everything" hero copy.
- **Don't** make the page feel like an AI lab — no typewriter mono on bone, no asterisk emblem, no "we believe AI" first-person copy, no "frontier" buzzword.
- **Don't** make the page feel like a transformation-deck — no stock photo of people in a meeting, no flat-coloured pictogram icons, no "digital transformation journey" copy, no navy + gold.
- **Don't** add scroll-jacking, parallax pinning, or WebGL flourishes. Motion is restrained: marquee, breathing orb, ambient blobs, reveal-on-scroll. Nothing else.
- **Don't** use Inter weight 700 or above. Heavy Inter is a SaaS tell.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, parentheses.
- **Don't** invent badges (`Trusted by 500+`, `4.9/5 stars`). Confidence is quiet — evidence is the real client logos and the real product names.
