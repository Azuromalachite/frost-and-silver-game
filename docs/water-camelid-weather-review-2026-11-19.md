# Frost & Silver: crop water, pasture and camelid exposure
Review date: 19 November 2026 (Asia/Seoul). Reviewed against main `5c3b7ee` (PR #41).

## What this review adds

The useful ecological unit is a sequence of weather, soil water, vegetation and animal states. A single annual drought or frost penalty cannot identify which mechanism caused a loss.

The teaching baseline stays frozen. These are Path B reading notes and draft experiment questions, not a pre-registration or new numerical calibration. Abstract-only leads are registered as unverified; selected readings remain partly supported. Source access is recorded in [the registry](../evidence/sources.yml), and remaining barriers in [ACCESS.md](../references/ACCESS.md).

This integrated review connects crop water use, camelid life stages and historical weather knowledge. It distinguishes observations, model results, our proposed experiments, and access limitations. It does not change the teaching game, run an ecological experiment, preregister an experiment, or establish sixteenth-century parameter values.

The source registry on the reviewed main was checked before integration. Existing coverage includes regional climate, crop frost, adult llama energetics and alpaca neonatal protection. The crop-water papers below expand that coverage.

## 1. Crop water: findings and extraction limits

### W1. FAO 56, Allen et al. (1998)

**Soil water storage mediates the relation between rainfall and crop water stress.**

Registry: `claim.research.crop_water_balance` (partly_supported).

[Official chapter 8](https://www.fao.org/4/x0490e/x0490e0e.htm). Access/read: open official HTML; selected equations and soil-water-balance sections.

Reference evapotranspiration, crop coefficients, actual water use and irrigation demand are distinct. In the dual-coefficient formulation, water stress reduces transpiration, while soil evaporation remains separate: ETa = (Ks Kcb + Ke) ETo. Rainfall, irrigation and capillary rise replenish the root zone; evaporation, transpiration, runoff and drainage remove water. Soil storage and rooting depth therefore mediate rainfall effects. This supplies a process framework, not historical Andean crop coefficients.

### W2. Garcia, Raes & Jacobsen (2003)

**Quinoa water coefficients were estimated under specified Altiplano conditions.**

Registry: `claim.research.quinoa_water_coefficients` (partly_supported).

*Evapotranspiration analysis and irrigation requirements of quinoa (Chenopodium quinoa) in the Bolivian highlands.* Agricultural Water Management 60:119–134. [DOI](https://doi.org/10.1016/S0378-3774(02)00162-2). [Article-text route](https://www.academia.edu/12494025/Evapotranspiration_analysis_and_irrigation_requirements_of_quinoa_Chenopodium_quinoa_in_the_Bolivian_highlands).

Access/read: article text, selected Methods and Results, including the water-balance discussion; original table images not independently checked.

Patacamaya lysimeter and field measurements distinguish unstressed crop water use from water-limited use. Reported quinoa Kc values vary by growth stage (0.5 initially, 1.0 at mid-season, 0.7 at harvest); the estimated seasonal Ky is 0.67. These are provisional text-mirror candidates, not calibrated inputs for every quinoa cultivar or for kañiwa. Extracted tables contain damaged symbols and alignment. Verify the original tables and definitions before reproducing a numerical calibration.

### W3. Garcia et al. (2004)

**Temperature-only water-demand estimates did not transfer equally across the studied highland sites.**

Registry: `claim.research.highland_et_methods` (partly_supported).

*Dynamics of reference evapotranspiration in the Bolivian highlands (Altiplano).* Agricultural and Forest Meteorology 125:67–82. [DOI](https://doi.org/10.1016/j.agrformet.2004.03.005). [Article-text route](https://www.academia.edu/54038635/Dynamics_of_reference_evapotranspiration_in_the_Bolivian_highlands_Altiplano_).

Access/read: selected article text, including the comparison of estimation methods.

FAO Penman–Monteith agreed with measured grass evapotranspiration at four locations. Temperature-only estimates were less transferable: Hargreaves–Samani performed differently between northern and southern sites, while Thornthwaite underestimated demand. Cold air alone is therefore an inadequate basis for assigning low water demand in the highlands. Radiation, humidity and wind deserve explicit treatment or an independently validated approximation.

### W4. Geerts et al. (2008): stage-specific irrigation

**The stage-specific quinoa irrigation study is an abstract-only lead in this review.**

Registry: `claim.research.quinoa_stage_water` (unverified).

*Introducing deficit irrigation to stabilize yields of quinoa (Chenopodium quinoa Willd.).* European Journal of Agronomy 28:427–436. [DOI](https://doi.org/10.1016/j.eja.2007.11.008). [IRD record](https://www.documentation.ird.fr/hor/PAR00002327).

Access/read: detailed author abstract in institutional records; complete methods/tables remain unaccessed.

The work combines controlled drought treatments with trials at Patacamaya and Condoriri over two cropping seasons. Early grain filling was especially sensitive, followed by flowering. Irrigation did not significantly outperform rainfed cultivation at Condoriri when rainfall already covered critical stages. This supports testing rainfall timing, not a universal benefit from irrigation. Full methods are still needed for cultivar, treatment and effect-size extraction.

### W5. Geerts et al. (2008): groundwater and salinity

**Groundwater and salinity complicate the benefits of supplemental irrigation.**

Registry: `claim.research.quinoa_groundwater_salt` (partly_supported).

*Could deficit irrigation be a sustainable practice for quinoa ... in the Southern Bolivian Altiplano?* Agricultural Water Management 95:909–917. [DOI](https://doi.org/10.1016/j.agwat.2008.02.012). [Article-text route](https://www.academia.edu/7608767/Could_deficit_irrigation_be_a_sustainable_practice_for_quinoa_Chenopodium_quinoa_Willd_in_the_Southern_Bolivian_Altiplano).

Access/read: selected Methods, Results and Conclusions in article text; original figures/tables not visually verified.

The study compares modern sites with and without shallow-groundwater contributions. Supplemental irrigation helped only after a substantial baseline water requirement was met; the reported approximate 55% threshold was context-dependent. Capillary rise contributed a modeled 8–25% of seasonal crop evapotranspiration at Irpani. Salt accumulation and leaching outcomes were modeled, rather than established by a long historical field record. Water quantity, timing and quality can change the sign or persistence of an irrigation benefit.

### W6. Geerts et al. (2009): AquaCrop

**Rainfall aggregation changed water-stressed quinoa simulations in the published model.**

Registry: `claim.research.quinoa_water_resolution` (partly_supported).

*Simulating Yield Response of Quinoa to Water Availability with AquaCrop.* Agronomy Journal 101:499–508. [DOI](https://doi.org/10.2134/agronj2008.0137s). [Article-text route](https://www.academia.edu/6676195/Simulating_Yield_Response_of_Quinoa_to_Water_Availability_with_AquaCrop).

Access/read: publisher abstract plus selected Methods, calibration, validation and sensitivity sections through article text. Publisher PDF route redirected to an abstract page.

Eight calibration fields and fourteen validation fields provided more than an abstract claim of model fit. Daily rainfall matters: ten-day or monthly rainfall aggregation underestimated biomass and yield in highly stressed fields in this study. Some default stress routines were modified for quinoa. We should not treat generic AquaCrop defaults as a validated local cultivar. Original parameter-table images and the experimental weather/soil datasets remain priorities before replication.

### W7. Alvarez-Flores et al. (2018): kañiwa is not quinoa

**The rhizotron experiment found population-specific rooting responses to water deficit.**

Registry: `claim.research.chenopodium_root_plasticity` (partly_supported).

*Rooting plasticity in wild and cultivated Andean Chenopodium species under soil water deficit.* Plant and Soil 425:479–492. [DOI](https://doi.org/10.1007/s11104-018-3588-7). [Author-uploaded text](https://www.researchgate.net/publication/322937104_Rooting_plasticity_in_wild_and_cultivated_Andean_Chenopodium_species_under_soil_water_deficit).

Access/read: selected Methods, Results and Discussion from the author-uploaded article. IRD's own route requests access; the public author text resolves access for these sections.

The six-week rhizotron experiment includes C. pallidicaule (kañiwa), C. hircinum and two quinoa ecotypes under contrasting vertical moisture profiles. Dry-habitat quinoa showed particularly strong deep-root exploration and plasticity. This establishes population-specific responses in seedlings, not a universal field ranking of drought tolerance or seasonal edible yield. It challenges sharing one rooting-depth or drought coefficient across the game's highland grains.

### W8. Vacher (1998): bitter potato and quinoa

**Bitter-potato drought physiology remains an abstract-only reading lead here.**

Registry: `claim.research.bitter_potato_water_lead` (unverified).

*Responses of two main Andean crops, quinoa ... and papa amarga (Solanum juzepczukii) to drought on the Bolivian Altiplano: significance of local adaptation.* Agriculture, Ecosystems & Environment 68:99–108. [Institutional record](https://www.documentation.ird.fr/hor/fdi:010051977).

Access/read: author abstract only; IRD requests the PDF and publisher retrieval returned 403.

This is a particularly relevant physiological lead because it studies Luki bitter potato alongside two quinoa varieties under Altiplano field drought. Their gas-exchange responses unfolded differently over the drought period. It is closer to the game's crop context than assuming every potato behaves like a modern commercial cultivar. The abstract's dry-matter yields must not be relabeled as edible grain or tuber yields without full methods.

### W9. Martinez-Maldonado et al. (2024): Andean potato carbon–water coupling

**Carbon-water flux measurements do not directly measure edible potato energy.**

Registry: `claim.research.potato_water_carbon` (partly_supported).

*Carbon and water vapor exchanges coupling for different irrigated and rainfed conditions on Andean potato agroecosystems.* Theoretical and Applied Climatology 155:7609–7628. [DOI](https://doi.org/10.1007/s00704-024-05034-1). [University-hosted PDF](https://repositorio.usp.br/directbitstream/72e030ad-48be-4d92-b3db-9ab17665b456/3203898-Carbon_and_water_vapor_exchanges_coupling_for_different_irrigated_and_rainfed_conditions_on_Andean_potato_agroecosystems.pdf).

Access/read: PDF text; selected site description, Methods and Discussion. Figures were not independently visually checked.

Eddy-covariance measurements relate water exchange to canopy and carbon dynamics. Crucially, the water regimes were observed on different commercial plots in Colombia, not a single randomized, replicated irrigation experiment. Site and management differences complicate causal attribution. Ecosystem carbon uptake and inherent water-use efficiency are not edible tuber energy per cubic metre.

### W10. Lascano Muñoz et al. (2026): hold the yield-preservation claim

**The Superchola article's abstract and yield table require reconciliation.**

Registry: `claim.research.potato_water_reporting` (partly_supported).

*Physiological and Productive Response of Solanum tuberosum L. var. Superchola to Water Deficit in the Andean Highlands of Ecuador.* Agriculture 16:246. [DOI/full text](https://doi.org/10.3390/agriculture16020246).

Access/read: open publisher HTML; Abstract, Methods, Results and Tables 7–9.

The abstract says moderate deficit preserved yield, but Table 9 gives different significance groups for full and moderate irrigation: 2.08 versus 1.72 kg/plant and 230.98 versus 169.2 kg total yield. Treatment labels alternate between ETo and ETc. The stated water-saving percentage also needs its denominator clarified. These are reporting questions, not proof of misconduct. Do not adopt the abstract's yield-preservation claim as a parameter until the discrepancies are resolved.

## 2. Camelids: separate adults, young animals and pasture access

### C1. Riek et al. (2019): adult llama energetics

**Adult llama energetics varied with movement as well as environmental conditions.**

Registry: `claim.research.llama_exposure_energy` (partly_supported).

*Energy expenditure and body temperature variations in llamas living in the High Andes of Peru.* Scientific Reports 9:4037. [DOI](https://doi.org/10.1038/s41598-019-40576-9). [PDF](https://www.nature.com/articles/s41598-019-40576-9.pdf).

Access/read: PDF text, especially Methods, Table 2 and the movement discussion; screenshot retrieval failed, so no new visual figure verification is claimed.

Seven non-pregnant females were followed at 4,400 m. June and September had similarly cold average minima but substantially different field metabolic rates; movement also varied and was associated with energy expenditure. A minimum-temperature-only maintenance penalty would miss this. The study is not a pack-load experiment, neonatal survival study or measured llama thermal-neutral-zone threshold. Its discussion borrows a guanaco threshold as a hypothesis, not a measured llama constant.

### C2. Valenzuela et al. (2021): neonatal protection

Registry: `claim.research.cria_protection` (existing partly supported claim).

*Impact of cria protection strategy on post-natal survival and growth of alpacas.* Veterinary and Animal Science 11:100162. [DOI](https://doi.org/10.1016/j.vas.2020.100162). [Open article](https://pmc.ncbi.nlm.nih.gov/articles/PMC7807147/).

Access/read: previously reviewed open study; selected Methods and Results rechecked through an article-text mirror when PMC returned a browser challenge.

The randomized trial allocated 150 crias to open corral, body vest or semi-open shed. Twelve-week survival was 64%, 100% and 76%, respectively; vest-treated crias also grew faster. Shed versus corral survival was not significantly different. The intervention bundles thermal and physical protection and does not isolate a single frost effect. Nor does one successful modern vest establish historical equipment or universal prevention of mortality.

### C3. Buttolph & Coppock (2004): access can matter without extra grass

**Pasture access and forage production were distinct outcomes in the grazing study.**

Registry: `claim.research.pasture_access_recruitment` (partly_supported).

*Influence of deferred grazing on vegetation dynamics and livestock productivity in an Andean pastoral system.* Journal of Applied Ecology 41:664–674. [DOI/full text](https://doi.org/10.1111/j.0021-8901.2004.00921.x).

Access/read: open publisher text; Methods, Results, Table 2 and Discussion.

Vegetation was assessed at ten locations; livestock outcomes relied on interviews with 32 herd owners. Deferred grazing did not increase measured standing crop or above-ground production, yet access to reserves was associated with lower alpaca cria mortality. Llamas, often excluded from those reserves, had adverse reproductive associations. Regular freeze–thaw limitation is the authors' interpretation, not a randomized frost manipulation. Also, Table 2 reports llama morbidity at p = 0.0802 despite prose calling it significant. Do not convert either association into a universal causal coefficient.

### C4. Norambuena et al. (2013): an experimental nutritional pathway

**The llama nutritional-restriction experiment remains an abstract-only lead here.**

Registry: `claim.research.llama_nutrition_lead` (unverified).

*Effects of nutritional restriction on metabolic, endocrine, and ovarian function in llamas.* Animal Reproduction Science 138:252–260. [DOI](https://doi.org/10.1016/j.anireprosci.2013.01.019). [PubMed](https://pubmed.ncbi.nlm.nih.gov/23562451/).

Access/read: abstract only; complete paper not obtained.

Sixteen mature females were allocated to control or energy-restricted feeding. Restricted animals showed changes in follicular/corpus-luteum development and progesterone/leptin, while GnRH-induced ovulation rate did not differ. This is a causal nutritional experiment, but it does not quantify a frost-driven reduction in pregnancies, births or milk output. Full methods would help distinguish duration, energy deficit and body-condition effects.

### C5. Norambuena et al. (2018): a useful negative result

**Pre-breeding nutritional measurements did not distinguish later pregnancy in the studied alpacas.**

Registry: `claim.research.alpaca_nutrition_null` (partly_supported).

*Relationship between the nutritional state before the breeding period and reproductive success in alpacas ... from the Chilean Puna.* [DOI/full text](https://doi.org/10.4067/S0719-81322018000100110).

Access/read: open SciELO HTML; Abstract, Methods and Results/Discussion.

Among 35 non-pregnant, non-lactating females, pre-breeding body condition and measured metabolic markers did not distinguish later pregnant and non-pregnant groups. A single body-condition observation is not a guaranteed fertility predictor. This does not negate the nutritional-restriction experiment in llamas: species, exposure, measurement timing and outcomes differ.

### C6. Arias et al. (2016): disease, exposure and confounding

**The cold-exposure cytokine study remains an abstract-only lead here.**

Registry: `claim.research.camelid_cold_disease_lead` (unverified).

*Cytokines expression in alpacas and llamas exposed to cold stress.* Small Ruminant Research 141:135–140. [DOI](https://doi.org/10.1016/j.smallrumres.2016.07.016). [Institutional record](https://repositorio.upch.edu.pe/entities/publication/d488d45b-6ddc-42e0-97eb-2f0715382877).

Access/read: institutional abstract and publisher search-visible Methods excerpt; complete article not obtained.

The comparison involves cold, high-altitude animals and milder sea-level animals, with lung pathology and an in-vitro pathogen challenge. Altitude, environment and infection are not experimentally separated into a clean frost effect. It motivates an exposure–infection hypothesis, not a cytokine-to-productivity multiplier.

## 3. Minimal experiments worth specifying next

These are proposed designs, not completed or committed preregistrations.

### A. Crop water and edible energy

Question: under identical seasonal rainfall totals, can rainfall timing, initial soil moisture and root-zone storage change the ranking of feasible planting/irrigation plans?

Start with one cultivar at one representative site. Use daily weather, soil-water observations and crop-stage dates. Contrast evenly distributed rainfall with establishment or reproductive-stage dry spells, keeping total rainfall fixed. These rearranged sequences are synthetic mechanism tests, not reconstructed historical weather; assess performance separately on intact observed seasons. Compare feasible rainfed and stage-targeted irrigation plans under the same water and labour budgets. A full-water reference is diagnostic if it exceeds those budgets. Use held-out seasons; a published parameter fit is not independent validation.

Track root-zone water, actual evapotranspiration, edible dry yield, seed retention and processing losses separately. Report both harvest energy and energy reaching people.

A simple water account is:
S(next) = S + rain + net irrigation + capillary rise - actual ET - runoff - drainage.
Use consistent water-depth units and bound storage. If roots deepen, account for newly accessed soil layers rather than creating water.

For edible-water productivity:
kcal per m3 = edible yield (kg/ha) × food energy (kcal/kg) / [10 × actual ET (mm)].
One mm over one hectare is ten cubic metres. Irrigation withdrawals are a different denominator. Fresh potato mass, dry matter, processed chuño and leaf-level carbon uptake cannot be substituted for one another.

### B. Camelid recruitment under exposure and feed constraints

Question: is the major loss immediate adult mortality, slower growth, or fewer surviving recruits?

Keep alpacas and llamas separate, and distinguish breeding adults from crias. Cross feed adequacy with exposure conditions; distinguish dry radiative frost from wet/windy exposure. Compare protection designs only where their effectiveness and historical feasibility are supported. Model duration and season of exposure, not merely one nightly minimum.

Use digestible/metabolizable feed energy for animal budgets, not the human edible-energy ledger. Track body condition, survival and recruits before adding fibre, milk or pack work. Milk consumed by crias is an internal herd transfer, not automatically food supplied to humans. Do not obtain a pack-load coefficient from free-ranging unloaded females.

### C. Couple the models only after A and B work

Test whether an explicit water/land allocation between crops and pasture changes the immediate food versus future-herd trade-off. Shared constraints need evidence; do not assume all fields and bofedales draw from the same interchangeable water source.

Measure immediate household food, future productive animals and unequal access to pasture. Allow the herd-buffer hypothesis to fail. Test shared weather-driven crop and pasture losses before assuming diversification provides insurance.

Experiment 2 is already complete on the reviewed main: see the [wage-budget results](../research/results/2026-11-19-wage-food-breakeven.md). The ecological proposals here do not revise its results or its pre-registration. Its uncalibrated farm-output opportunity cost is one possible connection to a future crop model, after geography, household scale and season are made comparable.

## 4. Why displayed calories can appear capped at 1,700

Checked against [settle() and harvest() at the reviewed commit](https://github.com/Azuromalachite/frost-and-silver-game/blob/5c3b7eeacecbdd2e12d9e99b8c5ec07cbfce5e6d/frost-and-silver.html).

The target GOAL is 1700; the displayed intake ceiling is 1900.

- Below target, stores supplement the harvest only up to 1700.
- Above target, chuño processing takes surplus first.
- Only the remaining surplus increases intake, by at most 200.
- The welfare food component saturates at the target.
- Main food labels use intake; the separate household estimate uses a different pre-cap quantity.

Illustrative input, expressed in the game's kcal/person/day equivalents: a harvest of 2000 with capacity to preserve 300 yields intake 1700 and a store addition of 300. Preserving 150 instead yields intake 1850. These examples are settlement calculations, not complete playthroughs.

A crop-water experiment could increase production while this allocation rule hides the change in headline calories. Preserve separate production, storage, intake and waste outputs. The 1700 target and 1900 cap are teaching assumptions, not empirical evidence for historical consumption limits.

## 5. Historical ENSO knowledge: practical forecasting versus a modern mechanism

### H1. Orlove, Chiang & Cane (2000)

**Late-sixteenth-century Pleiades forecasts are documented; pre-conquest Inca forecasting remains unestablished.**

Registry: `claim.research.historical_weather_knowledge` (partly_supported).

*Forecasting Andean rainfall and crop yield from the influence of El Niño on Pleiades visibility.* Nature 403:68–71. [DOI](https://doi.org/10.1038/47456). [Author-hosted PDF](https://ocp.ldeo.columbia.edu/res/div/ocp/pub/cane/OrloveEtAl2000.pdf).

Access/read: PDF text, especially opening historical discussion and Table 1.

The paper connects Pleiades observations, seasonal rainfall expectations and planting decisions. It documents late-sixteenth-century forecasts, while explicitly leaving pre-conquest Inca weather forecasting unestablished. Practical use of an ENSO-related indicator is different from recognizing a Pacific-wide oscillation, a fixed recurrence interval or modern causal dynamics.

### H2. Garcia-Herrera et al. (2008)

**Historical weather descriptions and modern ENSO classifications are different kinds of knowledge.**

Registry: `claim.research.documentary_enso_limit` (unverified).

*A Chronology of El Niño Events from Primary Documentary Sources in Northern Peru.* Journal of Climate 21:1948–1962. [Article](https://journals.ametsoc.org/view/journals/clim/21/9/2007jcli1830.1.xml). [Archived data](https://www.ncei.noaa.gov/access/metadata/landing-page/bin/iso?id=noaa-historical-6210).

Access/read: abstract and archive description. The 1550–1900 reconstruction uses rainfall/flooding and fishery descriptions, but it is modern classification of historical observations. It does not by itself show that observers understood ENSO recurrence or linked coastal flooding with highland drought.

For a historical model, give players imperfect local signs and feasible responses. Avoid a modern ENSO index or a guaranteed cycle unless explicitly presented as an analytical overlay. Existing game forecast probabilities are play assumptions, not historical forecast skill.

## 6. Access barriers and evidence barriers

| Priority | Work | Remaining barrier | Useful next route |
|---|---|---|---|
| High | Geerts et al. 2008, Introducing deficit irrigation | Institutional abstracts accessible; full methods/tables not obtained; publisher route previously returned 403 | Institutional subscription, author copy or document delivery |
| High | Vacher 1998, quinoa and bitter potato | IRD requests PDF access; publisher returned 403 | Author/institutional request or subscription |
| Medium | Norambuena et al. 2013, llama nutritional restriction | Abstract read; complete article not obtained | Institutional subscription or author copy |
| Medium | Arias et al. 2016, cytokines and cold | Repository provides metadata/abstract; publisher returned 403 | Institutional subscription or author copy |
| Resolved for selected text | Garcia 2003/2004; Geerts 2008 southern quinoa and 2009 AquaCrop | Article text accessible through mirrors; original table/figure and data checks remain | Obtain original PDFs and underlying datasets before numerical replication |
| Resolved for selected text | Alvarez-Flores 2018 | Public author-uploaded text found despite IRD request barrier | Original PDF/supplement for figure verification |
| Open, evidence issue | Superchola 2026 | Full text accessible; yield claim and definitions need clarification | Check corrections/version history or seek author clarification |
| Still a quantitative gap | Camelid fibre, milk and loaded transport under cold | No validated frost-to-output function established in this bounded review | Targeted primary production and pack-work experiments |

These describe this review's access, not a declaration that no public copy exists anywhere. A browser challenge is not necessarily a subscription paywall. No paid access, author contact or redistribution of papers was undertaken.

## Recommended sequence

1. Extract the original quinoa soil-water/phenology data and obtain the stage-specific 2008 paper.
2. Resolve bitter-potato physiology before borrowing a commercial potato response.
3. Build and preregister the one-crop daily water experiment.
4. Specify a separate recruitment model; leave fibre, milk and pack-work effects uncalibrated.
5. Couple crops, pasture and unequal access only when their shared constraints are explicit.
6. Keep production, storage and intake distinct so teaching thresholds do not predetermine ecological results.

## Biological scope still missing

An adult animal is a productive stock rather than an annual harvest. A future herd model must track births, surviving recruits, maturation, breeding adults, sales/slaughter and deaths over explicit elapsed time. The teaching game's sampled years cannot silently use one annual herd transition across decades. Alpaca and llama traits, and dry frost versus wet/windy exposure, need separate evidence. Fibre, milk, manure and transport remain distinct outputs; no cold-to-output coefficient for these services is calibrated here.
