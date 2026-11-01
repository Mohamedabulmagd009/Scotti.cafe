/* ===== روابط جاهزة للتعبئة — الزراير الفاضية ما بتعمل شي ===== */
var LINKS = { menu: "", map: "https://maps.app.goo.gl/f36Gpwuq58dKHBJh8", snapchat: "https://www.snapchat.com/@scottiksa?sender_web_id=6ad2c7c0-a833-47bd-91a2-5a2802860527&device_type=desktop&is_copy_url=true", tiktok: "https://www.tiktok.com/@scottiksa?is_from_webapp=1&sender_device=pc", instagram: "https://www.instagram.com/scottiksa?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==" };

document.querySelectorAll('[data-link]').forEach(function (a) {
  var url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  else { a.addEventListener('click', function (e) { e.preventDefault(); }); }
});

/* ===== قائمة الموبايل ===== */
var burger = document.querySelector('.burger');
var links = document.getElementById('nav-links');
function toggleMenu(open) {
  burger.setAttribute('aria-expanded', open);
  links.classList.toggle('open', open);
}
burger.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu(burger.getAttribute('aria-expanded') !== 'true');
});
links.addEventListener('click', function (e) { if (e.target.closest('a')) toggleMenu(false); });
document.addEventListener('click', function (e) { if (!e.target.closest('.nav-bar')) toggleMenu(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggleMenu(false); });

/* ===== أنيميشن الظهور عند السكرول ===== */
// data-stagger: يوزّع تأخير تدريجي على العناصر الداخلية
document.querySelectorAll('[data-stagger]').forEach(function (group) {
  var kids = group.dataset.animChildren
    ? Array.prototype.slice.call(group.children)
    : Array.prototype.slice.call(group.querySelectorAll('[data-anim]'));
  kids.forEach(function (el, i) {
    if (group.dataset.animChildren && !el.dataset.anim) el.dataset.anim = group.dataset.animChildren;
    el.style.setProperty('--d', (i * 0.12) + 's');
  });
});

var items = document.querySelectorAll('[data-anim]');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
} else {
  items.forEach(function (el) { el.classList.add('in'); });
}
