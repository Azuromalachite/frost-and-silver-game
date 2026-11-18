# Weather debrief proposal

18 November 2026. Design proposal based on the
[climate review](climate-weather-literature-2026-11-18.md), checked against main
`8e443c5` through PR #29. This document proposes behaviour; it does not implement
a new screen, weather generator, assessment rule or historical parameter.

## Teaching question

How did weather, decisions and economic obligations contribute to the outcome?
Do not pre-write the answer as weather mattered little, or weather caused the
food shortfall. Weather can strongly affect survival while the institutional
comparison retains the same direction. Both claims require measuring the run.

The scientific readings support seasonal and spatial variation and ways of
managing it. Whether a particular institutional rule amplifies a particular
shock in this game remains a model question. It is not a historical causal
estimate from those readings.

## What already exists

The game provides Random, Standard, Hard and Extreme seeds, same-weather
survival yardsticks and replay links. The end screen now leads with a strategy
chosen in advance, scored under the player's weather, and separately labels the
restricted hindsight search. The re-plan box preserves hand-added wage crews,
projects hand-set plans and identifies its averages as sample weathers rather
than the player's weather. These changes through PR #29 are already implemented.

Resilience now scores protected fields only; no occupied-zone bonus remains.
The deliberate per-person food-store carryover across the historical gap is
labelled and retained. The existing matched Inca-rules comparison starts from
each factual harvest's state.

The proposed addition is replaying a defined strategy over other weather, with
clearer separation of weather effects, decision quality and institutional rules.
The hand-set re-plan projection is not a replay of an inferred player policy
across complete alternative histories.

The [weather-preset study](hard-mode-2026-11-18.md) remains the record of how those
selected seeds were chosen. Three selected presets are not an empirical climate
distribution or a representative uncertainty interval.

## Three comparisons

| Comparison | Hold fixed | Vary | Interpretation |
|---|---|---|---|
| Same strategy, different weather | Initial state, institutional rules and decision policy | Regional weather sequence | Dependence of the strategy's model outcomes on weather |
| Different strategies, same weather | Initial state, institutional rules and regional weather | Decision policy | Scope for choices to protect the community; restricted hindsight search stays labelled |
| Different rules, same weather | Regional weather, common policy convention and specified starting state | Institutional rule set | Conditional effect of those model rules; not an observed historical treatment effect |

Keep the policy-versus-weather comparison separate from the within-run harvest
counterfactual. If a weather replay changes deaths, its later population and stores
can change too: that is a trajectory effect of weather under the policy. Holding
population and inventories fixed instead isolates a narrower conditional effect.
State which experiment is shown, rather than mixing the interpretations.

## Define strategy before replaying it

An exact list of crew numbers may become infeasible when a replay loses more
people. A strategy must specify a decision rule for crew reductions, construction,
processing and optional wage labour. It must also specify which forecasts and
past outcomes may inform decisions.

Extend the existing advance-selected policy across alternative weather, with its
re-plan rule disclosed. Add other named, reproducible policies only as needed.
If the player's choices cannot be translated reliably into such a rule, show
named-policy results rather than claiming to have cloned the player's strategy.
Do not silently improve a policy after seeing each alternative weather sequence.
A separately optimized result can be shown as hindsight, with its search limits.

## Show several outcome measures

For each selected scenario, show colonial mean food availability, whole-game
hunger deaths, final stores and the same institutional comparison definition.
Use the game's existing units and rounding. Explain that hunger deaths and the
household shortfall estimate are model outputs, not historical observations.

For a larger sensitivity exercise, show a typical outcome, a lower-tail food
outcome and the share of runs crossing a clearly labelled game threshold. State
the seeds, policy, weather assumptions and sample size. A synthetic sweep is a
test of model behaviour, not validation of historical event frequencies.

Keep a player's observed run distinct from simulated alternatives. Do not convert
harsh weather into a lower student grade. Assess explanations and feasible
decisions, rather than an outcome that weather can change.

## Why equal harvest losses can have different consequences

This is an invented accounting example, not a game run or historical estimate.
Suppose a harvest is 100 food units and a weather shock removes 20.

| Food account | Before the shock | After the shock | Reduction |
|---|---:|---:|---:|
| Harvest available without a levy | 100 | 80 | 20 percent |
| Harvest available after a fixed levy of 20 | 80 | 60 | 25 percent |

The absolute loss is 20 in both accounts. A fixed obligation increases the
percentage loss relative to food retained. Reserves and access to other food
determine whether this crosses a subsistence threshold. This example does not
prove a larger absolute weather effect under extraction. The game's tribute cap,
wage relief and output changes would need their own accounting.

Consequently, a zero interaction in absolute food units need not imply equal
vulnerability in percentage terms or threshold outcomes. Likewise, a positive
interaction in hunger deaths does not mean more crops were physically frozen.

## Proposed student prompts

1. How much food was lost to weather, and how much was retained after obligations?
2. How did reserves change what people could eat after the loss?
3. Did the same strategy work across weather, or depend on favourable conditions?
4. Did another feasible strategy improve the result under your actual weather?
5. Did weather change the size of losses, the strategy ranking, or the conclusion
   about the institutional comparison?
6. Which results depend on assumptions rather than evidence about the real Andes?

## Acceptance criteria for a later implementation

- The same weather sequence is used wherever a comparison claims to hold weather fixed.
- A policy uses only information available at each decision, with a stated rule
  for infeasible crew plans and population changes.
- Every alternative is labelled with weather, policy and counterfactual scope.
- Existing pinned runs, seed replay, GDP discussion and food grading remain
  unchanged unless a separate, documented model change deliberately revises them.
- Attribution of food losses reconciles with harvest, tribute/returns, processing,
  storage use and any spoilage, without double-counting.
- Selected presets are not presented as a probability distribution.
- UI checks cover asynchronous cancellation, replay, mobile width and report
  copying if a later PR implements the comparison screen.

## Research that can proceed separately

1. Joint losses across plots and event types, needed to quantify diversification.
2. Historical labour and water costs of protection, upkeep and processing, needed
   before assigning a mita-related loss of response capacity.
3. A geographic setting and production calendar, needed before choosing rates.
4. Commodity-specific storage and access, needed before interpreting reserves as
   universally available food or converting every surplus into chuno.

These are research gates for numerical extensions, not reasons to delay an
evidence note or a transparent sensitivity debrief using the present model.
