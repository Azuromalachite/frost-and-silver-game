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
with Next step only. The results tiles must read, in order:

`1,764 kcal | 1,371 kcal | 80 → 53 | 103 | 108 | 46% → 73%`

(Since the chuño winter roll, 2026-11-18. Seed 12345 draws three mild Inca winters, so
its chuño stores are smaller than before; it read `1,740 | 1,401 | 80 → 54 | 103 | 108 |
47% → 71%` until then.)

(Inca food, colonial food, welfare index, GDP index Inca, GDP index colonial,
households below 1,700). A change that is meant to leave the model alone must
reproduce this exactly. A change to the model will move it: recalibrate
(60–80 games of default play), then record the new line here.

## Optional: the Node model harness

`tests/review_model.cjs` (from the 2026-11-18 research review) runs the game's model
headless under Node.js. The Python tests do not run it, and its recorded output
(`evidence/review-model-2026-11-18.json`) is a snapshot of commit `d0d9474`. Update
its pinned values before trusting it again.

## Before you open a pull request

Every change to `main` goes through a pull request; direct pushes, force-pushes
and deleting `main` are blocked. A PR can merge once the `checks` workflow
passes. It runs the same commands you can run locally:

```bash
python evidence/check_evidence.py
python -m unittest discover -s tests
python tools/extract_game_script.py frost-and-silver.html game.js && node --check game.js
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
