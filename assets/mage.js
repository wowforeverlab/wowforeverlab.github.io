const ICO = k => `https://wow.zamimg.com/images/wow/icons/medium/${k}.jpg`;
const WH = id => `https://www.wowhead.com/forever/spell=${id}`;

/* 스킬 툴팁 */
const S = {
  frostbolt:{ic:"spell_frost_frostbolt02",n:"얼음 화살",a:"얼화",t:"주문",d:"대상에게 냉기 피해를 주고 이동 속도를 늦춥니다. 동상과 서리의 손가락이 발동하는 출발점입니다."},
  icelance:{ic:"spell_frost_frostblast",n:"얼음창",a:"얼창",t:"주문 · 즉시 시전",d:"대상에게 냉기 피해를 줍니다. 얼어 있는 대상에게는 300% 추가 피해를 줍니다.",id:1312002},
  nova:{ic:"spell_frost_frostnova",n:"얼음 회오리",a:"",t:"주문 · 즉시 시전",d:"주변 적에게 냉기 피해를 주고 제자리에 얼려 묶습니다. 얼린 대상은 얼음창과 산산조각의 대상이 됩니다."},
  coc:{ic:"spell_frost_glacier",n:"냉기 돌풍",a:"냉돌",t:"주문 · 즉시 시전",d:"전방 부채꼴 범위에 냉기 피해를 주고 감속시킵니다. 대상이 얼어 있을 때 얼음 화살 뒤에 이어 쓰면 산산조각 효과를 한 번 더 받을 수 있습니다."},
  blizzard:{ic:"spell_frost_icestorm",n:"눈보라",a:"",t:"주문 · 정신 집중",d:"지정한 지역에 얼음 파편을 쏟아 범위 냉기 피해를 줍니다."},
  fireball:{ic:"spell_fire_flamebolt",n:"화염구",a:"",t:"주문",d:"대상에게 화염 피해를 주고 짧은 지속 피해를 남깁니다."},
  fireblast:{ic:"spell_fire_fireball",n:"화염 작열",a:"화작",t:"주문 · 즉시 시전",d:"대상에게 즉시 화염 피해를 줍니다. 이동 중 마무리에 씁니다."},
  scorch:{ic:"spell_fire_soulburn",n:"불태우기",a:"불태",t:"주문",d:"시전 시간이 짧은 화염 주문입니다. 불태우기 연마를 찍으면 대상이 받는 화염 피해를 늘립니다."},
  pyro:{ic:"spell_fire_fireball02",n:"불덩이 작열",a:"불작",t:"주문 · 특성",d:"강력한 화염 피해와 지속 피해를 줍니다. 열기 중첩마다 시전 시간이 줄어듭니다."},
  ablast:{ic:"spell_arcane_blast",n:"비전 작렬",a:"",t:"주문 · 특성",d:"비전 피해를 줍니다. 최대 4번 중첩되며, 중첩마다 다음 비전 작렬의 마나 소모가 늘고 다른 주문의 피해가 커집니다."},
  missiles:{ic:"spell_nature_starfall",n:"신비한 화살",a:"",t:"주문 · 정신 집중",d:"여러 발의 비전 화살을 연속으로 발사합니다. 화살 탄막 발동 시 마나 소모 없이 쓸 수 있습니다."},
  poly:{ic:"spell_nature_polymorph",n:"변이",a:"",t:"주문",d:"대상을 양으로 변하게 해 일정 시간 행동하지 못하게 합니다. 피해를 받으면 풀립니다."},
  cs:{ic:"spell_frost_iceshock",n:"마법 차단",a:"",t:"주문 · 즉시 시전",d:"대상의 주문 시전을 끊고 해당 계열 주문을 잠시 쓰지 못하게 합니다. 24레벨에 배웁니다."},
  wand:{ic:"ability_shootwand",n:"사격",a:"",t:"마법봉",d:"착용한 마법봉으로 자동 공격합니다. 마나를 쓰지 않습니다."}
};

