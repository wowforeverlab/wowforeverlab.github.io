const BIS = [
  ["머리","세공된 진줏빛 머리장식","rare","재봉 제작","inv_crown_01"],
  ["목","무리 우두머리의 징표","rare","희귀 몹 사자왕 후마르","inv_jewelry_necklace_04"],
  ["어깨","혈법사 어깨보호대","rare","붉은십자군 수도원 묘지","inv_shoulder_05"],
  ["등","가시직조 외투","rare","가시덩굴 우리 · 루구그","inv_misc_cape_11"],
  ["가슴","진줏빛 화장복","rare","재봉 제작","inv_chest_cloth_51"],
  ["손목","거미전차 기름걸레","rare","놈리건","inv_misc_bandage_09"],
  ["손","마을 사무원의 벙어리장갑","rare","퀘스트 · 죄와 벌","inv_gauntlets_27"],
  ["허리","아루갈의 허리띠","rare","그림자송곳니 성채","inv_belt_10"],
  ["다리","진줏빛 다리보호구","rare","재봉 제작","inv_pants_10"],
  ["발","방사능처리 장화","rare","놈리건","inv_boots_05"],
  ["반지","자선가의 반지","rare","도서관 책 보상","inv_jewelry_ring_14"],
  ["반지","라디모어 가보 반지","rare","퀘스트 · 딸의 사랑","inv_jewelry_ring_08"],
  ["장신구","늑대인간의 파멸 부적","unc","그림자송곳니 성채","inv_jewelry_talisman_06"],
  ["장신구","루구그의 절단된 머리카락","unc","가시덩굴 우리","inv_misc_head_quillboar_01"],
  ["무기","네크로칸의 대지팡이","rare","퀘스트 · 칸 젠","inv_staff_08"],
  ["원거리","불타는 은마법봉","rare","퀘스트 · 산사태일족 전사","inv_wand_11"]
];
const S = {
  frostbolt:["spell_frost_frostbolt02","얼음 화살","얼화"],
  icelance:["spell_frost_frostblast","얼음창","얼창"],
  nova:["spell_frost_frostnova","얼음 회오리",""],
  fireball:["spell_fire_flamebolt","화염구",""],
  fireblast:["spell_fire_fireball","화염 작열","화작"],
  scorch:["spell_fire_soulburn","불태우기","불태"],
  pyro:["spell_fire_fireball02","불덩이 작열","불작"],
  ablast:["spell_arcane_blast","비전 작렬",""],
  missiles:["spell_nature_starfall","신비한 화살",""],
  poly:["spell_nature_polymorph","변이",""],
  cs:["spell_frost_iceshock","마법 차단",""],
  wand:["ability_shootwand","사격",""]
};
const MACROS = [
  {n:"마법봉 자동 사격", ic:"wand", d:"사격 앞에 !를 붙이면 여러 번 눌러도 자동 사격이 꺼지지 않습니다. 체력이 얼마 남지 않은 몹을 마무리하거나 마나를 아낄 때 사용합니다.", code:"#showtooltip 사격\n/cast !사격"},
  {n:"변이 마우스오버", ic:"poly", d:"마우스를 올려둔 적에게 바로 변이를 겁니다. 던전에서 대상을 바꾸지 않고도 위험한 시전자를 묶을 수 있습니다.", code:"#showtooltip 변이\n/cast [@mouseover,harm,nodead][] 변이"},
  {n:"시전 끊고 마법 차단", ic:"cs", d:"다른 주문을 시전하는 중이어도 즉시 끊고 마법 차단을 사용합니다.", code:"#showtooltip 마법 차단\n/stopcasting\n/cast 마법 차단"}
];

