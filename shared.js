const CONFIG = {
  name:       'Жумабек Есим',
  nameEn:     'Zhumabek Yessim',
  initials:   'ЖЕ',
  phone:      '+7 777 577-4405',
  phoneRaw:   '+77775774405',
  email:      'zhumabekyessim@gmail.com'
};

const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const SHARED_I18N_EN = {
  brandRole:'mechanical engineer',
  navWorks:'Portfolio', navOpt:'Engineering', navDeliv:'Deliverables', navAppr:'Approach', navCta:'Discuss a project',
  ctcEyebrow:'Contact', ctcH2:'Discuss a project',
  ctcLead:'Send a layout, sketch or brief — I will come back with an engineering assessment: how to produce the item rationally, from which materials, and what can be simplified. Working languages: Russian, Kazakh, English.',
  ctcPhone:'Phone · call or WhatsApp', ctcMail:'Email',
  footRole:'engineering development for POSM', footWorks:'Portfolio', footOpt:'Engineering', footCtc:'Contact'
};

(function(){
  const t={'name':CONFIG.name,'initials':CONFIG.initials,'phone-label':CONFIG.phone,'email-label':CONFIG.email};
  for(const[k,v]of Object.entries(t))document.querySelectorAll(`[data-cfg="${k}"]`).forEach(e=>e.textContent=v);
  const h={'phone':'tel:'+CONFIG.phoneRaw,'email':'mailto:'+CONFIG.email};
  for(const[k,v]of Object.entries(h))document.querySelectorAll(`[data-cfg-href="${k}"]`).forEach(e=>e.href=v);
})();

const I18N_RU = {};
document.querySelectorAll('[data-i]').forEach(e=>{I18N_RU[e.dataset.i]=e.innerHTML});

let LANG = localStorage.getItem('lang')==='en' ? 'en' : 'ru';

function setLang(lang){
  LANG=lang; localStorage.setItem('lang',lang);
  document.documentElement.lang=lang;
  const dict = lang==='en' ? window.PAGE_I18N_EN : I18N_RU;
  document.querySelectorAll('[data-i]').forEach(e=>{
    const v=dict[e.dataset.i]; if(v!==undefined)e.innerHTML=v;
  });
  document.querySelectorAll('[data-cfg="name"]').forEach(e=>e.textContent = lang==='en'?CONFIG.nameEn:CONFIG.name);
  document.getElementById('langBtn').textContent = lang==='en' ? 'RU' : 'EN';
  if(window.PAGE_TITLES) document.title = window.PAGE_TITLES[lang];
  if(typeof window.renderContent === 'function') window.renderContent();
}

document.getElementById('langBtn').addEventListener('click',()=>setLang(LANG==='en'?'ru':'en'));

const nav=document.getElementById('nav');
const onScroll=()=>nav.classList.toggle('stuck',scrollY>20);
addEventListener('scroll',onScroll,{passive:true});onScroll();
const burger=document.getElementById('burger'),navlinks=document.getElementById('navlinks');
burger.addEventListener('click',()=>{const o=navlinks.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
navlinks.addEventListener('click',e=>{if(e.target.tagName==='A'){navlinks.classList.remove('open');burger.setAttribute('aria-expanded','false')}});

const io=new IntersectionObserver((ents)=>{ents.forEach((en,i)=>{if(!en.isIntersecting)return;setTimeout(()=>en.target.classList.add('in'),i*60);io.unobserve(en.target)})},{threshold:0,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

document.addEventListener('click',e=>{
  const b=e.target.closest('.vid[data-yt]'); if(!b)return;
  const id=b.dataset.yt;
  const f=document.createElement('iframe');
  f.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  f.title=b.getAttribute('aria-label')||'video';
  f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  f.allowFullscreen=true;
  b.replaceChildren(f);
});