/* 냉기 특성 트리 (와우헤드 포에버 특성계산기 기준) [행, 열, 최대, 아이콘, 한글명, 와우헤드ID, 설명] */
const FROST_TREE = [
  [0,0,2,"spell_frost_frostward","냉기의 수호",11189,"서리 갑옷·얼음 갑옷의 방어도와 저항을 높이고, 냉기계 수호에 냉기 주문 반사 확률을 부여합니다."],
  [0,1,5,"spell_frost_frostbolt02","얼음 화살 연마",11070,"얼음 화살의 시전 시간을 줄입니다."],
  [0,2,5,"spell_ice_magicdamage","원소의 정밀함",29438,"냉기·화염 주문의 적중률을 최대 6% 높입니다."],
  [1,0,5,"spell_frost_iceshard","얼음 파편",11207,"냉기 주문의 치명타 추가 피해를 최대 100% 늘립니다."],
  [1,1,3,"spell_frost_wisp","영구 결빙",11175,"냉기 감속 효과의 지속 시간과 감속량을 늘립니다."],
  [1,2,2,"spell_frost_freezingbreath","얼음 회오리 연마",11165,"얼음 회오리의 재사용 대기시간을 줄입니다."],
  [1,3,3,"spell_frost_frostarmor","동상",11071,"냉기 감속 효과에 15% 확률로 대상을 5초간 얼리는 효과를 부여합니다."],
  [2,0,3,"spell_frost_frostbolt","사무치는 냉기",11151,"냉기 주문의 피해를 높입니다."],
  [2,1,3,"spell_frost_stun","냉기계 정신집중",11160,"냉기 주문의 마나 소모를 15%, 위협 수준을 30% 줄입니다."],
  [2,2,1,"spell_frost_frostblast","얼음창",1312002,"얼음창 주문을 배웁니다. 얼어 있는 대상에게 300% 추가 피해를 줍니다."],
  [2,3,3,"spell_frost_icestorm","눈보라 연마",11185,"눈보라에 감속 효과를 추가합니다. 포에버에서 감속량과 지속 시간이 크게 줄었습니다."],
  [3,0,2,"spell_shadow_darkritual","혹한의 손길",16757,"얼음 화살·눈보라의 사거리와 얼음 회오리·냉기 돌풍의 범위를 10% 늘립니다."],
  [3,1,1,"spell_frost_frost","얼음 방패",11958,"10초간 얼음에 갇혀 모든 공격을 막습니다. 그동안 행동할 수 없습니다."],
  [3,3,3,"spell_frost_frostshock","산산조각",11170,"얼어 있는 대상에게 모든 주문의 치명타 확률을 높입니다. 포에버에서 3포인트 특성이 됐습니다."],
  [4,0,3,"spell_frost_glacier","냉기 돌풍 연마",11190,"냉기 돌풍의 피해를 높입니다."],
  [4,1,1,"spell_frost_wizardmark","한파",12472,"다른 모든 냉기 주문의 재사용 대기시간을 즉시 초기화합니다."],
  [4,2,2,"ability_mage_wintersgrasp","서리의 손가락",400647,"냉기 감속 효과에 15% 확률로 서리의 손가락을 부여합니다. 다음 주문 2회를 대상이 얼어 있는 것처럼 처리합니다."],
  [5,2,5,"spell_frost_chillingblast","혹한의 추위",11180,"냉기 주문에 혹한의 추위 효과를 걸 확률을 부여합니다. 얼음창·얼음 화살의 치명타 확률을 높이며 5번까지 중첩됩니다."],
  [6,1,1,"spell_ice_lament","얼음 보호막",11426,"피해를 흡수하는 보호막을 즉시 겁니다. 보호막이 있는 동안 주문 시전이 방해받지 않습니다."]
];
const BUILD30 = {"얼음 화살 연마":3,"원소의 정밀함":5,"얼음 파편":5,"동상":3,"얼음창":1,"산산조각":3,"서리의 손가락":1};
const BUILD35 = {...BUILD30,"얼음 화살 연마":5,"서리의 손가락":2,"얼음 방패":1,"한파":1};

