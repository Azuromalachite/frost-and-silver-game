# Contributing

Corrections to the history, better sources and classroom reports are the most
useful contributions. Open an issue or a pull request.

## The evidence registry

Everything the game says about the Andes is registered in
[`evidence/claims.yml`](evidence/claims.yml), and every work it relies on in
[`evidence/sources.yml`](evidence/sources.yml). The readable version is
[`docs/history-and-evidence.md`](docs/history-and-evidence.md).

A claim has two independent axes:

- **`layer`**: what kind of statement it is.
  - About history: `documented` (a source says it), `estimate` (a scholarly
    reconstruction with wide uncertainty), `interpretation` (a reading
    historians argue about).
  - About the model: `game_assumption` (a number or rule the game chose),
    `game_result` (what the model produces from its assumptions).
  - `unsourced`: circulates in course material, but no source was found.
- **`status`**: what the evidence currently says.
  - History claims: `supported`, `partly_supported`, `unverified`,
    `unsupported`, `open`.
  - Game claims: always `labelled`, meaning the game tells the player it is an
    assumption or a model result.
  - Unsourced claims: always `unsupported`.

A source records how far anyone in this project has read it (`access`):
`full_text_read`, `figures_checked`, `abstract_read`, `reference_work`,
`from_notes` (cited from someone else's reading notes or review) or `not_read`.

## Rules the checker enforces

- `supported` needs a source at `full_text_read` or `figures_checked`;
  `partly_supported` needs at least `abstract_read` or `reference_work`.
- An `unsourced` claim records what was `searched`.
- A `game_assumption` names the `code` that sets it, and that code must still
  be in `frost-and-silver.html`. **If you change a constant in the game, the
  checker fails until you update the claim.** That is deliberate: a changed
  number has to be re-labelled where people read it.
- A game claim must be stated in the game itself, so players see the label.
- Every page anchor is still on its page; every claim ID mentioned in a
  markdown file exists; every source is used.

## Rules a person has to check

- **Claim strength does not exceed the source.** A source read only through
  someone else's notes stays `unverified` however good it sounds.
- **A game number is not a historical number.** "The game uses 50%" belongs in
  a `game_assumption`, never in a `documented` claim.
- **Calibrated is not confirmed.** The game was tuned to land near Maddison's
  416 and 438; matching them is a design choice, not evidence.
- **After any change to the model, recalibrate** (60–80 games of default play)
  and update the numbers in the README and the evidence document.

## Pinned run (check after any change)

Open the game with `?seed=12345`, predict anything, and play the default plan
with Next step only, choosing **Best land first** each time the game asks you to
re-plan (at 1573 and after the 1585–91 epidemics). The results tiles must read, in order:

`1,760 kcal | 1,410 kcal | 74 → 52 | 103 | 109 | 45% → 75%`

(Since the re-plan choice, 18 November 2026. Before it the board re-planned
silently and the line read `1,764 | 1,371 | 80 → 53 | 103 | 108 | 46% → 73%`.)

(Since the chuño winter roll, 2026-11-18. Seed 12345 draws three mild Inca winters, so
its chuño stores are smaller than before; it read `1,740 | 1,401 | 80 → 54 | 103 | 108 |
47% → 71%` until then.)

(Inca food, colonial food, welfare index, GDP index Inca, GDP index colonial,
households below 1,700). A change that is meant to leave the model alone must
reproduce this exactly. A change to the model will move it: recalibrate
(60–80 games of default play), then record the new line here.

## The model check

`tests/review_model.cjs` runs the game's own script headless under Node.js and
asserts the pinned run below, identical replays, weather unchanged by choices,
the welfare sum, the weather presets' benchmarks, and over seeds 1–80 the
numbers the game and the docs quote: mean colonial food under each re-plan
choice, the rules' food effect falling in every game (the graded prediction),
how the ungraded GDP effect reads and how often the two re-plan choices read it
differently (`claim.game.grading_weather`), which re-plan choice grows more by
board (`claim.game.replan_dominance`) and the changing plan's record
(`claim.game.changing_plan`), the plan offered as chosen in advance
(`claim.game.advance_plan`), and the field output the rules cost apart from
silver, with resettlement's part. CI runs it on every pull request, with
`--self-test`, which plants eleven model changes and requires each to trip the
assertion meant for it. A change that moves one of these numbers must update
the constant at the top of that file, and the places that quote it, in the same
pull request. Without Node, `tools/run_model_check.html` runs the same file in a
browser. (`evidence/review-model-2026-11-18.json` is the first run's output, a
dated snapshot of commit `d0d9474`.)

## Before you open a pull request

Every change to `main` goes through a pull request; direct pushes, force-pushes
and deleting `main` are blocked. A PR can merge once the `checks` workflow
passes. It runs the same commands you can run locally:

```bash
python evidence/check_evidence.py
python -m unittest discover -s tests
python tools/extract_game_script.py frost-and-silver.html game.js && node --check game.js
node tests/review_model.cjs && node tests/review_model.cjs --self-test
```

The last line catches syntax errors in the game's script (an unescaped
apostrophe once stopped the whole game). It cannot tell whether the game plays:
load the page, and run the pinned game, yourself.

The checker needs PyYAML (`python -m pip install pyyaml`).

**Read the exit status directly.** A wrapper can print success over a
failure. Before trusting a harness, run `python -c "import sys; sys.exit(3)"`
through it and confirm it reports 3. (On Windows, `wsl bash -c '…'` from Git
Bash loses its quoting and reports the wrong status; call `wsl --cd <repo>
python3 …` directly.)

## Licence

Contributions are accepted under the repository's CC BY-NC-SA 4.0 licence.