const SPECS = {
  frost:{
    split:[["비전",0],["화염",0],["냉기",21]],
    talents:["얼음 화살 연마","동상","얼음 파편","산산조각","원소의 정밀함","얼음창","서리의 손가락"],
    why:"냉기는 감속과 빙결로 적을 멀리 묶어두며 싸우는 전문화입니다. 근접 몹이 쉽게 붙지 못하고 생존력이 좋아서, 마법사를 처음 하시는 분께 가장 무난합니다. 다만 순간 화력은 다른 전문화보다 약하고, 냉기 저항이 있는 몹을 상대로는 효율이 떨어집니다.",
    notes:["포에버에서는 산산조각이 3포인트 특성으로 바뀌었고, 한파는 특성 트리 아래쪽으로 내려갔습니다.","눈보라 연마의 감속 효과가 약해져서 클래식처럼 눈보라로 광역 사냥을 하기는 어려워졌습니다."],
    race:"얼라이언스는 스카이본, 호드는 언데드를 추천합니다.",
    seq:["frostbolt","frostbolt","icelance","nova","icelance"],
    core:"기본은 얼음 화살입니다. 서리의 손가락이 발동하면 다음 주문 하나가 얼어 있는 대상에게 쓴 것처럼 처리되므로, 이때 얼음창을 사용합니다. 얼음창은 얼어 있는 대상에게 300% 추가 피해를 줍니다.",
    prio:["서리의 손가락이 발동했다면 얼음창","동상이나 얼음 회오리로 대상이 얼어 있다면 얼음창","그 외에는 얼음 화살","몹이 붙으면 얼음 회오리로 묶고 얼음창"],
    warn:"※ 얼음 화살을 시전하던 중이라면 끝까지 시전한 뒤 얼음창을 이어서 쓰는 것이 좋습니다.",
    aoe:"광역은 냉기 돌풍과 얼음 회오리로 몹을 묶고 얼음창으로 정리합니다. 다섯 마리 이상이라면 냉기 돌풍과 눈보라를 번갈아 사용합니다.",
    stats:"주문력과 치명타를 우선하고, 레벨링 중에는 지능과 정신력으로 마나를 확보합니다. 60레벨 공격대부터는 적중을 가장 먼저 챙겨야 합니다.",
    tips:[
      ["레벨링","마법봉은 5레벨과 13레벨에 바로 바꿔주세요. 경매장에서 저렴하게 구할 수 있고, 낮은 레벨에서는 주문보다 효율이 좋습니다."],
      ["레벨링","체력이 얼마 남지 않은 몹에게는 1랭크 얼음 화살을 써서 마나를 아낄 수 있습니다."],
      ["레벨링","서리 갑옷이나 마법사 갑옷, 신비한 총명함은 항상 유지해 주세요."],
      ["PvE","던전에서 여러 마리를 당길 때는 위험한 시전자를 변이로 먼저 묶어두세요. 위급할 때는 얼음 회오리로 시간을 벌 수 있습니다."],
      ["장비","재봉을 배우면 30레벨 BiS 중 진줏빛 3부위(머리·가슴·다리)를 직접 만들 수 있습니다."],
      ["매크로","마법봉 자동 사격 매크로를 하나 만들어두면 마나가 부족할 때도 딜을 이어갈 수 있습니다."]
    ]
  },
  fire:{
    split:[["비전",0],["화염",21],["냉기",0]],
    talents:["화염구 연마","작열","불타는 영혼","불덩이 작열","열기","불태우기 연마","불꽃의 잔흔","화염 폭풍"],
    why:"화염은 치명타로 화력을 끌어올리는 전문화입니다. 치명타가 터질수록 열기가 쌓여 불덩이 작열이 빨라지고, 작열의 지속 피해까지 더해져 한 마리를 빠르게 녹입니다. 대신 몹에게 붙잡히면 버티기 어렵습니다.",
    notes:["포에버에서 작열은 본인 전용 효과로 바뀌었습니다. 치명타 피해의 40%가 4초 동안 지속 피해로 들어가며, 다른 마법사와 공유하지 않습니다.","레벨링 초반에는 불덩이 작열보다 작열을 먼저 찍는 편이 체감이 큽니다."],
    race:"얼라이언스는 노움이나 인간, 호드는 오크나 언데드를 추천합니다.",
    seq:["scorch","fireball","fireball","fireball","pyro"],
    core:"화염구로 열기를 쌓고, 3중첩이 되면 불덩이 작열을 사용합니다. 열기는 비주기 주문으로 치명타가 두 번 터질 때마다 1중첩씩 쌓이며, 중첩마다 불덩이 작열의 시전 시간이 25%씩 줄어듭니다. 클래식 이후 확장팩처럼 즉시 시전이 되는 것은 아니니 주의하세요.",
    prio:["불태우기 연마 약화 효과가 없다면 불태우기","열기가 3중첩이라면 불덩이 작열","그 외에는 화염구","몹을 처치한 직후에는 불꽃의 잔흔 효과로 화염 작열"],
    warn:"※ 불태우기 연마는 대상이 받는 화염 피해를 15% 늘려줍니다. 보스전에서는 끝까지 유지해야 합니다.",
    aoe:"탱커가 몹을 잡고 있다면 불기둥 → 화염 폭풍 → 신비한 폭발 순서로 넣습니다. 혼자 몰았다면 얼음 회오리로 묶은 뒤 불기둥을 깔고, 냉기 돌풍으로 거리를 벌립니다.",
    stats:"주문력과 치명타가 핵심입니다. 치명타가 열기와 작열을 동시에 굴리기 때문에 다른 전문화보다 치명타의 가치가 높습니다.",
    tips:[
      ["레벨링","광역 사냥은 두세 마리로 먼저 연습한 뒤 숫자를 늘려가세요."],
      ["레벨링","주문 랭크는 짝수 레벨마다 훈련사에게 가서 올려주세요."],
      ["레벨링","체력이 낮은 몹은 마법봉으로 마무리하면 마나를 아낄 수 있습니다."],
      ["PvE","던전 첫 풀링부터 불덩이 작열로 시작하면 어그로가 튈 수 있습니다. 탱커가 몇 번 때린 뒤에 시작해 주세요."],
      ["장비","전문 기술은 기계공학을 가장 추천하고, 재봉과 연금술도 좋은 선택입니다."],
      ["매크로","시전 끊고 마법 차단 매크로는 화염구처럼 시전이 긴 주문을 쓰는 화염에서 특히 유용합니다."]
    ]
  },
  arcane:{
    split:[["비전",21],["화염",0],["냉기",0]],
    talents:["비전 작렬","화살 탄막","신비한 정신집중","신비한 명상","신비한 미묘함","신비한 집중","냉정"],
    why:"비전은 마나를 그대로 화력으로 바꾸는 전문화입니다. 비전 작렬로 중첩을 쌓아 다른 주문을 강화하는 방식이라, 마나를 얼마나 잘 쓰느냐가 곧 실력 차이로 이어집니다. 전투가 짧은 던전에서 특히 강합니다.",
    notes:["빌드는 25레벨에 화살 탄막까지 찍어야 완성됩니다. 그 전까지는 다른 전문화로 레벨업하는 편이 편합니다.","신비한 미묘함으로 위협 수준을 낮추면 던전에서 신비한 폭발을 부담 없이 쓸 수 있습니다."],
    race:"얼라이언스는 노움이나 인간, 호드는 오크나 언데드를 추천합니다.",
    seq:["ablast","ablast","ablast","missiles"],
    core:"비전 작렬은 최대 4번까지 중첩됩니다. 중첩마다 다음 비전 작렬의 마나 소모가 늘어나는 대신, 비전 작렬이 아닌 다른 주문의 피해가 커집니다. 2~4중첩을 쌓은 뒤 신비한 화살로 소모하는 것이 기본입니다.",
    prio:["화살 탄막이 발동했다면 신비한 화살 (마나 소모 없음)","마나 여유가 있다면 비전 작렬로 2~4중첩","중첩이 쌓였다면 신비한 화살로 소모","이동 중에는 화염 작열, 또는 냉정을 켠 비전 작렬"],
    warn:"※ 전투가 끝날 때 마나가 거의 바닥에 가깝게 남는 것이 이상적입니다. 다만 체력이 얼마 남지 않은 몹에게 마나를 과하게 쓰지는 마세요.",
    aoe:"신비한 폭발이 주력입니다. 신비한 미묘함 덕분에 위협 수준 부담이 적어 던전 광역에서 특히 좋습니다.",
    stats:"지능, 주문력, 치명타 순으로 챙기세요. 정신력은 신비한 명상과 맞물려 전투 중 마나 회복을 늘려줍니다.",
    tips:[
      ["레벨링","혼자 사냥할 때는 1랭크 얼음 화살로 당겨 감속을 건 뒤 시작하면 안전합니다."],
      ["레벨링","마나 보호막은 상시 유지하지 말고, 피해를 막아야 할 때만 사용하세요."],
      ["PvE","28레벨부터 마나 보석을 만들 수 있습니다. 긴 전투에서 순간 마나 회복용으로 챙겨두세요."],
      ["PvE","화살 탄막 발동은 놓치기 쉬우니 알림 애드온을 쓰는 것을 추천합니다."],
      ["장비","전문 기술은 기계공학을 가장 추천하고, 재봉, 연금술, 마법부여 순으로 좋습니다."],
      ["매크로","마법봉 자동 사격 매크로를 두면 마나가 바닥났을 때도 딜을 이어갈 수 있습니다."]
    ]
  }
};