const FROST = {
  split30:[0,0,21], split35:[0,0,26],
  intro:"냉기는 감속과 빙결로 적을 묶어두고 얼음창으로 한 번에 터뜨리는 전문화입니다. 퀘스트는 아주 편하지만 빠르지는 않고, 비전보다 마나 부담이 적어 안정적입니다. 다만 30레벨에서는 제대로 돌아가는 데 필요한 특성이 많은데 포인트가 부족해서, 하려는 콘텐츠에 따라 무엇을 포기할지 골라야 합니다.",
  order30:[["10–14","원소의 정밀함","5/5"],["15–17","동상","3/3"],["18–20","얼음 화살 연마","3/5"],["21","얼음창","1/1"],["22–24","얼음 파편","3/5"],["25–27","산산조각","3/3"],["28–29","얼음 파편","5/5"],["30","서리의 손가락","1/2"]],
  order35:[["31","얼음 방패","1/1"],["32","한파","1/1"],["33","서리의 손가락","2/2"],["34–35","얼음 화살 연마","5/5"]],
  why:[
    ["원소의 정밀함 5","냉기·화염 주문 적중률이 6% 오릅니다. 레벨링과 던전에서 주문이 빗나가는 일이 확 줄어들기 때문에, 얼음 화살 연마를 일부 포기하더라도 먼저 챙기는 쪽을 추천합니다."],
    ["동상 3","얼음 화살의 감속 효과가 15% 확률로 대상을 5초간 얼립니다. 냉기 딜은 결국 얼어 있는 대상에게 얼음창을 넣는 구조라, 동상이 그 출발점입니다."],
    ["얼음 화살 연마 3","얼음 화살 시전 시간이 줄어듭니다. 5까지 채우고 싶지만 21포인트로는 부족해서 3에서 멈추고, 보너스 포인트가 생기면 마저 채웁니다."],
    ["얼음창 1","얼어 있는 대상에게 300% 추가 피해를 주는 즉시 시전 주문입니다. 포에버 냉기 딜의 핵심이라 21번째 포인트로 바로 찍습니다."],
    ["얼음 파편 5","냉기 주문의 치명타 추가 피해가 100% 늘어납니다. 산산조각으로 치명타를 띄우는 구조와 맞물려 딜이 크게 오릅니다."],
    ["산산조각 3","얼어 있는 대상에게 치명타 확률이 오릅니다. 예전에도 얼음창 보너스는 받을 수 있었지만, 치명타 확률이 낮아 들쑥날쑥했던 부분을 안정적으로 만들어 줍니다."],
    ["서리의 손가락 1","냉기 감속 효과에 15% 확률로 발동해, 다음 주문 2회를 대상이 얼어 있는 것처럼 처리합니다. 빙결 면역인 몹에게도 산산조각을 적용할 수 있게 해 주는 특성입니다."]
  ],
  skip:"냉기계 정신집중은 마나와 위협 수준을 줄여주지만, 30레벨에선 딜 특성이 더 급합니다. 영구 결빙·사무치는 냉기·냉기의 수호도 같은 이유로 뒤로 미룹니다. PvP나 필드 쟁을 많이 한다면 적중 일부를 빼고 얼음 방패, 혹한의 손길, 얼음 회오리 연마를 찍는 것도 좋은 선택입니다.",
  bonus:"유산 시스템으로 보너스 포인트 5개를 받았다면, 얼음 방패 → 한파 → 서리의 손가락 2번째 → 얼음 화살 연마 4~5 순서로 찍습니다. 얼음 방패와 한파는 던전보다는 PvP와 필드에서 생존용으로 값어치가 큽니다.",
  rot:{
    principle:"냉기 딜의 원리는 단순합니다. 대상을 얼어 있는 상태로 만든 뒤, 그 동안 얼음창으로 큰 피해를 넣는 것입니다. 얼어 있는 대상에게 얼음창은 300% 추가 피해가 붙고, 산산조각으로 치명타가 잘 터지며, 얼음 파편이 치명타 피해를 두 배로 키웁니다.",
    freeze:["동상: 얼음 화살 감속 효과에서 15% 확률로 발동","얼음 회오리: 직접 얼리기 (재사용 대기시간 있음)","서리의 손가락: 다음 주문 2회를 얼어 있는 것처럼 처리"],
    seq:["frostbolt","frostbolt","icelance","nova","icelance"],
    steps:[
      ["시작","얼음 화살로 당깁니다. 감속이 걸리면서 동상과 서리의 손가락이 발동할 기회가 생깁니다."],
      ["기본 반복","얼음 화살을 계속 시전하며 발동 효과를 기다립니다."],
      ["발동했을 때","동상으로 얼었거나 서리의 손가락이 떴다면, 시전 중인 얼음 화살은 끝까지 마무리하고 바로 얼음창을 씁니다. 이렇게 하면 얼음 화살과 얼음창 두 번 모두 산산조각 효과를 받습니다."],
      ["몹이 붙었을 때","얼음 회오리로 얼려 묶습니다. 이동해야 하면 거리를 벌리면서 얼음창을, 안전한 위치라면 얼음 화살 → 얼음창으로 마무리합니다."],
      ["마무리","체력이 얼마 안 남은 몹은 마법봉으로 끝내서 마나를 아낍니다."]
    ],
    prio:["서리의 손가락 발동 중이면, 시전 중인 얼음 화살을 끝낸 뒤 얼음창","대상이 얼어 있으면 얼음 화살 → 얼음창 (또는 얼음 화살 → 냉기 돌풍)","그 외에는 얼음 화살","근접 몹이 붙으면 얼음 회오리 → 거리 벌리기 → 얼음창"],
    aoe:"30레벨 광역은 불기둥을 미리 깔아두고 신비한 폭발을 연타하는 방식이 가장 효율적입니다. 불기둥은 마나 소모가 커서 몹 수가 많을 때만 씁니다. 포에버에서 눈보라 연마의 감속이 크게 약해져, 클래식처럼 눈보라로 몰아 잡는 방식은 효율이 떨어집니다.",
    mana:"냉기는 비전보다 마나가 넉넉한 편이지만, 주문력이 낮으면 화력이 잘 안 나옵니다. 던전에선 환기 같은 마나 회복 수단을 아끼지 말고 자주 쓰는 편이 좋습니다. 큰 효과가 없어 보여도 보스 사이에 여러 번 쓰는 게 아예 안 쓰는 것보다 낫습니다.",
    mistakes:["1랭크 얼음 화살로 동상만 노리는 클래식 방식은 포에버에서 막혔습니다. 해당 레벨의 얼음 화살을 그대로 쓰세요.","서리의 손가락이 떴다고 얼음 화살 시전을 끊지 마세요. 끝까지 시전해야 두 주문 모두 산산조각 효과를 받습니다.","얼어 있지 않은 대상에게 얼음창을 쓰면 얼음 화살보다 손해입니다."]
  },
  stats:"지능, 주문력, 정신력을 최대한 챙기세요. 제작 장비가 이 세 가지를 맞추기 좋습니다. 60레벨 공격대부터는 적중을 가장 먼저 챙겨야 합니다.",
  race:"얼라이언스는 스카이본, 호드는 언데드를 추천합니다.",
  tips:[
    ["레벨링","레벨에 맞는 마법봉을 만들거나 사서 바로 바꿔주세요. 초반에는 마법봉이 매우 강하고, 이후에도 체력이 낮은 몹을 마무리할 때 마나를 아낄 수 있습니다."],
    ["레벨링","초반엔 비전 트리의 마법봉류 전문화 2포인트를 찍고, 마법봉 위주 구간이 끝나면 재분배하는 방법도 좋습니다. 베타에서는 재분배 비용이 1실버(1시간 재사용 대기)라 부담이 없습니다."],
    ["레벨링","캠핑 버프도 챙기세요. 가죽세공은 휴식 경험치 5%, 무두질은 치명타 2%, 연금술은 마나 회복, 재봉은 정신력을 올려줍니다. 각각 1시간 재사용 대기시간이 있습니다."],
    ["PvE","24레벨에 배우는 마법 차단으로 던전의 원거리 시전 몹을 끊어주세요."],
    ["장비","재봉으로 만드는 비단(Silky)·하늘빛 비단 장비는 냉기 피해만 올려주고, 만든 재봉사 본인만 착용할 수 있습니다."],
    ["장비","30레벨이 되면 마법사 훈련사에게서 마법봉 직업 퀘스트를 받을 수 있습니다. 붉은십자군 수도원 도서관을 지나야 해서 어렵지만, 냉기는 냉기 피해를 올려주는 마법봉을 고르면 됩니다."],
    ["매크로","얼음 방패와 한파를 한 버튼에 묶어두면, 얼음 방패를 쓴 뒤 바로 한파로 재사용 대기시간을 초기화할 수 있습니다."]
  ],
  macros:[
    {n:"얼음 방패 + 한파",ic:"spell_frost_frost",d:"그냥 누르면 얼음 방패, Shift를 누른 채 누르면 한파입니다. 보너스 포인트로 두 특성을 모두 찍었을 때 씁니다.",code:"#showtooltip\n/cast [nomod] 얼음 방패\n/cast [mod:shift] 한파"}
  ]
};

