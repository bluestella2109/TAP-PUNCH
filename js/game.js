import {firebaseConfig,firebaseReady} from "./firebase.js";
let fb=null;
if(firebaseReady){
 const {initializeApp}=await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js");
 const {getFirestore}=await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
 fb={db:getFirestore(initializeApp(firebaseConfig)),addDoc:(await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js")).addDoc,collection:(await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js")).collection};
}
const $=id=>document.getElementById(id), target=$("target"), img=$("targetImg"), arena=$("arena"), effects=$("effects");
let score=0,hits=0,combo=0,maxCombo=0,time=30,running=false,mode="tap",timer;
const saved=localStorage.getItem("tapPunchImage");
img.src=saved||"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#171720"/><text x="200" y="190" fill="#666" font-size="20" text-anchor="middle">YOUR TARGET</text><text x="200" y="225" fill="#444" font-size="12" text-anchor="middle">UPLOAD AN IMAGE</text></svg>`);
document.querySelectorAll(".mode-switch button").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll(".mode-switch button").forEach(x=>x.classList.toggle("active",x===b))});
$("quit").onclick=()=>location.href="index.html";
$("go").onclick=start;
function start(){
 $("startOverlay").style.display="none"; let n=3;$("countdown").textContent=n;$("countdown").classList.add("show");
 const c=setInterval(()=>{n--;if(n<=0){clearInterval(c);running=true;beginTimer()}else{$("countdown").textContent=n;$("countdown").classList.remove("show");void $("countdown").offsetWidth;$("countdown").classList.add("show")}},800);
}
function beginTimer(){timer=setInterval(()=>{time=Math.max(0,time-.1);$("time").textContent=time.toFixed(1);if(time<=0)finish()},100)}
function finish(){if(!running)return;running=false;clearInterval(timer);$("finalScore").textContent=score.toLocaleString();$("finalHits").textContent=hits;$("finalCombo").textContent=maxCombo;$("result").classList.remove("hidden")}
target.addEventListener("pointerdown",e=>{
 if(!running)return;
 e.preventDefault(); hit(e.clientX,e.clientY);
});
function hit(x,y){
 hits++;combo++;maxCombo=Math.max(maxCombo,combo);
 const pts=mode==="punch"?15:10; const critical=Math.random()<.09;
 score+=pts*(critical?3:1)+Math.min(combo,50);
 $("score").textContent=String(score).padStart(6,"0");$("combo").textContent=combo;
 const rect=arena.getBoundingClientRect(), px=x-rect.left,py=y-rect.top;
 burst(px,py,critical);
 target.classList.remove("punch-hit");void target.offsetWidth;target.classList.add("punch-hit");
 $("arena").classList.remove("shake");void $("arena").offsetWidth;$("arena").classList.add("shake");
 $("flash").classList.add("on");setTimeout(()=>$("flash").classList.remove("on"),120);
 if(combo%10===0||critical) word(px,py,critical?"CRITICAL!":"COMBO x"+combo);
 setTimeout(()=>{if(running)moveTarget()},90);
}
function moveTarget(){
 const pad=80,w=arena.clientWidth,h=arena.clientHeight;
 const x=pad+Math.random()*Math.max(10,w-pad*2),y=150+Math.random()*Math.max(10,h-230);
 target.style.left=x+"px";target.style.top=y+"px";
}
function burst(x,y,critical){
 const ring=document.createElement("div");ring.className="ring";ring.style.left=x+"px";ring.style.top=y+"px";effects.append(ring);
 for(let i=0;i<(critical?26:14);i++){let s=document.createElement("div");s.className="spark";s.style.left=x+"px";s.style.top=y+"px";s.style.setProperty("--r",`${Math.random()*360}deg`);s.style.height=(20+Math.random()*70)+"px";effects.append(s);setTimeout(()=>s.remove(),600)}
 setTimeout(()=>ring.remove(),700);
}
function word(x,y,t){const d=document.createElement("div");d.className="word";d.textContent=t;d.style.left=x+"px";d.style.top=y+"px";effects.append(d);setTimeout(()=>d.remove(),750)}
$("again").onclick=()=>location.reload();
$("saveScore").onclick=async()=>{
 const name=($("playerName").value.trim()||"ANONYMOUS").slice(0,16);
 const record={name,score,hits,combo:maxCombo,createdAt:Date.now()};
 const local=JSON.parse(localStorage.getItem("tapPunchScores")||"[]");local.push(record);localStorage.setItem("tapPunchScores",JSON.stringify(local.slice(-100)));
 if(fb){try{await fb.addDoc(fb.collection(fb.db,"scores"),record)}catch(e){console.error(e)}}
 location.href="ranking.html";
};