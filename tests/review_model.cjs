// Model check: runs the game's own script headless under Node and asserts the
// numbers the repository records. CI runs it on every pull request.
//
//   node tests/review_model.cjs [game.html]   check, then print a summary
//   node tests/review_model.cjs --self-test   plant model changes; each must fail
//
// Asserted (each is recorded elsewhere, and a change that moves it must update
// both places in the same pull request):
//   - the pinned run (CONTRIBUTING.md, AGENTS.md): seed 12345, default plan, "Best land first" at each re-plan;
//   - an identical replay reproduces every harvest;
//   - changing a choice keeps the weather and changes the result;
//   - the welfare index equals the sum of its parts;
//   - each weather preset's benchmark (WX_PRESETS, shown on the end screen) is what the default plan does on its seed;
//   - the GDP grading split over seeds 1-80 (claim.game.grading_weather).
//
// DOM stubs and disabled timers: this checks the model, not the page. It drives
// harvests the way the buttons do but skips the report screens, so it cannot
// see rendering, playback or milestone pop-ups.
// First written for the 2026-11-18 research review (docs/research-review-2026-11-18.md).
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

const PINNED = [1764, 1411, 80, 55, 103, 109, 46, 73]; // food Inca, colonial; welfare; GDP index; % short
const GRADES_1_80 = {stay: 75, rise: 5};
// When crews fall the game asks the player to re-plan; this check always chooses "Best land first".
const REPLAN = 'best';

function load(html) {
  const m = html.match(/<script>\s*([\s\S]*?)<\/script>/);
  assert.ok(m, 'no inline <script> in the game file');
  const code = m[1].replace(/\}\)\(\);\s*$/, `globalThis.game={get state(){return S}, fresh,rollYear,clampAlloc,harvest,nextYear,showTransition,showEnd,replaySame,settle,grow,crews,ZONES,shortShare,gi,dir,reportText,PLAY,replanTo,GDP_TOL,WX_PRESETS};})();`);
  assert.notEqual(code, m[1], 'the game script no longer ends in })(); so the harness cannot reach the model');
  return code;
}

const nodes = new Map();
function node(id) {
  if (nodes.has(id)) return nodes.get(id);
  const handlers = {};
  const n = {id, style:{}, dataset:{}, hidden:false, disabled:false, innerHTML:'', textContent:'', value:'',
    classList:{add(){}, remove(){}, toggle(){}},
    addEventListener(e, f){(handlers[e] ||= []).push(f)}, setAttribute(){},
    insertAdjacentHTML(){}, scrollIntoView(){}, focus(){},
    getBoundingClientRect(){return {width:1000, height:550, top:0, bottom:550}},
    getContext(){return new Proxy({}, {get:()=>()=>{}})},
    querySelectorAll(){return []}, querySelector(){return node('nested')},
    click(){for (const f of handlers.click || []) f({target:n}); if (n.onclick) n.onclick()},
  };
  nodes.set(id, n); return n;
}
function make(code, seed) {
  nodes.clear();
  const context = {console, URLSearchParams, location:{search:'?seed=' + seed}, Math,
    performance:{now:()=>0}, requestAnimationFrame(){},
    setTimeout(){return 1}, clearTimeout(){}, setInterval(){return 1}, clearInterval(){},
    matchMedia:()=>({matches:true, addEventListener(){}}),
    ResizeObserver:class{observe(){}}, MutationObserver:class{observe(){}},
    getComputedStyle:()=>({position:'relative', getPropertyValue:()=>'#000000'}),
    devicePixelRatio:1, innerHeight:800,
    window:{scrollTo(){}, addEventListener(){}},
    navigator:{clipboard:{writeText:async()=>{}}},
    document:{getElementById:node, documentElement:{}, addEventListener(){}, querySelectorAll(){return []}, querySelector(){return {value:'stay'}}}
  };
  vm.createContext(context); vm.runInContext(code, context, {timeout:3000}); return context.game;
}
function finish(g, replay = false, edit) {
  if (replay) g.replaySame(); else { g.state.phase = 'plan'; g.state.yr = g.rollYear(); g.clampAlloc(); }
  while (g.state.hist.length < 6) {
    if (edit) edit(g);
    g.harvest();
    if (g.state.year === 3) { g.showTransition(); node('go').click(); }
    else if (g.state.year < 6) g.nextYear();
    if (g.state.replan && !g.state.replan.kind) g.replanTo(REPLAN);
  }
  g.showEnd();
  const h = g.state.hist, a = h.slice(0, 3), b = h.slice(3);
  const avg = (x, k) => x.reduce((s, r) => s + r[k], 0) / x.length;
  return {food:[avg(a,'intake'), avg(b,'intake')], welfare:[avg(a,'cwi'), avg(b,'cwi')],
    gdp:[g.gi(avg(a,'gdp')), g.gi(avg(b,'gdp'))],
    short:[...[a, b].map(x => x.reduce((s, r) => s + g.shortShare(r.avail), 0) / x.length * 100)],
    weather:h.map(r => ({line:r.line, drought:r.drought, hazy:r.hazy, winter:r.winter})),
    deaths:h.reduce((s, r) => s + Math.max(0, r.popBefore - r.pop), 0),
    history:JSON.parse(JSON.stringify(h))};
}