const OLD = {
  fire:{
    split:[0,21,0],
    talents:["화염구 연마","작열","불타는 영혼","불덩이 작열","열기","불태우기 연마","불꽃의 잔흔","화염 폭풍"],
    why:"화염은 치명타로 화력을 끌어올리는 전문화입니다. 치명타가 터질수록 열기가 쌓여 불덩이 작열이 빨라지고, 작열의 지속 피해까지 더해져 한 마리를 빠르게 녹입니다.",
    seq:["scorch","fireball","fireball","fireball","pyro"],
    core:"화염구로 열기를 쌓고, 3중첩이 되면 불덩이 작열을 사용합니다. 열기는 비주기 주문으로 치명타가 두 번 터질 때마다 1중첩씩 쌓이며, 중첩마다 불덩이 작열의 시전 시간이 25%씩 줄어듭니다.",
    prio:["불태우기 연마 약화 효과가 없다면 불태우기","열기가 3중첩이라면 불덩이 작열","그 외에는 화염구","몹을 처치한 직후에는 불꽃의 잔흔 효과로 화염 작열"],
    tips:[["레벨링","광역 사냥은 두세 마리로 먼저 연습한 뒤 숫자를 늘려가세요."],["PvE","던전 첫 풀링부터 불덩이 작열로 시작하면 어그로가 튈 수 있습니다."],["장비","전문 기술은 기계공학을 가장 추천합니다."]]
  },
  arcane:{
    split:[21,0,0],
    talents:["비전 작렬","화살 탄막","신비한 정신집중","신비한 명상","신비한 미묘함","신비한 집중","냉정"],
    why:"비전은 마나를 그대로 화력으로 바꾸는 전문화입니다. 비전 작렬로 중첩을 쌓아 다른 주문을 강화하는 방식이라, 마나를 얼마나 잘 쓰느냐가 곧 실력 차이로 이어집니다.",
    seq:["ablast","ablast","ablast","missiles"],
    core:"비전 작렬은 최대 4번까지 중첩되며, 중첩마다 다음 비전 작렬의 마나 소모가 늘고 다른 주문의 피해가 커집니다. 2~4중첩을 쌓은 뒤 신비한 화살로 소모하는 것이 기본입니다.",
    prio:["화살 탄막이 발동했다면 신비한 화살","마나 여유가 있다면 비전 작렬로 2~4중첩","중첩이 쌓였다면 신비한 화살로 소모"],
    tips:[["레벨링","혼자 사냥할 때는 1랭크 얼음 화살로 당겨 감속을 건 뒤 시작하면 안전합니다."],["PvE","28레벨부터 마나 마노를 만들어 순간 마나 회복용으로 챙기세요."],["장비","전문 기술은 기계공학을 가장 추천합니다."]]
  }
};

