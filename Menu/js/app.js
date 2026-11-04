(()=>{
"use strict";
const DATA=window.MENU_DATA;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));


/* ---- components ---- */
function price(p){
  const sizes=Array.isArray(p)?p.map(([s,v])=>`<span class="sz"><em>${s}</em><b>${v}</b></span>`).join(""):`<span class="sz"><b>${p}</b></span>`;
  return `<div class="price" aria-label="Price in Saudi riyals">${sizes}<i>SAR</i></div>`;
}
function card(it,cls=""){
  return `<article class="card rv ${cls}">
    <figure class="ph" style="margin:0"><img loading="lazy" decoding="async" width="520" height="650" src="${it.img}" alt="${esc(it.en)}"></figure>
    <div class="meta">
      <h3 class="en" lang="en">${esc(it.en)}</h3>
      ${it.ar?`<p class="ar" lang="ar" dir="rtl">${esc(it.ar)}</p>`:""}
      ${it.d1?`<p class="d1" lang="en">${esc(it.d1)}</p>`:""}${it.d2?`<p class="d2" lang="ar" dir="rtl">${esc(it.d2)}</p>`:""}
      <div class="foot"><span class="cal">${it.cal} Cal</span>${price(it.price)}</div>
    </div></article>`;
}
const cards=(items,cls)=>items.map(i=>card(i,cls)).join("");
function head(s){
  return `<div class="sec-h rv"><div class="t"><h2>${s.title}</h2><span class="ta" lang="ar" dir="rtl">${s.ar}</span></div>
    ${s.d1?`<p class="d"><span lang="en">${esc(s.d1)}</span><span lang="ar" dir="rtl">${esc(s.d2)}</span></p>`:""}</div>`;
}
function body(s,items){
  if(s.groups){
    return s.groups.map(g=>{const it=items.filter(i=>i.group===g.id);
      return `<div class="subwrap" data-g><div class="sub rv"><h3>${g.en}</h3><span lang="ar" dir="rtl">${g.ar}</span></div><div class="grid">${cards(it)}</div></div>`}).join("");
  }
  if(s.id==="iced")return `<div class="iced-grid" style="--columns:${Math.ceil(items.length/2)}">${cards(items)}</div>`;
  const L={hot:"grid",brew:"tall two",noncoffee:"list",juice:"grid",mojito:"tall"}[s.id];
  return `<div class="${L}">${cards(items)}</div>`;
}
const main=$("#menu"), chips=$("#chips");
DATA.sections.forEach(s=>{
  const items=DATA.items.filter(i=>i.sec===s.id);
  const sec=document.createElement("section");
  sec.id=s.id;sec.className="sec";sec.setAttribute("aria-labelledby",s.id+"-h");
  sec.innerHTML=`<div class="wrap">${head(s).replace("<h2>",`<h2 id="${s.id}-h">`)}${body(s,items)}</div>`;
  main.append(sec);
  chips.insertAdjacentHTML("beforeend",`<li><a href="#${s.id}" data-go="${s.id}"><b>${s.nav}</b><i lang="ar">${s.ar}</i></a></li>`);
});
$$(".rv").forEach((e,i)=>e.style.setProperty("--d",i%4));

/* ---- scroll reveal ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.05});
$$(".rv").forEach(e=>reduce?e.classList.add("in"):io.observe(e));

/* ---- smooth anchor nav ---- */
function go(id){const t=document.getElementById(id);if(!t)return;t.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});try{history.replaceState(null,"","#"+id)}catch(_){}}
document.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(!a)return;e.preventDefault();
  go(a.dataset.go)});

/* ---- scroll spy + parallax ---- */
const links=$$("#chips a"), secEls=DATA.sections.map(s=>document.getElementById(s.id)), nav=$("#nav"), himg=$("#heroPic");
let tick=false,cur="";
function onScroll(){
  const y=scrollY, h=innerHeight, off=nav.offsetHeight+Math.min(160,h*.25);
  let id="";
  secEls.forEach(s=>{if(s.getBoundingClientRect().top<=off)id=s.id});
  if(id!==cur){cur=id;links.forEach(a=>{const on=a.dataset.go===id;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current");
    if(on){const c=chips;c.scrollTo({left:a.offsetLeft-c.clientWidth/2+a.clientWidth/2,behavior:reduce?"auto":"smooth"})}})}
  if(!reduce&&y<h*1.2)himg.style.transform=`translate3d(0,${y*.12}px,0)`;
  tick=false;
}
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
})();