function check(html) {
  const code = load(html);
  const g = make(code, 12345), first = finish(g), replay = finish(g, true);
  assert.deepEqual(replay.history, first.history, 'an identical replay must reproduce every harvest');
  const pinned = [...first.food, ...first.welfare, ...first.gdp, ...first.short].map(Math.round);
  assert.deepEqual(pinned, PINNED, 'pinned run (seed 12345, default plan) moved: update CONTRIBUTING.md, AGENTS.md and PINNED together');
  const edited = finish(g, true, x => { if (x.state.year === 1) { x.state.alloc.suni -= 1; x.state.chuno += 1; } });
  assert.deepEqual(edited.weather, first.weather, 'changing a choice must not change the weather');
  assert.notDeepEqual(edited.history, first.history, 'changing a choice must change the result');
  // The weather presets' benchmarks, shown on the end screen, must be what the default plan does on that seed.
  const presets = JSON.parse(JSON.stringify(g.WX_PRESETS));
  for (const [key, p] of Object.entries(presets)) {
    const t = finish(make(code, p.seed)), r1 = v => Math.round(v * 10) / 10;
    assert.deepEqual({k2: r1(t.food[1]), deaths: r1(t.deaths)}, p.def, `weather preset ${key} (seed ${p.seed}) benchmark moved: re-run the screen and update WX_PRESETS and docs/hard-mode-2026-11-18.md together`);
  }
  for (const r of first.history) assert.ok(Math.abs(r.cwi - r.cwiParts.cal - r.cwiParts.buf - r.cwiParts.res) < 1e-8, 'welfare index must equal the sum of its parts');

  const runs = [];
  for (let seed = 1; seed <= 80; seed++) runs.push(finish(make(code, seed)));
  const grades = runs.map((t, i) => { const a = t.history.slice(3);
    const cg = a.reduce((s, r) => s + r.gdp - r.cf.gdp, 0) / 3, ck = a.reduce((s, r) => s + r.intake - r.cf.intake, 0) / 3;
    return {seed:i + 1, cg_index:cg / 416 * 100, g:g.dir(0, cg, g.GDP_TOL), ck, k:g.dir(0, ck, 50)}; });
  const counts = {}; for (const x of grades) counts[x.g] = (counts[x.g] || 0) + 1;
  assert.deepEqual(counts, GRADES_1_80, 'GDP grading split over seeds 1-80 moved: update claim.game.grading_weather, the end-screen sentence and GRADES_1_80 together');
  const mean = k => [0, 1].map(i => runs.reduce((s, t) => s + t[k][i], 0) / runs.length);
  return {pinned, presets, gdp_grades_1_80:counts,
    rise_seeds:grades.filter(x => x.g === 'rise').map(x => x.seed),
    means_1_80:{food:mean('food'), welfare:mean('welfare'), gdp:mean('gdp')},
    food_effect_grades_1_80:grades.reduce((o, x) => (o[x.k] = (o[x.k] || 0) + 1, o), {})};
}

