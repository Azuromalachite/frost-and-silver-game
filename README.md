# Frost & Silver

A browser game for a world-history class. You run an Andean ayllu (a farming community of about 1,000 people) for six farming years. Years 1–3 are under the Inca, around 1500. Years 4–6 come after 1573, when the Spanish colonial mita sends one man in seven from the mita region to the silver mines at Potosí.

The question the game puts to students: **can output per person rise while people go hungry?**

## Play

Open `frost-and-silver.html` in a browser. It is one self-contained file; the only outside resources are Google Fonts.

Each year you:

- assign work crews to four altitude zones (Yunga, Quechua, Suni, Puna);
- build terraces (andenes) or raised fields (waru waru) against frost;
- freeze-dry surplus into chuño for the storehouse (qollqa);
- in the colonial years, choose whether to send crews to Potosí for wages.

Students record a prediction before playing. The end screen compares Inca and colonial years, shows what each colonial rule cost, and produces a text report to paste into a class page.

## What the model is, and is not

The game is a teaching model, not a reconstruction. It was calibrated so that default play gives roughly:

| | Inca years | Colonial years |
|---|---|---|
| Food available per person per day | ~1,620 kcal | ~1,270 kcal |
| GDP per person (1990 Int$) | ~$414 | ~$437 |

The colonial rules are the cause, by design: the mita leaves every crew one-seventh short, tribute takes 24% of the harvest (a game rule; the real tribute was a fixed amount per adult man), and silver from Potosí is added to output. The end screen says this to students.

Anchors and their status:

- **GDP per person 416 (1500) → 438 (1600):** Maddison's conjectural estimates for Latin America as a whole, not Andes-specific.
- **1,700 → 1,200 kcal per day:** the original game's teaching figure. We could not find a primary source; the game marks it as unsourced.
- **Households below 1,700 kcal:** a model guess (household food assumed to vary 30% around the average), illustrating the point of Wernke & Whitmore (2009) that households can go short while a region has a surplus.
- **Population:** the game uses a single 12% loss at the transition. Historians estimate the real fall was well over half; the game says so.

The text and model were checked by two independent reviews (claims and charts; model logic). Their findings are fixed in this version.

## Sources

- Maddison, A. (2003). *The World Economy: Historical Statistics.* OECD.
- Arroyo Abad, L., & van Zanden, J. L. (2016). Growth under extractive institutions? *Journal of Economic History*, 76(4).
- Dell, M. (2010). The persistent effects of Peru's mining mita. *Econometrica*, 78(6).
- Wernke, S. A., & Whitmore, T. M. (2009). Agriculture and inequality in the colonial Andes. *Human Ecology*, 37, 421–440.
- Orlove, B. S., Chiang, J. C. H., & Cane, M. A. (2000). Forecasting Andean rainfall and crop yield from the influence of El Niño on Pleiades visibility. *Nature*, 403.
- Pontzer, H., et al. (2016). Metabolic acceleration and the evolution of human brain size and life history. *Nature*, 533, 390–392.
- Murra, J. V., on the "vertical archipelago"; Pulgar Vidal, J. (1941), on the altitude zones.

## Credits and licence

Adapted from [“Week 2: Tahuantinsuyu Harvest & Frost Defense”](https://superlative-sprinkles-2653a1.netlify.app/) by Amnuayvit Thitibordin, licensed [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Changes: rebuilt as a turn-based game with a colonial second act, a new model, and a new visual design. Icons from the IconMCP library.

This adaptation is licensed under **CC BY-NC-SA 4.0** as well (see `LICENSE.md`): you may share and adapt it for non-commercial purposes, with attribution, under the same licence.
