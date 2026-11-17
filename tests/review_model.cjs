// Model check: runs the game's own script headless under Node and asserts the
// numbers the repository records. CI runs it on every pull request.
//
//   node tests/review_model.cjs [game.html]   check, then print a summary
//   node tests/review_model.cjs --self-test   plant model changes; each must fail
//
// Asserted (each is recorded elsewhere, and a change that moves it must update
// both places in the same pull request):
//   - the pinned run (CONTRIBUTING.md, AGENTS.md): seed 12345, default plan;
//   - an identical replay reproduces every harvest;
//   - changing a choice keeps the weather and changes the result;
//   - the welfare index equals the sum of its parts;
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

const PINNED = [1764, 1371, 80, 53, 103, 108, 46, 73]; // food Inca, colonial; welfare; GDP index; % short
const GRADES_1_80 = {stay: 74, rise: 6};

function load(html) {
  const m = html.match(/<script>\s*([\s\S]*?)<\/script>/);
  assert.ok(m, 'no inline <script> in the game file');
  const code = m[1].replace(/\}\)\(\);\s*$/, `globalThis.game={get state(){return S}, fresh,rollYear,clampAlloc,harvest,nextYear,showTransition,showEnd,replaySame,settle,shortShare,gi,dir,reportText,PLAY};})();`);
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
  }
  g.showEnd();
  const h = g.state.hist, a = h.slice(0, 3), b = h.slice(3);
  const avg = (x, k) => x.reduce((s, r) => s + r[k], 0) / x.length;
  return {food:[avg(a,'intake'), avg(b,'intake')], welfare:[avg(a,'cwi'), avg(b,'cwi')],
    gdp:[g.gi(avg(a,'gdp')), g.gi(avg(b,'gdp'))],
    short:[...[a, b].map(x => x.reduce((s, r) => s + g.shortShare(r.avail), 0) / x.length * 100)],
    weather:h.map(r => ({line:r.line, drought:r.drought, hazy:r.hazy, winter:r.winter})),
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
  for (const r of first.history) assert.ok(Math.abs(r.cwi - r.cwiParts.cal - r.cwiParts.buf - r.cwiParts.res) < 1e-8, 'welfare index must equal the sum of its parts');

  const runs = [];
  for (let seed = 1; seed <= 80; seed++) runs.push(finish(make(code, seed)));
  const grades = runs.map((t, i) => { const a = t.history.slice(3);
    const cg = a.reduce((s, r) => s + r.gdp - r.cf.gdp, 0) / 3, ck = a.reduce((s, r) => s + r.intake - r.cf.intake, 0) / 3;
    return {seed:i + 1, cg_index:cg / 416 * 100, g:g.dir(0, cg, 12.5), ck, k:g.dir(0, ck, 50)}; });
  const counts = {}; for (const x of grades) counts[x.g] = (counts[x.g] || 0) + 1;
  assert.deepEqual(counts, GRADES_1_80, 'GDP grading split over seeds 1-80 moved: update claim.game.grading_weather, the end-screen sentence and GRADES_1_80 together');
  const mean = k => [0, 1].map(i => runs.reduce((s, t) => s + t[k][i], 0) / runs.length);
  return {pinned, gdp_grades_1_80:counts,
    rise_seeds:grades.filter(x => x.g === 'rise').map(x => x.seed),
    means_1_80:{food:mean('food'), welfare:mean('welfare'), gdp:mean('gdp')},
    food_effect_grades_1_80:grades.reduce((o, x) => (o[x.k] = (o[x.k] || 0) + 1, o), {})};
}

// Each planted change must make check() fail, and fail on the assertion named.
const PLANTS = [
  ['tribute raised (a model constant)', 'TRIB_PP = 500', 'TRIB_PP = 520', /pinned run/],
  ['frost odds changed (the weather)', 'const line = r < .15 ? 4', 'const line = r < .25 ? 4', /pinned run/],
  ['winter roll removed', "winter = w < .25 ? 'hard' : w < .75 ? 'normal' : 'mild'", "winter = 'normal'", /pinned run/],
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
  console.log(`confirmed: all ${PLANTS.length} planted model changes are rejected`);
}

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--')) || path.join(__dirname, '..', 'frost-and-silver.html');
const html = fs.readFileSync(file, 'utf8');
if (args.includes('--self-test')) selfTest(html);
else console.log(JSON.stringify({commit:process.env.GITHUB_SHA || 'local', ...check(html)}, null, 2));