const MACROS = [
  {n:"마법봉 자동 사격",ic:"ability_shootwand",d:"사격 앞에 !를 붙이면 여러 번 눌러도 자동 사격이 꺼지지 않습니다.",code:"#showtooltip 사격\n/cast !사격"},
  {n:"변이 마우스오버",ic:"spell_nature_polymorph",d:"마우스를 올려둔 적에게 바로 변이를 겁니다. 대상을 바꾸지 않고도 위험한 시전자를 묶을 수 있습니다.",code:"#showtooltip 변이\n/cast [@mouseover,harm,nodead][] 변이"},
  {n:"시전 끊고 마법 차단",ic:"spell_frost_iceshock",d:"다른 주문을 시전하는 중이어도 즉시 끊고 마법 차단을 사용합니다.",code:"#showtooltip 마법 차단\n/stopcasting\n/cast 마법 차단"}
];
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

const el = document.getElementById("guide");
let tipFilter = "전체", build = "30";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TT = {};
let ttSeq = 0;
function reg(o){ const k = "t"+(ttSeq++); TT[k]=o; return k; }
const spellIcon = key => { const s=S[key]; const k=reg({n:s.n,t:s.t,d:s.d,url:s.id?WH(s.id):null,ic:s.ic}); return `<button class="ic-btn" type="button" data-tt="${k}" aria-label="${esc(s.n)} 정보"><img class="ic" src="${ICO(s.ic)}" alt="" width="40" height="40" loading="lazy"></button>`; };
const plainIcon = (ic,o) => { const k=reg(o); return `<button class="ic-btn" type="button" data-tt="${k}" aria-label="${esc(o.n)} 정보"><img class="ic" src="${ICO(ic)}" alt="" width="40" height="40" loading="lazy"></button>`; };

