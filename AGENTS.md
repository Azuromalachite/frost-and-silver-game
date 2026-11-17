# AGENTS.md — rules for anyone changing Frost & Silver, human or AI

Frost & Silver is a **teaching game about economic history**, adapted from
Amnuayvit Thitibordin's "Week 2: Tahuantinsuyu Harvest & Frost Defense". The
lesson is his: GDP per person in sixteenth-century Latin America grew, but
life did not get better, because food per person fell. What can go wrong here
is a game number that reads like a historical fact, or a sentence that says
more than its source. Both look exactly like correct content. Read this file
before editing anything. `CLAUDE.md` imports it, so every agent reads the same
rules. `CONTRIBUTING.md` has the longer version.

## Run it

```bash
python -m pip install pyyaml          # the only dependency
python evidence/check_evidence.py     # must exit 0 before a commit
python -m unittest discover -s tests  # after changing the checker
python -m http.server 8000            # then open localhost:8000/frost-and-silver.html?seed=12345
```

There is no build step and no JavaScript test suite (an optional Node harness, `tests/review_model.cjs`, is a dated snapshot; see `CONTRIBUTING.md`). **Load the page and read
the console after every edit to the game.** A single unescaped apostrophe in
a single-quoted string stops the whole script; the checker cannot see that.

## Where facts live

| what | where |
| --- | --- |
| the whole game: model, text, drawing | `frost-and-silver.html` (one file; `index.html` only redirects) |
| each claim the game makes, its kind (`layer`) and evidence state (`status`) | `evidence/claims.yml` |
| each source and how far anyone here has read it (`access`) | `evidence/sources.yml` |
| prose for readers, open questions | `README.md`, `docs/history-and-evidence.md` |
| the pinned run and the rules a person must check | `CONTRIBUTING.md` |

The prose and the game are **downstream** of the registry. A sentence that
states a claim more strongly than its registry entry allows is wrong.

## Never

- **Present a game number as a historical one.** The mita share, tribute,
  frost losses, yields, the GDP formula and the zone temperatures are
  `game_assumption`s. They are labelled as such in the game and the registry.
- **Treat calibration as confirmation.** The model was tuned to land near
  Maddison's 416 and 438; matching them is a design choice, not evidence.
- **Credit silver for the colonial GDP rise.** In the model it comes mostly
  from the population collapse (more land per survivor). The game says so;
  keep it that way unless the model changes.
- **Mix dollar series.** GDP is shown as an index (c. 1500 = 100) because
  Maddison (2003) uses 1990 dollars and the Maddison Project uses 2011
  dollars.
- **Drop the "unsourced" label from the 1,700 → 1,200 kcal figure.** No source
  for it has been found.
- **Upgrade a claim's status without reading the source.** A source seen only
  in someone else's notes stays `from_notes`, and its claim stays
  `unverified`.
- **Change a constant without updating its claim.** The checker fails until
  you do. That is deliberate: a changed number has to be re-labelled where
  people read it. Never edit the registry just to make the check pass.
- **Publish course material we have no permission to share.** The course's
  lecture slides stay local: never commit, quote or upload them. Links to
  private chat libraries stay out of the repository too.
- **Reproduce copyrighted text.** At most one short quotation (under 15 words)
  per source, in quotation marks, with attribution.
- **Lose the credit or the licence.** The adaptation is CC BY-NC-SA 4.0, like
  the original. Keep the original author's credit (he/him) and the line
  "Adapted by Thanakrit Wongsatit".

## Invariants

Each one cites what taught it.

1. **The same file serves the artifact and GitHub Pages, so it carries its own
   doctype and `[hidden]{display:none!important}`.** The artifact host
   supplied both; Pages did not, hidden panels showed, and the game looked
   stalled. **Test the Pages copy, not only a local or artifact copy.**
2. **The pinned run reproduces exactly.** With `?seed=12345`, the default plan
   and Next step only, the results read
   `1,764 kcal | 1,371 kcal | 80 → 53 | 103 | 108 | 46% → 73%`. A change that
   is meant to leave the model alone must reproduce this. A change to the
   model recalibrates (60–80 games of default play), then updates this line
   and the numbers in `README.md` and the evidence document.
3. **Every checker rule can fail.** Each rule has a test that plants its
   defect, and the same test with the rule disabled must pass. A rule with no
   failing case is not known to work.
4. **Display-only numbers stay display-only.** The zone temperatures do not
   affect frost; the game says so. Making them drive the model is a model
   change (see 2).
5. **The audience reads English fluently but is new to Andean history.** Every
   Quechua or Spanish term the game uses has a glossary entry.
6. **Play is controllable.** The Play/Pause toggle and Next step always work,
   and milestone pop-ups pause play. Players read each harvest before the
   next one. Auto-play deals the plan crew by crew where players set it by
   hand, and any click takes over. Next step never deals, so the pinned run
   does not depend on auto-play.

## Before you call a change done

1. The checker exits 0, and the tests pass if you touched the checker. Read the
   exit status directly. On Windows, `wsl bash -c '…'` from Git Bash reports
   the wrong status; call `wsl --cd <repo> python3 …`.
2. The page loads with no console errors, at desktop width and at 375 px.
3. The pinned run matches, or it was deliberately re-recorded.
4. After pushing, the Pages copy serves the new version and plays.

## Working style

- Respect human edits. Never rewrite text you were not asked to change.
- Make the smallest complete change. Do not refactor alongside a fix.
- Commit subjects are imperative and say what changed; the body says why.
  AI-assisted commits carry a `Co-Authored-By` line.
- A question only the original author can answer goes under "Open questions"
  in `docs/history-and-evidence.md`.
