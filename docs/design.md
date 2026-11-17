# Design guide

How Frost & Silver looks and behaves, written so someone else can build a
different history game in the same style. Everything here lives in
`frost-and-silver.html`; this guide says what to copy, what each piece is for,
and which rules keep a game honest.

**Licence.** The game, its code and this guide are CC BY-NC-SA 4.0, adapted from
Amnuayvit Thitibordin's original. If you copy the CSS, snippets or drawing code,
your game must credit both, stay non-commercial and use the same licence. The
ideas (a dark-ink palette, a mountain in flat shapes, a quipu chart) are free to
take; the code is under the licence.

## The look in one paragraph

A printed field notebook, not a dashboard. Flat colour, thin rules, no shadows
or gradients. One heavy, wide, uppercase display face for names and headlines,
a hyperlegible face for reading, and a monospace face for every number. Colour
carries meaning: each altitude zone has its own colour everywhere it appears,
crimson marks the colonial burden and the main action, gold marks milestones and
focus, and green and red mean better and worse, only ever with a word beside
them. A drawn scene, the mountain, is the centre of the screen, and every
control sits under the part of the scene it changes.

## Colour tokens

Copy the `:root` block and its two dark-mode blocks whole. Never write a hex
value anywhere else: every colour in the game is one of these variables, which
is what makes dark mode work.

| token | light | dark | used for |
| --- | --- | --- | --- |
| `--bg` | `#e7ecf1` | `#0d1221` | page |
| `--surface` | `#f7f9fb` | `#151c30` | panels, cards, the play bar |
| `--ink` | `#18203a` | `#e6eaf4` | text |
| `--muted` | `#56607a` | `#9aa5bd` | secondary text, labels |
| `--line` | `#cbd3de` | `#28314a` | rules, borders, empty bars |
| `--accent` | `#ad1240` | `#ff5c84` | the colonial burden; the main button |
| `--gold` | `#b97f00` | `#f0b432` | milestones; keyboard focus |
| `--ice` | `#2f86c0` | `#7cc5f1` | frost, stores, waru waru |
| `--good` / `--bad` | `#2c7a4c` / `#b3261e` | `#5cc48a` / `#ff7a66` | better / worse, always with a word |
| `--z0` … `--z3` | `#3c8d47` `#b07f1e` `#7462a6` `#7f8f9c` | `#4fae5b` `#d4a43c` `#9d8dd2` `#a0b0bd` | the four zones, low to high |
| `--sky-*`, `--far`, `--rock*`, `--soil`, `--snow` | | | the drawn scene only |
| `--potosi`, `--potosi2`, `--mine` | `#a2563a` `#d08a5c` `#2b1d17` | `#8e4a33` `#c98257` `#0b0706` | Cerro Rico: its red rock, ore veins and mine mouths |

Dark mode is declared twice on purpose: once under
`@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`,
and once under `:root[data-theme="dark"]`, so a host page can force either theme.

**Rules.**

- A zone's colour follows the zone: the shelf in the drawing, the top rule of its
  card, its crop sprite and its column in the crew board all use the same
  `--zN`. Pass it to a component as `--zc` (`style="--zc:var(--z1)"`).
- Crimson means the colonial system or the one action the player takes next.
  Do not use it for decoration.
- Green and red never stand alone: a number in red still says "−402 frost" or
  "Hunger: 31 people died".
- The canvas reads the same tokens (`getComputedStyle`) and redraws when the
  theme changes, so the scene follows dark mode too.

## Type

Loaded from Google Fonts in one `<link>`:
**Archivo** (variable width and weight), **Atkinson Hyperlegible** and
**IBM Plex Mono**.

| token | face | for |
| --- | --- | --- |
| `--f-display` | Archivo, weight 800–900, width 110–125%, uppercase | the wordmark, headlines, zone names, buttons |
| `--f-body` | Atkinson Hyperlegible, 16 px, line height 1.5 | everything you read |
| `--f-mono` | IBM Plex Mono with `tabular-nums` | every number, labels, status lines, the field log |

**Rules.**

- Hierarchy comes from weight, width and brightness, not colour. In a zone label,
  the name is the brightest and heaviest line; the Quechua name, altitude and
  temperatures are smaller and dimmer.
- Numbers are always monospace with tabular figures, so columns line up and a
  changing number does not jitter.
- Eyebrows (`.eyebrow`): monospace, 11 px, uppercase, letter-spaced 0.12em,
  muted. They name the kind of thing below them ("Harvest 1 of 6 · report",
  "Milestone").
- Headlines use `text-wrap: balance`.

## Layout

- One column, at most 980 px wide, with a 16 px gutter that respects the
  phone's safe areas. No horizontal scroll at 375 px.
- The **stage** is the screen's centre: the food and GDP bar on top, the drawn
  mountain, then the crew board docked under it with one column per zone, under
  that zone. Below them sit the play controls and the field log.
- A report replaces the crew board while it is open, inline on the page, never as
  a floating overlay (an overlay can open off screen in an embedded viewer).
- When the game moves on, it scrolls to the top of the stage, so the food and GDP
  numbers stay in view; when a milestone opens, it scrolls to the milestone.
- Four columns become two on phones (`repeat(4, minmax(0,1fr))` → 2 below 620 px).

## Components