function tree(b){
  const pts = b==="35"?BUILD35:BUILD30;
  let cells="";
  for(const [r,c,mx,ic,n,id,d] of FROST_TREE){
    const p = pts[n]||0;
    const k = reg({n,t:`냉기 특성 · ${p}/${mx}`,d,url:WH(id),ic});
    cells += `<button type="button" class="tal ${p?(p===mx?"full":"part"):"off"}" style="grid-row:${r+1};grid-column:${c+1}" data-tt="${k}" aria-label="${esc(n)} ${p}/${mx}"><img src="${ICO(ic)}" alt="" width="40" height="40" loading="lazy"><span class="pts">${p}/${mx}</span></button>`;
  }
  const total = Object.values(pts).reduce((a,b)=>a+b,0);
  return `<div class="tree-wrap"><div class="tree-head"><span>냉기</span><b>${total} / 51</b></div><div class="tree">${cells}</div></div>`;
}

function renderFrost(){
  const f = FROST, r = f.rot;
  const order = build==="35" ? [...f.order30,...f.order35] : f.order30;
  return `
  <section id="talents"><h2>1. 추천 특성 <small>TALENTS</small></h2>
    <p>${esc(f.intro)}</p>
    <div class="buildtabs" role="tablist" aria-label="빌드">
      <button type="button" role="tab" data-build="30" aria-selected="${build==="30"}">30레벨 · 0/0/21</button>
      <button type="button" role="tab" data-build="35" aria-selected="${build==="35"}">유산 보너스 · 0/0/26</button>
    </div>
    <div class="talent-layout">
      ${tree(build)}
      <div class="order"><h3>찍는 순서</h3><ol>${order.map(([lv,n,rk])=>`<li><span class="lv">${lv}</span><span>${esc(n)}</span><span class="rk">${rk}</span></li>`).join("")}</ol></div>
    </div>
    <p class="hint">특성 아이콘을 누르면 효과를 볼 수 있습니다.</p>
    <h3>왜 이렇게 찍나요</h3>
    <dl class="why-list">${f.why.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("")}</dl>
    <h3>빼는 특성과 대안</h3><p>${esc(f.skip)}</p>
    <h3>유산 보너스 포인트</h3><p>${esc(f.bonus)}</p>
    <p class="race"><b>추천 종족</b> ${esc(f.race)}</p>
  </section>
  <section id="rotation"><h2>2. 딜사이클 <small>ROTATION</small></h2>
    <blockquote>${esc(r.principle)}</blockquote>
    <h3>대상을 얼리는 세 가지 방법</h3>
    <ul class="notes">${r.freeze.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
    <h3>기본 흐름</h3>
    <div class="seq">${r.seq.map((k,i)=>`${i?'<span class="arrow" aria-hidden="true">›</span>':''}<div class="step">${spellIcon(k)}<span>${esc(S[k].n)}</span>${S[k].a?`<span class="alias">${S[k].a}</span>`:''}</div>`).join("")}</div>
    <ol class="steps">${r.steps.map(([a,b])=>`<li><b>${esc(a)}</b> ${esc(b)}</li>`).join("")}</ol>
    <h3>우선순위</h3>
    <ol class="prio">${r.prio.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
    <h3>광역</h3><p>${esc(r.aoe)}</p>
    <h3>마나 관리</h3><p>${esc(r.mana)}</p>
    <h3>자주 하는 실수</h3>
    <ul class="notes warnlist">${r.mistakes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
  </section>`;
}