const el = document.getElementById("guide");
let tipFilter = "전체";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const img = (k, cls="ic") => `<img class="${cls}" src="/assets/icons/${k}.jpg" alt="" width="40" height="40">`;


function render(key){
  const s = SPECS[key];
  el.setAttribute("aria-labelledby","tab-"+key);
  el.innerHTML = `
  <section id="talents"><h2>1. 추천 특성 <small>TALENTS</small></h2>
    <div class="build">
      <div class="points">${s.split.map(([n,p])=>`<div class="${p?'hl':''}"><span>${n}</span><span>${p}</span></div>`).join("")}</div>
      <div class="chips">${s.talents.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
    </div>
    <p class="why">${esc(s.why)}</p>
    <ul class="notes">${s.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul>
    <p class="race"><b>추천 종족</b> ${esc(s.race)}</p>
  </section>
  <section id="rotation"><h2>2. 딜사이클 <small>ROTATION</small></h2>
    <div class="seq">${s.seq.map((k,i)=>{const [ic,n,a]=S[k];return `${i?'<span class="arrow" aria-hidden="true">›</span>':''}<div class="step">${img(ic)}<span>${esc(n)}</span>${a?`<span class="alias">${a}</span>`:''}</div>`}).join("")}</div>
    <blockquote>${esc(s.core)}</blockquote>
    <h3>우선순위</h3>
    <ol class="prio">${s.prio.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
    <p class="warn">${esc(s.warn)}</p>
    <h3>광역</h3>
    <p>${esc(s.aoe)}</p>
  </section>
  <section id="bis"><h2>3. BiS <small>30레벨</small></h2>
    <p class="stat"><b>스탯</b> ${esc(s.stats)}</p>
    <p class="warn" style="margin:0 0 10px">비전 · 얼라이언스 기준 목록입니다. 천 장비라 다른 전문화도 대부분 그대로 쓸 수 있습니다.</p>
    <div class="bis-wrap"><table class="bis"><tbody>
      ${BIS.map(([slot,item,q,src,ic])=>`<tr><td>${slot}</td><td><span class="item">${img(ic,"ic "+q)}<span class="${q}">${esc(item)}</span></span></td><td>${esc(src)}</td></tr>`).join("")}
    </tbody></table></div>
  </section>
  <section id="macros"><h2>4. 매크로 <small>MACROS</small></h2>
    <p class="warn" style="margin:0 0 12px">모든 매크로는 한글 클라이언트 주문명 기준입니다. 그대로 복사해서 붙여 넣으시면 됩니다.</p>
    ${MACROS.map((m,i)=>`<div class="macro"><div class="macro-h"><span class="item">${img(S[m.ic][0])}<b>${esc(m.n)}</b></span><button class="copy" type="button" data-i="${i}">복사</button></div><pre id="m-${i}">${esc(m.code)}</pre><p class="warn">${esc(m.d)}</p></div>`).join("")}
  </section>
  <section id="tips"><h2>5. 각종 팁 <small>TIPS</small></h2>
    <div class="tags">${["전체","레벨링","PvE","장비","매크로"].map(t=>`<button type="button" aria-pressed="${t===tipFilter}" data-tag="${t}">${t}</button>`).join("")}</div>
    <div class="tips">${s.tips.map(([g,t])=>`<div class="tip" data-tag="${g}" ${tipFilter!=="전체"&&tipFilter!==g?"hidden":""}><span class="t">${g}</span>${esc(t)}</div>`).join("")}</div>
  </section>`;
}

function setSpec(key){
  if(!SPECS[key]) key="frost";
  document.querySelectorAll(".specs button").forEach(b=>b.setAttribute("aria-selected", b.dataset.spec===key));
  render(key);
}
document.querySelector(".specs").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  setSpec(b.dataset.spec);
});
el.addEventListener("click",e=>{
  const c=e.target.closest(".copy");
  if(c){
    const pre=document.getElementById("m-"+c.dataset.i);
    const done=()=>{c.textContent="복사됨";setTimeout(()=>c.textContent="복사",1500)};
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent="선택됨";};
    try{navigator.clipboard.writeText(pre.textContent).then(done,fallback)}catch(_){fallback()}
    return;
  }
  const t=e.target.closest(".tags button");
  if(t){
    tipFilter=t.dataset.tag;
    el.querySelectorAll(".tags button").forEach(b=>b.setAttribute("aria-pressed",b===t));
    el.querySelectorAll(".tip").forEach(x=>x.hidden = tipFilter!=="전체" && x.dataset.tag!==tipFilter);
  }
});
const h=(location.hash||"").slice(1);
setSpec(["frost","fire","arcane"].includes(h)?h:"frost");
