import {firebaseConfig,firebaseReady} from "./firebase.js";
const rows=document.getElementById("rows");
const demo=[
{name:"PUNCH_MASTER",score:1480,combo:42},{name:"NO_MISS",score:1260,combo:35},{name:"TAP_GOD",score:1120,combo:31},
{name:"PLAYER_04",score:980,combo:27},{name:"ANONYMOUS",score:850,combo:22}
];
function render(data){
 data.sort((a,b)=>b.score-a.score);
 rows.innerHTML=data.slice(0,30).map((x,i)=>`<div class="row"><span class="rank">#${i+1}</span><span class="player">${esc(x.name)}</span><span class="score">${Number(x.score).toLocaleString()}</span><span class="combo">×${x.combo}</span></div>`).join("");
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
const local=JSON.parse(localStorage.getItem("tapPunchScores")||"[]");
render([...demo,...local]);
if(firebaseReady){
 try{
  const {initializeApp}=await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js");
  const {getFirestore,collection,onSnapshot,query,orderBy,limit}=await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
  const db=getFirestore(initializeApp(firebaseConfig));
  onSnapshot(query(collection(db,"scores"),orderBy("score","desc"),limit(30)),snap=>render(snap.docs.map(d=>d.data())));
 }catch(e){console.warn(e)}
}
