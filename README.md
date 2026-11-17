# Frost & Silver

A browser game for a world-history class. You run an Andean ayllu (a farming community of about 1,000 people) for six farming years. Years 1–3 are under the Inca, around 1500. Years 4–6 come after 1573, when the Spanish colonial mita sends one man in seven from the mita region to the silver mines at Potosí.

The question the game puts to students: **can output per person rise while people go hungry?**

## Play

Play online: **https://azuromalachite.github.io/frost-and-silver-game/**

Or download `frost-and-silver.html` and open it in a browser. It is one self-contained file; the only outside resources are Google Fonts.

Each year you:

- assign work crews to four altitude zones (Yunga, Quechua, Suni, Puna);
- build terraces (andenes) or raised fields (waru waru) against frost;
- freeze-dry surplus into chuño for the storehouse (qollqa);
- in the colonial years, choose whether to send crews to Potosí for wages.

Students record a prediction before playing. The end screen compares Inca and colonial years, shows what each colonial rule cost, and produces a text report to paste into a class page.

## What the model is, and is not

The game is a teaching model, not a reconstruction. Default play (80 simulated games) gives about:

| | Inca years | Colonial years |
|---|---|---|
| Food available per person per day | ~1,650 kcal | ~1,280 kcal |
| GDP per person (1990 Int$) | ~$420 | ~$452 |

The end screen separates two things:

- **Over time** (what an observer would see): food falls and GDP per person rises in nearly every game.
- **What the colonial rules did** (same people, same weather, Inca rules instead): food about −600 kcal; GDP roughly unchanged (+$2), because silver about offsets the field labour lost. Over time, GDP per person rises mainly because the population collapse left more land per survivor. Predictions are graded on this comparison, so weather cannot flip a correct prediction.

### Mechanisms that carry the result

| Mechanism | In the game | Status |
|---|---|---|
| Colonial quotas fixed at the 1573 count | mita = one man in seven of the 1573 population; tribute a fixed total (500 kcal per person at 1573, taken in food), so the burden per survivor rises | structure follows Toledo's system; tribute size is a game figure |
| Inca labour duty | one man in ten on state and temple fields; half that harvest returned as feasts and rations | teaching assumption |
| Land per person | zone output ∝ labour^0.9, so survivors farm more land each, but terraces need hands | teaching assumption (cf. Wernke 2010) |
| Reducciones | colonial yields 15% lower: families resettled into towns far from fields | mechanism from Wernke 2010; size is a teaching assumption |
| Population | −50% before 1573, −15% more in the 1585–91 epidemics | round game figures; estimates vary widely |
| GDP | 340 + 0.045 × field output + silver | teaching assumptions, tuned to start near Maddison's 416 |

A "What would have to be true for this to reverse?" panel lets students change the Inca duty, colonial tribute, population fall and the value of mine work against farm work, and shows the thresholds where food would rise or GDP would fall.

Everything else (yields, frost and drought odds, protection, chuño, storage, eating cap, hunger deaths, wage relief, household spread) is a play mechanic; the in-game "How the model works" section lists them.

### Anchors and their status

- **GDP per person 416 (1500) → 438 (1600):** Maddison's conjectural estimates for Latin America as a whole, not Andes-specific. The game runs a little above 438 in the colonial years.
- **1,700 → 1,200 kcal per day:** the original game's teaching figure. We could not find a primary source; the game marks it as unsourced.
- **Households below 1,700 kcal:** a model guess (household food assumed to vary 30% around the average), illustrating the point of Wernke & Whitmore (2009) that households can go short while a region has a surplus.

The text and model were checked by four independent reviews (claims and charts; model logic; model construction; parameters and sensitivity), and their findings are addressed in this version.

## Sources

- Maddison, A. (2003). *The World Economy: Historical Statistics.* OECD.
- Arroyo Abad, L., & van Zanden, J. L. (2016). Growth under extractive institutions? *Journal of Economic History*, 76(4).
- Dell, M. (2010). The persistent effects of Peru's mining mita. *Econometrica*, 78(6).
- Wernke, S. A., & Whitmore, T. M. (2009). Agriculture and inequality in the colonial Andes. *Human Ecology*, 37, 421–440.
- Wernke, S. A. (2010). A reduced landscape: toward a multi-causal understanding of historic period agricultural deintensification in highland Peru. *Journal of Latin American Geography*, 9(3), 51–83.
- Orlove, B. S., Chiang, J. C. H., & Cane, M. A. (2000). Forecasting Andean rainfall and crop yield from the influence of El Niño on Pleiades visibility. *Nature*, 403.
- Pontzer, H., et al. (2016). Metabolic acceleration and the evolution of human brain size and life history. *Nature*, 533, 390–392.
- Murra, J. V., on the "vertical archipelago"; Pulgar Vidal, J. (1941), on the altitude zones.

## Credits and licence

Adapted from [“Week 2: Tahuantinsuyu Harvest & Frost Defense”](https://superlative-sprinkles-2653a1.netlify.app/) by Amnuayvit Thitibordin, licensed [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Adapted by Thanakrit Wongsatit. Changes: rebuilt as a turn-based game with a colonial second act, a new model, and a new visual design. Icons from the IconMCP library.

This adaptation is licensed under **CC BY-NC-SA 4.0** as well (see `LICENSE.md`): you may share and adapt it for non-commercial purposes, with attribution, under the same licence.