// The pinned line is quoted in CONTRIBUTING.md and AGENTS.md; it must match PINNED, or the docs describe another game.
const fmtK = n => n.toLocaleString('en-US');
// as the end screen shows it: food to the nearest 10 kcal, household shares to the nearest 5%
const r10 = v => Math.round(v / 10) * 10, r5 = v => Math.round(v / 5) * 5;
const pinnedLine = p => `${fmtK(r10(p[0]))} kcal | ${fmtK(r10(p[1]))} kcal | ${p[2]} → ${p[3]} | ${p[4]} | ${p[5]} | ${r5(p[6])}% → ${r5(p[7])}%`;
function checkDocs(pinned, texts) {
  for (const [name, text] of Object.entries(texts))
    assert.ok(text.includes('`' + pinnedLine(pinned) + '`'), `${name} does not quote the pinned run ${pinnedLine(pinned)}`);
}
const docTexts = () => Object.fromEntries(['CONTRIBUTING.md', 'AGENTS.md'].map(f => [f, fs.readFileSync(path.join(__dirname, '..', f), 'utf8')]));

// Each planted change must make check() fail, and fail on the assertion named.
const PLANTS = [
  ['tribute raised (a model constant)', 'TRIB_PP = 500', 'TRIB_PP = 520', /pinned run/],
  // Frost almost never reaches the fields. (A first version moved .15 to .25,
  // which seed 12345 happens never to draw, so it tested nothing.)
  ['frost odds changed (the weather)', 'const line = r < .15 ? 4', 'const line = r < .95 ? 4', /pinned run/],
  ['winter roll removed', "winter = w < .25 ? 'hard' : w < .75 ? 'normal' : 'mild'", "winter = 'normal'", /pinned run/],
  // the grade's tolerance moves only the grading split, so this plant tests that assertion, not the pinned run
  ['GDP tolerance changed', 'const GDP_TOL = 12.5;', 'const GDP_TOL = 2.5;', /grading split/],
  // a preset pointing at another seed must fail on its benchmark, not slip through to the end screen
  ['Hard preset seed changed', 'hard:     {seed: 313,', 'hard:     {seed: 314,', /weather preset hard/],
];
function selfTest(html) {
  check(html); // the unplanted game must pass first, or a failure below proves nothing
  for (const [name, from, to, expect] of PLANTS) {
    assert.ok(html.includes(from), `self-test plant drifted: ${JSON.stringify(from)} not in the game`);
    let err = null;
    try { check(html.replace(from, to)); } catch (e) { err = e; }
    assert.ok(err, `self-test: the check passed a planted change (${name})`);
    assert.match(String(err.message), expect, `self-test: ${name} failed for another reason: ${err.message}`);
    console.log(`caught: ${name}`);
  }
  let docErr = null;
  // +10 kcal: the docs quote food to the nearest 10, so a 1-kcal plant would round away and test nothing
  try { checkDocs(PINNED.map((v, i) => i === 1 ? v + 10 : v), docTexts()); } catch (e) { docErr = e; }
  assert.ok(docErr && /does not quote the pinned run/.test(docErr.message), 'self-test: a pinned line that differs from the docs was not caught');
  console.log('caught: docs quoting a different pinned run');
  console.log(`confirmed: all ${PLANTS.length} planted model changes and the docs mismatch are rejected`);
}

// Research diagnostics reuse this loader; importing must not execute a second sweep.
module.exports = {load, make, check};
if (require.main === module) {
  const args = process.argv.slice(2);
  const file = args.find(a => !a.startsWith('--')) || path.join(__dirname, '..', 'frost-and-silver.html');
  const html = fs.readFileSync(file, 'utf8');
  if (args.includes('--self-test')) selfTest(html);
  else { checkDocs(PINNED, docTexts()); console.log(JSON.stringify({commit:process.env.GITHUB_SHA || 'local', ...check(html)}, null, 2)); }
}
