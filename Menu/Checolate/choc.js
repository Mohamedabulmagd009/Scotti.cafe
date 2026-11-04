(function(){
const C=window.SITE_CONFIG, num=C.whatsappNumber.replace(/\D/g,'');
const wa=msg=>`https://wa.me/${num}${msg?'?text='+encodeURIComponent(msg):''}`;
const I={
 whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.4A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zM8.7 7.8c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.600-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.100-.4-2-1.200-.7-.7-1.200-1.500-1.300-1.800-.1-.2 0-.4.1-.5l.4-.4.3-.5v-.5l-.7-1.700c-.2-.4-.4-.4-.6-.4z"/></svg>',
 instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.500v-9A5.5 5.500 0 0 1 7.500 2zm0 1.800A3.700 3.700 0 0 0 3.800 7.500v9a3.700 3.700 0 0 0 3.700 3.700h9a3.700 3.700 0 0 0 3.700-3.700v-9a3.700 3.700 0 0 0-3.700-3.700zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.800a3.200 3.200 0 1 0 0 6.400 3.200 3.200 0 0 0 0-6.400zm5.200-2.600a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400z"/></svg>',
 snapchat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 0 4.800 2.200 4.800 5v1.600c.3.200.8.400 1.400.4.400 0 .8.300.8.700 0 .6-1 .9-1.700 1.100.3.900 1.300 1.900 2.400 2.200.3.100.4.400.2.600-.4.500-1.300.6-1.900.7-.1.300-.1.600-.3.700-.4.200-1.100-.1-1.900.1-.9.200-1.500 1.500-3.100 1.500s-2.200-1.300-3.100-1.500c-.8-.2-1.500.1-1.900-.1-.2-.1-.2-.4-.3-.7-.6-.1-1.500-.2-1.900-.7-.2-.2-.1-.5.200-.6 1.100-.3 2.100-1.300 2.400-2.200-.7-.2-1.700-.5-1.700-1.100 0-.4.400-.7.800-.7.600 0 1.100-.2 1.400-.4V8c0-2.800 1.800-5 4.800-5z"/></svg>',
 tiktok:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.600 5.800A4.300 4.300 0 0 1 15.500 3h-3.100v12.400a2.600 2.600 0 1 1-2.600-2.600c.3 0 .5 0 .8.100V9.700a5.700 5.700 0 1 0 4.900 5.600V9a7.400 7.400 0 0 0 4.300 1.400V7.300a4.300 4.300 0 0 1-3.200-1.500z"/></svg>'};
const labels={instagram:'انستقرام',snapchat:'سناب شات',tiktok:'تيك توك',whatsapp:'واتساب'};
const socialImages={
 instagram:'Image/skill-icons_instagram.png',
 snapchat:'Image/selfhst_snapchat.png',
 tiktok:'Image/selfhst_tiktok.png',
 whatsapp:'Image/whatsapp.svg'
};
// social
document.querySelectorAll('[data-social]').forEach(ul=>{
 ['instagram','snapchat','tiktok','whatsapp'].forEach(k=>{
  const href=k==='whatsapp'?(C.social.whatsapp||wa()):C.social[k];
  const icon=`<img src="${socialImages[k]}" alt="" width="30" height="30">`;
  ul.insertAdjacentHTML('beforeend',`<li><a href="${href}" target="_blank" rel="noopener" aria-label="${labels[k]}">${icon}</a></li>`);
 });
});
// products
const grid=document.getElementById('choc-grid');
C.products.forEach(p=>{
 const url=wa(C.messageTemplate.replace('{name}',p.name));
 grid.insertAdjacentHTML('beforeend',`<figure class="choc-card reveal"><div class="choc-card__img"><img src="${p.image}" alt="${p.name}" loading="lazy" width="800" height="1000"></div><a class="btn btn-primary choc-wa" href="${url}" target="_blank" rel="noopener">اطلبه الآن</a></figure>`);
});
grid.querySelectorAll('img').forEach(i=>i.complete?i.classList.add('loaded'):i.addEventListener('load',()=>i.classList.add('loaded')));
// fab
const fab=document.getElementById('choc-fab');fab.href=wa();fab.innerHTML=I.whatsapp;
// reveal
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>o.observe(e))}
else els.forEach(e=>e.classList.add('in'));
})();