function renderOld(key){
  const s = OLD[key];
  return `
  <section id="talents"><h2>1. 추천 특성 <small>TALENTS</small></h2>
    <p class="hint">이 전문화는 냉기와 같은 수준으로 정리 중입니다.</p>
    <div class="build"><div class="points">${["비전","화염","냉기"].map((n,i)=>`<div class="${s.split[i]?'hl':''}"><span>${n}</span><span>${s.split[i]}</span></div>`).join("")}</div>
    <div class="chips">${s.talents.map(t=>`<span>${esc(t)}</span>`).join("")}</div></div>
    <p class="why">${esc(s.why)}</p>
  </section>
  <section id="rotation"><h2>2. 딜사이클 <small>ROTATION</small></h2>
    <div class="seq">${s.seq.map((k,i)=>`${i?'<span class="arrow" aria-hidden="true">›</span>':''}<div class="step">${spellIcon(k)}<span>${esc(S[k].n)}</span>${S[k].a?`<span class="alias">${S[k].a}</span>`:''}</div>`).join("")}</div>
    <blockquote>${esc(s.core)}</blockquote>
    <h3>우선순위</h3><ol class="prio">${s.prio.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
  </section>`;
}

function renderCommon(key){
  const stats = key==="frost" ? FROST.stats : "지능, 주문력, 치명타를 우선하고, 정신력으로 마나 회복을 보완하세요.";
  const macros = key==="frost" ? [...FROST.macros, ...MACROS] : MACROS;
  const tips = key==="frost" ? FROST.tips : OLD[key].tips;
  return `
  <section id="bis"><h2>3. BiS <small>30레벨</small></h2>
    <p class="stat"><b>스탯</b> ${esc(stats)}</p>
    <p class="hint">비전 · 얼라이언스 기준 목록입니다. 와우헤드 기준 목록으로 곧 교체됩니다.</p>
    <div class="bis-wrap"><table class="bis"><tbody>
      ${BIS.map(([slot,item,q,src,ic])=>`<tr><td>${slot}</td><td><span class="item">${plainIcon(ic,{n:item,t:`${slot} · ${q==="rare"?"희귀":"고급"}`,d:`획득처: ${src}`,ic,q})}<span class="${q}">${esc(item)}</span></span></td><td>${esc(src)}</td></tr>`).join("")}
    </tbody></table></div>
  </section>
  <section id="macros"><h2>4. 매크로 <small>MACROS</small></h2>
    <p class="hint">모든 매크로는 한글 클라이언트 주문명 기준입니다. 그대로 복사해서 붙여 넣으시면 됩니다.</p>
    ${macros.map((m,i)=>`<div class="macro"><div class="macro-h"><span class="item"><img class="ic" src="${ICO(m.ic)}" alt="" width="40" height="40" loading="lazy"><b>${esc(m.n)}</b></span><button class="copy" type="button" data-i="${i}">복사</button></div><pre id="m-${i}">${esc(m.code)}</pre><p class="warn">${esc(m.d)}</p></div>`).join("")}
  </section>
  <section id="tips"><h2>5. 각종 팁 <small>TIPS</small></h2>
    <div class="tags">${["전체","레벨링","PvE","장비","매크로"].map(t=>`<button type="button" aria-pressed="${t===tipFilter}" data-tag="${t}">${t}</button>`).join("")}</div>
    <div class="tips">${tips.map(([g,t])=>`<div class="tip" data-tag="${g}" ${tipFilter!=="전체"&&tipFilter!==g?"hidden":""}><span class="t">${g}</span>${esc(t)}</div>`).join("")}</div>
  </section>`;
}