Each is a few lines of CSS in the game file; copy them by class name.

| component | classes | what it is for |
| --- | --- | --- |
| Panel | `.panel` | any block of reading or controls: surface, 1 px line, 6 px radius |
| Report card | `.card`, `.card.big` | a harvest report or a turning point; a 4 px ink top rule, 6 px crimson for the big ones |
| Stat tiles | `.rtiles` | the numbers a report leads with: four across, two on phones; label in mono caps, value in mono 24 px, a muted line under it |
| Ledger | `.ledger` | where the food went: label left, mono value right, a bold total row |
| Chip | `.chip`, `.chip.ok`, `.chip.low` | a short verdict beside a headline ("1,700 kcal/day") |
| Stepper | `.step` | − count + for crews; 34 px buttons, 44 px on phones |
| Build toggle | `.build` | dashed border in the zone colour, solid and tinted when chosen |
| Main button | `.btn` | crimson, display face, uppercase; one per screen |
| Secondary button | `.btn.ghost`, `.tbtn` | outlined; play controls in a segmented group (`.seg`) |
| Milestone | `.milestone` | a gold-bordered box at the top of a report; crimson for the paradox, red for hunger, stores and frost |
| Field log | `.flog` | a collapsible running log in mono, one line per event, red and green lines, a bold summary line per harvest |
| Glossary | `.gloss`, `.gico` | term, icon in a tinted square, one or two plain sentences |
| Timeline | `.tl` | the progress bar: tick marks, a crimson fill, the gap year labelled in crimson |
| Source links | `.srclinks` | one muted mono line linking the evidence and the code, never a button |

**Icons** come from the IconMCP library: outline icons on a 16-unit grid, drawn
with `stroke="currentColor"` so they take the colour of their container. Use one
icon per idea, inside a tinted square (`.gico`) in the colour of what it names.

## The drawn scene

The mountain is drawn on a `<canvas>` from flat shapes, redrawn each frame:

- a sky band, a far ridge, then the mountain profile rising left to right, one
  flat shelf per zone, and the summit drawn behind the highest zone;
- crops are tiny sprites per zone (maize, potatoes, kañiwa, llamas), more of
  them as the player adds crews, with a slight sway;
- each shelf is labelled underneath on the rock face: the name in the display
  face, then dimmer mono lines. On phones the labels drop the altitude and round
  to whole degrees so they do not collide;
- harvest results float above the shelves ("+1,272", "−402 frost") during the
  harvest animation, then fade;
- improvements are drawn where they are: terraces as stone retaining walls
  stepping up the slope below a shelf, each topped with a strip in the zone's
  colour; waru waru as raised beds between water channels across the shelf.
  While being built they are drawn faint;
- in the colonial years Potosí's Cerro Rico stands behind the slope: a rounded red
  cone with pale ore veins, a dark mine mouth for each crew sent there, mita
  workers in crimson and wage workers in gold, labelled in words as well
  ("mita 1 · wage 2"), and more silver glints as output rises. Its foot is hidden
  behind the slope, as a far mountain's should be;
- the scene is drawn on demand: at full speed only while something animates, at
  once after a change, a few times a second for the crops' sway (never with
  reduced motion), and not at all while off screen;
- with `prefers-reduced-motion`, animations shorten to almost nothing.

The scene's job is to make the zones physical: higher is colder, and you can see
where your crews are. It is not a data chart; numbers live in the bar and the
reports.

## Data graphics

- **Charts** are hand-drawn SVG, one y-axis each, labels in the right margin, a
  reference line for the goal ("Goal 1,700") and the historical estimate shown
  as a marked point with its source.
- **GDP is an index** (the 1500 level = 100), so series in different dollars are
  never mixed.
- **The quipu** draws a report's numbers as knotted cords, read in base ten from
  the top, on faint place-value bands. It is both a chart and a lesson: the
  caption teaches how to read it.

## Writing

- The audience reads English fluently but is new to the history. Plain words,
  short sentences, every borrowed term in the glossary.
- Every number the game invented is labelled as a game number, where the
  player reads it ("game figure", "teaching assumption", "model guess").
- Name the source in the sentence when there is one ("Murra called this the
  vertical archipelago"); say plainly when there is none.
- Say what the game leaves out, near where it matters ("the game leaves out the
  bad years that hit some heights and spared others").
- Status lines say what will happen and how to change it ("Auto: harvest in 4 s.
  Change crews any time, or press Pause.").

## Interaction

- One Play/Pause button and Next step. Every automatic step can be paused, and
  milestones pause play by themselves.
- Auto-play shows its work: it deals the plan into the crew board one crew at a
  time, and any click takes over.
- Predictions first: the player commits to a guess before playing, and the end
  screen grades it against a fair comparison (same people, same weather).
- Replay with the same weather (`?seed=N` in the address) so a class can compare
  one changed choice.

## Before you ship

- Check at 375 px and in dark mode, and read the browser console.
- If one HTML file serves both an embedded viewer and GitHub Pages, give it its
  own doctype and `[hidden]{display:none!important}`. Viewers supply these;
  Pages does not, and hidden panels will otherwise show.
- Keep an evidence registry if your game says anything about history: every
  claim with its kind, its sources and how far they were read
  (`evidence/claims.yml` here), and a checker that fails when the game and the
  registry disagree.
