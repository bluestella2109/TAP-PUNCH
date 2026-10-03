const input=document.getElementById("imageInput"), preview=document.getElementById("preview");
document.getElementById("startBtn").onclick=()=>location.href="game.html";
document.getElementById("rankBtn").onclick=()=>location.href="ranking.html";
document.getElementById("uploadBtn").onclick=()=>input.click();
input.onchange=()=>{
 const f=input.files?.[0]; if(!f)return;
 const r=new FileReader(); r.onload=e=>{localStorage.setItem("tapPunchImage",e.target.result); show(e.target.result)}; r.readAsDataURL(f);
};
function show(src){preview.innerHTML=`<img src="${src}" alt=""><div class="crosshair"></div>`}
const saved=localStorage.getItem("tapPunchImage"); if(saved)show(saved);