let cur = "frost";
function render(key){
  cur = key;
  for (const k in TT) delete TT[k];
  el.setAttribute("aria-labelledby","tab-"+key);
  el.innerHTML = (key==="frost" ? renderFrost() : renderOld(key)) + renderCommon(key);
}

/* 툴팁 */
const tip = document.createElement("div");
tip.className = "wtip"; tip.hidden = true; tip.setAttribute("role","dialog");
document.body.appendChild(tip);
function showTip(btn){
  const o = TT[btn.dataset.tt]; if(!o) return;
  tip.innerHTML = `<div class="wtip-h"><img src="${ICO(o.ic)}" alt="" width="36" height="36"><div><b class="${o.q||""}">${esc(o.n)}</b><small>${esc(o.t||"")}</small></div><button type="button" class="wtip-x" aria-label="닫기">×</button></div><p>${esc(o.d)}</p>${o.url?`<a href="${o.url}" target="_blank" rel="noopener">와우헤드에서 보기 (영문)</a>`:""}`;
  tip.hidden = false;
  const r = btn.getBoundingClientRect(), w = Math.min(300, innerWidth-24);
  tip.style.width = w+"px";
  let x = r.left + window.scrollX; x = Math.max(12, Math.min(x, window.scrollX + innerWidth - w - 12));
  tip.style.left = x+"px";
  tip.style.top = (r.bottom + window.scrollY + 8)+"px";
}
document.addEventListener("click", e=>{
  const b = e.target.closest("[data-tt]");
  if (b) { showTip(b); return; }
  if (!e.target.closest(".wtip") || e.target.closest(".wtip-x")) tip.hidden = true;
});
document.addEventListener("keydown", e=>{ if(e.key==="Escape") tip.hidden = true; });
if (matchMedia("(hover:hover)").matches){
  document.addEventListener("mouseover", e=>{ const b=e.target.closest("[data-tt]"); if(b) showTip(b); });
  document.addEventListener("mouseout", e=>{ const b=e.target.closest("[data-tt]"); if(b && !b.contains(e.relatedTarget)) tip.hidden = true; });
}

el.addEventListener("click", e=>{
  const bt = e.target.closest("[data-build]");
  if (bt){ build = bt.dataset.build; render(cur); return; }
  const c = e.target.closest(".copy");
  if (c){
    const pre = document.getElementById("m-"+c.dataset.i);
    const done=()=>{c.textContent="복사됨";setTimeout(()=>c.textContent="복사",1500)};
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent="선택됨";};
    try{navigator.clipboard.writeText(pre.textContent).then(done,fallback)}catch(_){fallback()}
    return;
  }
  const t = e.target.closest(".tags button");
  if (t){
    tipFilter = t.dataset.tag;
    el.querySelectorAll(".tags button").forEach(b=>b.setAttribute("aria-pressed",b===t));
    el.querySelectorAll(".tip").forEach(x=>x.hidden = tipFilter!=="전체" && x.dataset.tag!==tipFilter);
  }
});
function setSpec(key){
  if(!["frost","fire","arcane"].includes(key)) key="frost";
  document.querySelectorAll(".specs button").forEach(b=>b.setAttribute("aria-selected", b.dataset.spec===key));
  tip.hidden = true;
  render(key);
}
document.querySelector(".specs").addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) setSpec(b.dataset.spec); });
const h=(location.hash||"").slice(1);
setSpec(["frost","fire","arcane"].includes(h)?h:"frost");
