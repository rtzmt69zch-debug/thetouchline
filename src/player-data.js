// Player model and FotMob-shaped roster normalizer. No remote scraping is performed here.
export const PLAYER_ROLES = {
 '스트라이커':['타겟맨','포쳐','폴스나인','완성형 공격수','침투형 포워드'],
 '윙어':['클래식 윙어','수비형 윙어','인사이드 포워드','인버티드 윙어'],
 '공격형 미드필더':['공격형 미드필더','전진형 플레이메이커','세컨드 스트라이커','트레콰르티스타'],
 '중앙 미드필더':['박스 투 박스','딥라잉 플레이메이커','볼 위닝 미드필더','로밍 플레이메이커'],
 '수비수':['빌드업 센터백','안정형 센터백','윙백','풀백','수비형 풀백','인버티드 풀백'],
 '골키퍼':['골키퍼','스위퍼 키퍼']
};
export const POSITION_ROLE_COMPATIBILITY={
 '스트라이커':PLAYER_ROLES['스트라이커'],'윙어':PLAYER_ROLES['윙어'],
 '공격형 미드필더':PLAYER_ROLES['공격형 미드필더'],'중앙 미드필더':PLAYER_ROLES['중앙 미드필더'],
 '수비수':PLAYER_ROLES['수비수'],'골키퍼':PLAYER_ROLES['골키퍼'],
 '공격': [...PLAYER_ROLES['스트라이커'],...PLAYER_ROLES['윙어']],
 '중원':[...PLAYER_ROLES['공격형 미드필더'],...PLAYER_ROLES['중앙 미드필더']],
 '수비':PLAYER_ROLES['수비수']
};
export function roleOptionsForPlayer(player={}) { const raw=player.positionDetail||player.primaryPosition||player.position||'중앙 미드필더'; const pos=raw==='스트라이커'?'스트라이커':raw==='윙어'?'윙어':raw==='중앙 미드필더'?'중앙 미드필더':raw==='공격형 미드필더'?'공격형 미드필더':raw==='수비수'?'수비수':raw; return POSITION_ROLE_COMPATIBILITY[pos]||POSITION_ROLE_COMPATIBILITY[player.position]||PLAYER_ROLES['중앙 미드필더']; }
export function roleFitMultiplier(player={},assignedRole=player.role) { const options=roleOptionsForPlayer(player); if(!assignedRole)return 1; if(options.includes(assignedRole))return assignedRole===player.role?1.04:1; return .94; }
export const ROLE_POINT_BIAS = {
 '타겟맨':{goal:1.15,assist:.85,shot:1.05,create:.9,duel:1.2},'포쳐':{goal:1.55,assist:.55,shot:1.45,create:.55,duel:.8},'폴스나인':{goal:.72,assist:1.5,shot:.8,create:1.5,duel:.85},'완성형 공격수':{goal:1.2,assist:1.1,shot:1.1,create:1.05,duel:1},'침투형 포워드':{goal:1.4,assist:.8,shot:1.3,create:.8,duel:.9},
 '클래식 윙어':{goal:.8,assist:1.4,shot:.8,create:1.45,duel:.9},'수비형 윙어':{goal:.65,assist:1.05,shot:.65,create:1.05,duel:1.25},'인사이드 포워드':{goal:1.4,assist:.85,shot:1.35,create:.9,duel:.9},'인버티드 윙어':{goal:1.05,assist:1.2,shot:1.05,create:1.25,duel:.9},
 '공격형 미드필더':{goal:.95,assist:1.2,shot:.9,create:1.3,duel:.8},'전진형 플레이메이커':{goal:.8,assist:1.5,shot:.75,create:1.6,duel:.85},'세컨드 스트라이커':{goal:1.3,assist:1.05,shot:1.25,create:1.05,duel:.8},'트레콰르티스타':{goal:1.0,assist:1.55,shot:.95,create:1.65,duel:.65},
 '박스 투 박스':{goal:1,assist:1,shot:1,create:1,duel:1.15},'딥라잉 플레이메이커':{goal:.55,assist:1.35,shot:.55,create:1.5,duel:1},'볼 위닝 미드필더':{goal:.45,assist:.7,shot:.5,create:.7,duel:1.5},'로밍 플레이메이커':{goal:.85,assist:1.3,shot:.8,create:1.45,duel:1},
 '빌드업 센터백':{goal:.25,assist:.8,shot:.2,create:1.25,duel:1.15},'안정형 센터백':{goal:.25,assist:.35,shot:.2,create:.55,duel:1.45},'윙백':{goal:.55,assist:1.3,shot:.55,create:1.35,duel:1.2},'풀백':{goal:.35,assist:.95,shot:.3,create:1,duel:1.25},'수비형 풀백':{goal:.2,assist:.55,shot:.2,create:.75,duel:1.4},'인버티드 풀백':{goal:.3,assist:.85,shot:.35,create:1.25,duel:1.2},'골키퍼':{goal:.01,assist:.08,shot:.01,create:.15,duel:1}
};
import rosterDatabase from '../data/players/rosters.js';
import caPaOverrides from '../data/players/ca-pa-overrides.js';
const stableHash = value => { let h=2166136261; for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);} return (h>>>0).toString(36); };
const normalizedPlayerName=name=>String(name||'').toLocaleLowerCase().normalize('NFC').replace(/[áàâäãå]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i').replace(/[óòôöõ]/g,'o').replace(/[úùûü]/g,'u').replace(/ñ/g,'n').replace(/ç/g,'c').replace(/ýÿ/g,'y').replace(/[^a-z0-9가-힣]/g,'');
function suppliedRatingOverride(name){const key=normalizedPlayerName(name);if(caPaOverrides[key])return caPaOverrides[key];const matches=Object.entries(caPaOverrides).filter(([k])=>k&&(key.endsWith(k)||key.startsWith(k)));return matches.length===1?matches[0][1]:null;}
const PLAYER_STYLE_PROFILES={
 wirtz:{positionDetail:'공격형 미드필더',role:'전진형 플레이메이커',secondaryPositions:['중앙 미드필더','윙어'],specialAbilities:['킬러 패스','좁은 공간 드리블'],bias:{passing:13,vision:14,dribbling:12,firstTouch:11,agility:8,longShots:4}},
 szoboszlai:{positionDetail:'중앙 미드필더',role:'박스 투 박스',secondaryPositions:['공격형 미드필더','윙어'],specialAbilities:['왕복 활동량','강력한 중거리 슛'],bias:{endurance:16,longShots:15,passing:8,pace:7,physical:7,vision:5}},
 isak:{positionDetail:'스트라이커',role:'침투형 포워드',secondaryPositions:['윙어'],specialAbilities:['뒷공간 침투','정교한 마무리'],bias:{pace:12,finishing:13,dribbling:10,composure:11,firstTouch:9}},
 kerkez:{positionDetail:'수비수',role:'풀백',secondaryPositions:['윙어'],specialAbilities:['적극적인 오버래핑','강한 대인 압박'],bias:{pace:10,tackling:9,endurance:10,crossing:7,physical:8}},
 frimpong:{positionDetail:'수비수',role:'윙백',secondaryPositions:['윙어'],specialAbilities:['폭발적인 오버래핑','가속 드리블'],bias:{pace:16,dribbling:12,crossing:10,endurance:11,agility:12}},
 macallister:{positionDetail:'중앙 미드필더',role:'딥라잉 플레이메이커',secondaryPositions:['공격형 미드필더'],specialAbilities:['전진 패스','압박 회피'],bias:{passing:12,vision:11,firstTouch:9,tackling:7,longShots:8}},
 vandijk:{positionDetail:'수비수',role:'안정형 센터백',secondaryPositions:[],specialAbilities:['공중볼 장악','수비 리더십'],bias:{defending:15,heading:15,physical:13,passing:9,positioning:14}},
 konate:{positionDetail:'수비수',role:'안정형 센터백',secondaryPositions:[],specialAbilities:['강한 대인 수비','커버 스피드'],bias:{defending:12,physical:13,pace:8,heading:8,tackling:11}},
 alisson:{positionDetail:'골키퍼',role:'스위퍼 키퍼',secondaryPositions:[],specialAbilities:['일대일 선방','넓은 수비 범위'],bias:{reflexes:13,handling:11,oneOnOnes:14,kicking:8,positioning:10}},
 gravenberch:{positionDetail:'중앙 미드필더',role:'로밍 플레이메이커',secondaryPositions:['수비수'],specialAbilities:['볼 운반','압박 탈출'],bias:{dribbling:10,passing:8,vision:7,physical:7,firstTouch:9}},
 ekitike:{positionDetail:'스트라이커',role:'완성형 공격수',secondaryPositions:['윙어'],specialAbilities:['연계 플레이','민첩한 침투'],bias:{finishing:10,dribbling:8,pace:8,firstTouch:9,agility:9}},
 gakpo:{positionDetail:'윙어',role:'인사이드 포워드',secondaryPositions:['스트라이커'],specialAbilities:['안쪽 침투','강한 슈팅'],bias:{finishing:9,dribbling:8,physical:7,pace:6,longShots:6}}
};
function applyPlayerStyleProfile(player){const name=normalizedPlayerName(player.name);const found=Object.entries(PLAYER_STYLE_PROFILES).find(([key])=>name===key||name.endsWith(key));if(!found)return player;const profile=found[1];player.positionDetail=profile.positionDetail;player.primaryPosition=profile.positionDetail;player.role=profile.role;player.secondaryPositions=profile.secondaryPositions;player.specialAbilities=profile.specialAbilities;const base=Number(player.currentRating??player.rating)||60;for(const [key,value] of Object.entries(profile.bias))player.attributes[key]=Math.max(5,Math.min(99,Math.round(base+value)));return player;}
export function playerIdentityId(p={}) {
  if(p.fotmobId!=null && String(p.fotmobId).trim()) return `fotmob:${String(p.fotmobId).trim()}`;
  const base=[p.name||'',p.nationality||p.cname||'',p.dateOfBirth||p.birthDate||'',p.club||p.teamName||''].join('|').normalize('NFKC').toLocaleLowerCase();
  return `player:${stableHash(base)}`;
}
function broadPosition(detail=''){if(detail==='골키퍼')return '골키퍼';if(['스트라이커','윙어','공격'].includes(detail))return '공격';if(['공격형 미드필더','중앙 미드필더','중원'].includes(detail))return '중원';if(['수비수','수비'].includes(detail))return '수비';return '중원';}
export function normalizePosition(raw='') {
 const s=String(raw).toLowerCase();
 if(/keeper|goalkeeper|골키퍼/.test(s)) return '골키퍼';
 if(/wing|forward|striker|attacker|공격수|윙어/.test(s)) return /wing/.test(s)?'윙어':'스트라이커';
 if(/attacking midfield|공격형 미드필더|trequartista/.test(s)) return '공격형 미드필더';
 if(/midfield|중앙 미드필더|defensive midfield/.test(s)) return '중앙 미드필더';
 if(/defender|back|centre-back|center-back|수비수/.test(s)) return '수비수';
 return '중앙 미드필더';
}
export function normalizeFotMobTeamPayload(payload={}, clubOverride='') {
 const team=payload.details||payload.team||{}; const club=clubOverride||team.name||payload.name||'';
 const groups=payload.squad?.squad||payload.squad||[]; const out=[];
 for(const group of groups){const title=group.title||group.role?.fallback||''; if(/coach|감독/i.test(title)) continue;
  for(const raw of group.members||[]){if(raw.excludeFromRanking||raw.isCoach)continue;
   const role=raw.role?.fallback||raw.role||title; const position=normalizePosition(`${title} ${role}`); const age=Number(raw.age)||null;
   const broadPosition=position==='골키퍼'?'골키퍼':['스트라이커','윙어'].includes(position)?'공격':['공격형 미드필더','중앙 미드필더'].includes(position)?'중원':'수비';
   const p={fotmobId:raw.id==null?null:String(raw.id),name:raw.name||raw.localizedName||'',nationality:raw.cname||raw.country||raw.ccode||'미상',countryCode:raw.ccode||'',dateOfBirth:raw.dateOfBirth||raw.birthDate?.utcTime||null,age,club,teamId:team.id||null,position:broadPosition,positionDetail:position,source:'FotMob',sourceUpdatedAt:new Date().toISOString()};
   p.id=playerIdentityId(p); p.currentRating=estimateBaseRating({...p,position:position}); p.potentialRating=estimatePotentialRating({...p,currentRating:p.currentRating}); p.rating=p.currentRating; p.potential=p.potentialRating; p.role=defaultRole(position,raw); p.fitness=100; p.season={appearances:0,goals:0,assists:0,ratingTotal:0}; out.push(p);
  }
 }
 return {club,teamId:team.id||null,source:'FotMob',updatedAt:new Date().toISOString(),counts:Object.fromEntries(['스트라이커','윙어','공격형 미드필더','중앙 미드필더','수비수','골키퍼'].map(k=>[k,out.filter(p=>p.position===k).length])),players:out};
}
export function estimateBaseRating(p={}) {
 // FotMob squad lists do not guarantee a universal overall rating; this is an explicitly labelled game estimate.
 const age=Number(p.age)||25; const pos=p.position||'중앙 미드필더'; const seed=parseInt(stableHash(`${p.id||p.name}|${pos}`),36)||50;
 const baseline=pos==='골키퍼'?61:pos==='수비수'?60:pos==='스트라이커'?62:61;
 const ageFactor=age<20?-5:age<23?-1:age<=29?3:age<=32?1:-4;
 return Math.max(35,Math.min(91,baseline+ageFactor+(seed%13)-6));
}
export function estimatePotentialRating(p={}) {
 const current=Number(p.currentRating??p.rating)||60, age=Number(p.age);
 const growth=Number.isFinite(age)?(age<19?12:age<22?9:age<25?5:age<28?2:0):2;
 return Math.max(current,Math.min(99,current+growth));
}
export function ratingTier(value) {
 const n=Number(value)||0;
 if(n>=90)return '월드클래스'; if(n>=85)return '최상위권'; if(n>=80)return '상위권';
 if(n>=75)return '준수'; if(n>=70)return '평균 이상'; if(n>=65)return '평균';
 if(n>=55)return '성장형'; return '하위권';
}
export function defaultRole(position, raw={}) {
 const detail=raw.positionDetail||raw.primaryPosition||position; const list=POSITION_ROLE_COMPATIBILITY[detail]||POSITION_ROLE_COMPATIBILITY[position]||PLAYER_ROLES['중앙 미드필더']; const text=String(raw.role?.fallback||raw.role||'').toLowerCase();
 if(position==='골키퍼')return /sweeper/.test(text)?'스위퍼 키퍼':'골키퍼';
 if(position==='윙어')return /left|right wing|winger/.test(text)?'클래식 윙어':'인사이드 포워드';
 if(position==='스트라이커')return /target/.test(text)?'타겟맨':/second/.test(text)?'세컨드 스트라이커':'침투형 포워드';
 if(position==='수비수')return /wing.?back/.test(text)?'윙백':/full.?back/.test(text)?'풀백':/centre|center/.test(text)?'안정형 센터백':'빌드업 센터백';
 if(position==='공격형 미드필더')return '전진형 플레이메이커';
 return list[0];
}
export function rolePointBias(player={}) {return ROLE_POINT_BIAS[player.role]||{goal:1,assist:1,shot:1,create:1,duel:1};}
export const PLAYER_ATTRIBUTE_KEYS=['pace','finishing','passing','defending','physical','endurance','dribbling','vision','firstTouch','heading','tackling','crossing','longShots','positioning','composure','agility','strength','jumping','reflexes','handling','kicking','oneOnOnes'];
const ATTRIBUTE_BIASES={
 '골키퍼':{reflexes:9,handling:7,oneOnOnes:6,positioning:5,kicking:2,finishing:-40,heading:-30},
 '스트라이커':{pace:5,finishing:8,positioning:7,firstTouch:4,dribbling:3,heading:2,defending:-15,tackling:-12},
 '윙어':{pace:8,dribbling:8,agility:7,crossing:4,finishing:4,defending:-12,tackling:-10},
 '공격형 미드필더':{passing:7,vision:8,dribbling:6,firstTouch:6,longShots:3,defending:-5,tackling:-4},
 '중앙 미드필더':{passing:5,vision:4,endurance:6,tackling:4,firstTouch:4,dribbling:2},
 '수비수':{defending:8,tackling:7,heading:5,physical:5,positioning:6,pace:1,finishing:-20}
};
const abilityLabels={pace:'가속력',finishing:'결정력',passing:'패스',defending:'수비',physical:'피지컬',endurance:'지구력',dribbling:'드리블',vision:'시야',firstTouch:'퍼스트 터치',heading:'헤더',tackling:'태클',crossing:'크로스',longShots:'중거리 슛',positioning:'위치 선정',composure:'침착성',agility:'민첩성',strength:'힘',jumping:'점프',reflexes:'반사신경',handling:'볼 처리',kicking:'킥',oneOnOnes:'일대일 방어'};
function generatedAttributes(player={},base=60){
 const detail=player.positionDetail||player.primaryPosition||player.position||'중앙 미드필더';
 const bias=ATTRIBUTE_BIASES[detail]||ATTRIBUTE_BIASES[player.position]||ATTRIBUTE_BIASES['중앙 미드필더'];
 return Object.fromEntries(PLAYER_ATTRIBUTE_KEYS.map((key,i)=>{const seed=parseInt(stableHash(`${player.id||player.name}:${key}`),36)||0;const variation=(seed%11)-5;return [key,Math.max(5,Math.min(99,Math.round(base+(bias[key]||0)+variation)))];}));
}
export function playerMatchRating(player={}){
 const a=player.attributes||{};const pos=player.position||'중원';
 const detail=player.positionDetail||player.primaryPosition||'';const groups=pos==='골키퍼'?['reflexes','handling','oneOnOnes','positioning','kicking']:pos==='공격'?(detail==='윙어'?['pace','dribbling','crossing','agility','passing','firstTouch']:['finishing','pace','positioning','firstTouch','composure','heading']):pos==='수비'?['defending','tackling','heading','physical','positioning','pace','passing']:['passing','vision','dribbling','endurance','firstTouch','tackling','longShots'];
 const values=groups.map(k=>Number(a[k]??player[k]??65));const mean=values.reduce((x,y)=>x+y,0)/values.length;
 const abilities=(player.specialAbilities||[]).map(String);let special=0;for(const ability of abilities){if(/패스|플레이메이킹|킬러/.test(ability)&&['중원','공격'].includes(pos))special+=.55;if(/드리블|볼 운반|압박 탈출/.test(ability)&&['중원','공격'].includes(pos))special+=.45;if(/중거리|슈팅/.test(ability)&&['중원','공격'].includes(pos))special+=.5;if(/지구력|왕복 활동량|오버래핑/.test(ability)&&pos!=='골키퍼')special+=.4;if(/침투|마무리/.test(ability)&&pos==='공격')special+=.5;if(/공중볼|헤더|대인 수비|수비 리더십|태클/.test(ability)&&pos==='수비')special+=.5;if(/선방|반사신경|일대일/.test(ability)&&pos==='골키퍼')special+=.65;}special=Math.min(1.5,special);
 const base=Number(player.rating??player.currentRating)||50;
 return Math.max(20,Math.min(99,base+(mean-70)*.075+special));
}
export function normalizeSquad(players=[]){return players.map(p=>{const x={...p};const override=suppliedRatingOverride(x.name);if(override){x.CA=override.CA;x.PA=override.PA;x.currentRating=override.currentRating;x.potentialRating=override.potentialRating;x.PAType=override.PAType;x.potentialRatingRange=override.potentialRatingRange;x.ratingBasis='사용자 제공 CA/PA ÷ 2';x.verified=true;}x.id=x.id&&x.id!=='seed:'?x.id:playerIdentityId(x);x.currentRating=Number(x.currentRating??x.rating)||estimateBaseRating(x);x.potentialRating=Number(x.potentialRating??x.potential)||estimatePotentialRating({...x,currentRating:x.currentRating});x.rating=x.currentRating;x.potential=x.potentialRating;x.fitness=Math.max(0,Math.min(100,Number(x.fitness??100)));const rawDetail=x.positionDetail||x.primaryPosition||(['골키퍼','스트라이커','윙어','공격형 미드필더','중앙 미드필더','수비수'].includes(x.position)?x.position:normalizePosition(x.rawPosition));x.positionDetail=rawDetail;x.primaryPosition=x.primaryPosition||x.positionDetail;x.position=broadPosition(rawDetail);x.role=x.role||defaultRole(x.positionDetail);x.secondaryPositions=Array.isArray(x.secondaryPositions)?x.secondaryPositions:[];x.hiddenConsistency=Number(x.hiddenConsistency??(55+(parseInt(stableHash(x.id),36)%41)));x.attributes={...generatedAttributes(x,x.currentRating),...(x.attributes||{})};x.specialAbilities=Array.isArray(x.specialAbilities)&&x.specialAbilities.length?x.specialAbilities.slice(0,2):[...Object.entries(x.attributes).filter(([k])=>abilityLabels[k]).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k])=>abilityLabels[k])];applyPlayerStyleProfile(x);x.injuryFrequency=x.injuryFrequency||'보통';x.season={appearances:0,goals:0,assists:0,ratingTotal:0,...(x.season||{})};return x;});}

export function getImportedClubRoster(club) { const file=rosterDatabase.clubs?.[club]; return file?.players?.length>=11?normalizeSquad(file.players):null; }
export function getAllImportedPlayers(){return Object.values(rosterDatabase.clubs||{}).flatMap(file=>(file.players||[]).map(p=>{const x={...p,league:p.league||file.league,club:p.club||file.club};const detail=x.positionDetail||x.primaryPosition||x.position;x.positionDetail=detail;x.primaryPosition=x.primaryPosition||detail;x.position=broadPosition(detail);if(!x.id||x.id==='seed:')x.id=playerIdentityId(x);return x;}));}
export function getImportedClubRosterData(club) { return rosterDatabase.clubs?.[club]||null; }
export function importedRosterSummary(){return Object.values(rosterDatabase.clubs||{}).map(x=>({club:x.club,count:x.players?.length||0,counts:x.counts||{}}));}
