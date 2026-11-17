// Reproduce the 18 November research review from the embedded game script.
// Run from any directory: node tests/review_model.cjs [optional-game-html]
// DOM stubs and disabled timers: this is a model check, not a browser/UI test.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(process.argv[2] || path.join(__dirname, '..', 'frost-and-silver.html'), 'utf8');
let code = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
code = code.replace(/\}\)\(\);\s*$/, `globalThis.game={get state(){return S}, fresh,rollYear,clampAlloc,harvest,nextYear,showTransition,showEnd,replaySame,settle,shortShare,gi,dir,reportText,PLAY};})();`);
const nodes = new Map();
function node(id) {
  if (nodes.has(id)) return nodes.get(id);
  const handlers = {};
  const n = {id, style:{}, dataset:{}, hidden:false, disabled:false, innerHTML:'',textContent:'',value:'',
    classList:{add(){},remove(){},toggle(){}},
    addEventListener(e, f){(handlers[e] ||= []).push(f)},setAttribute(){},
    insertAdjacentHTML(){},scrollIntoView(){},focus(){},
    getBoundingClientRect(){return {width:1000,height:550,top:0,bottom:550}},
    getContext(){return new Proxy({}, {get:()=>()=>{}})},
    querySelectorAll(){return []},querySelector(){return node('nested')},
    click(){for(const f of handlers.click||[])f({target:n});if(n.onclick)n.onclick()},
  };
  nodes.set(id,n);return n;
}
function make(seed){
  nodes.clear();
  const context = {console, URLSearchParams, location:{search:'?seed='+seed}, Math,
    performance:{now:()=>0}, requestAnimationFrame(){},
    setTimeout(){return 1},clearTimeout(){},setInterval(){return 1},clearInterval(){},
    matchMedia:()=>({matches:true,addEventListener(){}}),
    ResizeObserver:class{observe(){}},MutationObserver:class{observe(){}},
    getComputedStyle:()=>({position:'relative',getPropertyValue:()=> '#000000'}),
    devicePixelRatio:1,innerHeight:800,
    window:{scrollTo(){},addEventListener(){}},
    navigator:{clipboard:{writeText:async()=>{}}},
    document:{getElementById:node,documentElement:{},addEventListener(){},querySelectorAll(){return []},querySelector(){return {value:'stay'}}}
  };
  vm.createContext(context);vm.runInContext(code,context,{timeout:3000});return context.game;
}
function finish(g, replay=false, edit){
  if(replay)g.replaySame();else{g.state.phase='plan';g.state.yr=g.rollYear();g.clampAlloc();}
  while(g.state.hist.length<6){
    if(edit)edit(g);
    g.harvest();
    if(g.state.year===3){g.showTransition();node('go').click();}
    else if(g.state.year<6)g.nextYear();
  }
  g.showEnd();
  const h=g.state.hist,a=h.slice(0,3),b=h.slice(3);
  const avg=(x,k)=>x.reduce((s,r)=>s+r[k],0)/x.length;
  return {food:[avg(a,'intake'),avg(b,'intake')],welfare:[avg(a,'cwi'),avg(b,'cwi')],
    gdp:[g.gi(avg(a,'gdp')),g.gi(avg(b,'gdp'))],
    short:[... [a,b].map(x=>x.reduce((s,r)=>s+g.shortShare(r.avail),0)/x.length*100)],
    weather:h.map(r=>({line:r.line,drought:r.drought,hazy:r.hazy})),history:JSON.parse(JSON.stringify(h)),html:node('p-end').innerHTML};
}
const g=make(12345), first=finish(g), replay=finish(g,true);
assert.deepEqual(replay.history,first.history,'Identical replay should reproduce all harvests');
const metrics=[...first.food,...first.welfare,...first.gdp,...first.short].map(Math.round);
assert.deepEqual(metrics,[1740,1401,80,54,103,108,47,71],'Documented pinned run');
const edited=finish(g,true,x=>{if(x.state.year===1){x.state.alloc.suni-=1;x.state.chuno+=1;}});
assert.deepEqual(edited.weather,first.weather,'Changing choices must preserve weather');
assert.notDeepEqual(edited.history,first.history,'Changing choices must affect results');
const snap=JSON.parse(JSON.stringify(first.history));
for(const r of snap)assert.ok(Math.abs(r.cwi-r.cwiParts.cal-r.cwiParts.buf-r.cwiParts.res)<1e-8);
const tallies=[];
for(let seed=1;seed<=80;seed++){
 const z=finish(make(seed));tallies.push(z);
}
const mean=(key)=>[0,1].map(i=>tallies.reduce((s,t)=>s+t[key][i],0)/tallies.length);
const gradeGame=make(12345);
const grades=tallies.map((t,i)=>{const a=t.history.slice(3);const cg=a.reduce((s,r)=>s+r.gdp-r.cf.gdp,0)/3;const ck=a.reduce((s,r)=>s+r.intake-r.cf.intake,0)/3;return {seed:i+1,cg_index:cg/416*100,g:gradeGame.dir(0,cg,12.5),ck,k:gradeGame.dir(0,ck,50)};});
const counts={};for(const x of grades)counts[x.g]=(counts[x.g]||0)+1;
console.log(JSON.stringify({reviewed_commit:'d0d94741367d185cb0b4da66157289dcff1f358a',
  sample:{seeds:'1..80',plan:'default',weight:'equal'},pinned:metrics,replay_identical:true,edited_replay_weather_identical:true,
  changed_choice_changes_result:true,baseline_80_seeds:{food:mean('food'),welfare:mean('welfare'),gdp:mean('gdp')},
  gdp_prediction_grades:counts,grade_examples:Object.keys(counts).map(k=>grades.find(x=>x.g===k)),
  cg_index_range:[Math.min(...grades.map(x=>x.cg_index)),Math.max(...grades.map(x=>x.cg_index))]},null,2));
