// 2026-27 calendar requested for Touchline Manager Career.
// day is measured from 2026-07-01. Dates are game-calendar anchors; competition draw/qualification
// logic remains responsible for determining the actual opponent and entry round.
const d = (month, day) => { const year = month >= 7 ? 2026 : 2027; return Math.round((Date.UTC(year, month-1, day)-Date.UTC(2026,6,1))/86400000); };
const event=(date,competition,round,kind='cup')=>({day:d(...date),date:`${date[0]>=7?2026:2027}.${String(date[0]).padStart(2,'0')}.${String(date[1]).padStart(2,'0')}`,competition,round,kind});
export const INTERNATIONAL_BREAKS=[{start:d(9,21),end:d(10,6),label:'9~10월 A매치 휴식기'},{start:d(11,9),end:d(11,17),label:'11월 A매치 휴식기'},{start:d(3,22),end:d(3,30),label:'3월 A매치 휴식기'}];
export const LEAGUE_BREAK_ROUNDS={프리미어리그:[5,10,30],라리가:[7,12,29],분데스리가:[4,9,27],세리에A:[4,11,29],리그1:[5,10,27]};
export const EUROPEAN_DATES=[
 event([8,12],'UEFA 슈퍼컵','결승','supercup'),
 ...[[9,8,'MD1 · 9월 8~10일'],[10,13,'MD2 · 10월 13~15일'],[10,20,'MD3 · 10월 20~22일'],[11,3,'MD4 · 11월 3~5일'],[11,24,'MD5 · 11월 24~26일'],[12,8,'MD6 · 12월 8~10일'],[1,19,'MD7 · 1월 19~21일'],[1,27,'MD8 · 1월 27~28일']].map(([m,day,r])=>event([m,day],'챔피언스리그',r,'uefa')),
 ...[[9,16,'MD1 · 9월 16~17일'],[10,13,'MD2 · 10월 13~15일'],[10,20,'MD3 · 10월 20~22일'],[11,3,'MD4 · 11월 3~5일'],[11,24,'MD5 · 11월 24~26일'],[12,8,'MD6 · 12월 8~10일'],[1,19,'MD7 · 1월 19~21일'],[1,27,'MD8 · 1월 27~28일']].map(([m,day,r])=>event([m,day],'유로파리그',r,'uefa')),
 ...[[10,13,'MD1 · 10월 13~15일'],[10,20,'MD2 · 10월 20~22일'],[11,3,'MD3 · 11월 3~5일'],[11,24,'MD4 · 11월 24~26일'],[12,8,'MD5 · 12월 8~10일'],[12,17,'MD6 · 12월 17일']].map(([m,day,r])=>event([m,day],'컨퍼런스리그',r,'uefa')),
 ...[[2,16,'플레이오프 1차전'],[2,17,'플레이오프 1차전'],[2,18,'플레이오프 1차전'],[2,23,'플레이오프 2차전'],[2,24,'플레이오프 2차전'],[2,25,'플레이오프 2차전'],[3,9,'16강 1차전'],[3,10,'16강 1차전'],[3,11,'16강 1차전'],[3,16,'16강 2차전'],[3,17,'16강 2차전'],[3,18,'16강 2차전'],[4,6,'8강 1차전'],[4,7,'8강 1차전'],[4,8,'8강 1차전'],[4,13,'8강 2차전'],[4,14,'8강 2차전'],[4,15,'8강 2차전'],[4,27,'4강 1차전'],[4,28,'4강 1차전'],[4,29,'4강 1차전'],[5,4,'4강 2차전'],[5,5,'4강 2차전'],[5,6,'4강 2차전']].flatMap(([m,day,r])=>['챔피언스리그','유로파리그','컨퍼런스리그'].map(c=>event([m,day],c,r,'uefa'))),
 event([5,26],'유로파리그','결승','final'),event([6,2],'컨퍼런스리그','결승','final'),event([6,5],'챔피언스리그','결승','final')
];
export const DOMESTIC_CUPS={
 잉글랜드:[event([8,16],'커뮤니티 실드','결승','supercup'),event([8,26],'카라바오컵','2라운드'),event([9,9],'카라바오컵','3라운드'),event([9,16],'카라바오컵','3라운드 추가 경기'),event([10,28],'카라바오컵','4라운드'),event([12,16],'카라바오컵','5라운드'),event([1,13],'카라바오컵','4강 1차전'),event([2,3],'카라바오컵','4강 2차전'),event([3,21],'카라바오컵','결승','final'),event([11,7],'FA컵','1라운드'),event([12,5],'FA컵','2라운드'),event([1,9],'FA컵','3라운드'),event([1,10],'FA컵','3라운드 추가 경기'),event([2,13],'FA컵','4라운드'),event([2,14],'FA컵','4라운드 추가 경기'),event([3,6],'FA컵','5라운드'),event([3,7],'FA컵','5라운드 추가 경기'),event([4,3],'FA컵','8강'),event([4,4],'FA컵','8강 추가 경기'),event([4,24],'FA컵','4강'),event([4,25],'FA컵','4강 추가 경기'),event([5,22],'FA컵','결승','final')],
 스페인:[event([2,2],'수페르코파 데 에스파냐','준결승 1','supercup'),event([2,3],'수페르코파 데 에스파냐','준결승 2','supercup'),event([2,6],'수페르코파 데 에스파냐','결승','final'),event([4,24],'코파 델 레이','결승','final')],
 독일:[event([8,22],'프란츠 베켄바워 슈퍼컵','결승','supercup'),event([8,21],'DFB 포칼','1라운드'),event([8,24],'DFB 포칼','1라운드 추가 경기'),event([9,1],'DFB 포칼','1라운드 연기 경기'),event([9,2],'DFB 포칼','1라운드 연기 경기'),event([10,27],'DFB 포칼','2라운드'),event([10,28],'DFB 포칼','2라운드 추가 경기'),event([12,1],'DFB 포칼','16강'),event([12,2],'DFB 포칼','16강 추가 경기'),event([2,23],'DFB 포칼','8강'),event([3,9],'DFB 포칼','8강 추가 경기'),event([3,10],'DFB 포칼','8강 추가 경기'),event([4,20],'DFB 포칼','4강'),event([4,21],'DFB 포칼','4강 추가 경기'),event([5,29],'DFB 포칼','결승','final')],
 이탈리아:[event([12,22],'수페르코파 이탈리아나','인터 밀란 vs 라치오 · 결승','supercup'),event([8,9],'코파 이탈리아','예선'),event([8,16],'코파 이탈리아','64강'),event([9,2],'코파 이탈리아','32강'),event([12,2],'코파 이탈리아','16강'),event([12,16],'코파 이탈리아','16강 추가 경기'),event([2,3],'코파 이탈리아','8강'),event([2,10],'코파 이탈리아','8강 추가 경기'),event([3,3],'코파 이탈리아','4강 1차전'),event([4,21],'코파 이탈리아','4강 2차전'),event([5,19],'코파 이탈리아','결승','final')],
 프랑스:[event([8,16],'트로페 데 샹피옹','결승','supercup'),{...event([5,15],'쿠프 드 프랑스','결승 · 날짜 미정','final'),date:'미정',dateStatus:'미정'}]
};
export const ALL_CUP_EVENTS=Object.values(DOMESTIC_CUPS).flat().sort((a,b)=>a.day-b.day);
export const INTERNATIONAL_EVENTS=[event([9,21],'A매치 휴식기','9월 21일~10월 6일 · 국가대표 일정','international'),event([11,9],'A매치 휴식기','11월 9일~17일 · 국가대표 일정','international'),event([3,22],'A매치 휴식기','2027년 3월 22일~30일 · 국가대표 일정','international')];
export const COMPLETE_2026_27_CALENDAR=[...EUROPEAN_DATES,...ALL_CUP_EVENTS,...INTERNATIONAL_EVENTS].sort((a,b)=>a.day-b.day);
export function calendarForCountry(country='잉글랜드'){return [...(DOMESTIC_CUPS[country]||[]),...EUROPEAN_DATES].sort((a,b)=>a.day-b.day);}

export function calendarForSeason(season=1){const startYear=2026+Math.max(0,Number(season||1)-1);return COMPLETE_2026_27_CALENDAR.map(item=>{const match=String(item.date||'').match(/^(\d{4})\.(\d{2})\.(\d{2})$/);if(!match)return {...item,day:item.day+Math.round((Date.UTC(startYear,6,1)-Date.UTC(2026,6,1))/86400000)};const month=Number(match[2]),day=Number(match[3]),year=month>=7?startYear:startYear+1;const offset=Math.round((Date.UTC(year,month-1,day)-Date.UTC(startYear,6,1))/86400000);return {...item,day:offset,date:`${year}.${match[2]}.${match[3]}`,round:String(item.round||'').replace(/2027년/g,`${startYear+1}년`)};});}
