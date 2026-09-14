/* FAKHER — centralized header, gallery, mobile menu, footer and back-to-top */
(function(){
'use strict';
var root=location.pathname.indexOf('/pages/')!==-1?'../':'./';
var file=location.pathname.split('/').pop()||'index.html';
var active=file==='index.html'?'home':file.replace('.html','');
var links=[['نخست','index.html','home'],['فروش','pages/sales.html','sales'],['پرو آنلاین','pages/virtual-fitting.html','virtual'],['سفارش','pages/order.html','order'],['درباره ما','pages/about.html','about'],['تماس با ما','pages/contact.html','contact']];
function href(p){return root+p}function item(x){return '<a'+(x[2]===active?' class="active"':'')+' href="'+href(x[1])+'">'+x[0]+'</a>'}function nav(a,b){return links.slice(a,b).map(item).join('')}
function faNumbers(value){return String(value).replace(/[0-9]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
function localizeNumbers(){
 var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(function(n){if(n.parentElement&&/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentElement.tagName))return;n.nodeValue=faNumbers(n.nodeValue)});
 document.querySelectorAll('input[placeholder],textarea[placeholder],input[aria-label],textarea[aria-label]').forEach(function(el){if(el.placeholder)el.placeholder=faNumbers(el.placeholder);if(el.getAttribute('aria-label'))el.setAttribute('aria-label',faNumbers(el.getAttribute('aria-label')))});
}
function gallery(){
 if(file!=='index.html'||document.querySelector('.fakher-gallery'))return;
 var section=document.createElement('section');section.className='fakher-gallery section';section.innerHTML='<div class="inner"><div class="gallery-head"><div><div class="eyebrow">نگارخانه فاخر</div><h2 class="section-title">پوشش، وقتی به تصویر می‌رسد</h2></div><p class="section-desc">روایتی تصویری از پارچه، دوخت، فرم و استایل؛ مجموعه‌ای از قاب‌های واقعی برای نزدیک‌تر شدن به جهان پوشاک فاخر ایرانیان.</p></div><div class="gallery-shell"><div class="gallery-stage"><div class="gallery-track"></div><button class="gallery-prev" type="button" aria-label="تصویر قبلی">‹</button><button class="gallery-next" type="button" aria-label="تصویر بعدی">›</button><div class="gallery-caption"><span class="gallery-index">۰۱</span><strong>جزئیات، تفاوت را می‌سازند.</strong><small>تدوین شده برای تجربه تصویری برند فاخر</small></div></div><div class="gallery-dots"></div></div></div>';
 var data=[
  ['https://images.unsplash.com/photo-1509112552557-8eb3dab85cfc?auto=format&fit=crop&w=1500&q=88','وقار در فرم','استایل رسمی و برش دقیق'],
  ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1500&q=88','خطوط کت','فرم، تناسب و ساختار'],
  ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1500&q=88','پارچه و بافت','انتخاب متریال برای پوشش ماندگار'],
  ['https://images.unsplash.com/photo-1506629905607-d9f297d5f6b3?auto=format&fit=crop&w=1500&q=88','استایل معاصر','ترکیب اصالت و نگاه امروز'],
  ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1500&q=88','پوشش بانوان','فرم‌های رسمی، پوشیده و شیک'],
  ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1500&q=88','بافت پارچه','لمس بصری کیفیت و ظرافت']
 ];
 var track=section.querySelector('.gallery-track'),dots=section.querySelector('.gallery-dots'),current=0,timer;
 data.forEach(function(x,i){var s=document.createElement('figure');s.className='gallery-slide';s.innerHTML='<img src="'+x[0]+'" alt="'+x[1]+'" loading="'+(i?'lazy':'eager')+'"><figcaption><b>'+x[1]+'</b><span>'+x[2]+'</span></figcaption>';track.appendChild(s);var d=document.createElement('button');d.type='button';d.className='gallery-dot';d.setAttribute('aria-label','نمایش تصویر '+(i+1));d.onclick=function(){go(i,true)};dots.appendChild(d)});
 function go(n,manual){current=(n+data.length)%data.length;track.style.transform='translateX('+(-current*100)+'%)';section.querySelector('.gallery-index').textContent=faNumbers(String(current+1).padStart(2,'0'));section.querySelector('.gallery-caption strong').textContent=data[current][1]+'؛ '+data[current][2];section.querySelectorAll('.gallery-dot').forEach(function(d,i){d.classList.toggle('active',i===current)});if(manual){restart()}}
 function restart(){clearInterval(timer);timer=setInterval(function(){go(current+1,false)},5200)}
 section.querySelector('.gallery-prev').onclick=function(){go(current-1,true)};section.querySelector('.gallery-next').onclick=function(){go(current+1,true)};section.querySelector('.gallery-stage').addEventListener('mouseenter',function(){clearInterval(timer)});section.querySelector('.gallery-stage').addEventListener('mouseleave',restart);go(0,false);restart();
 var target=document.querySelector('.contact')||document.querySelector('footer.footer');if(target)target.parentNode.insertBefore(section,target);else document.body.appendChild(section);
}
function backToTop(){
 var old=document.getElementById('toTop');if(old)old.remove();
 var t=document.createElement('button');t.type='button';t.id='toTop';t.className='to-top';t.setAttribute('aria-label','بازگشت به بالا');t.innerHTML='<span>↑</span>';document.body.appendChild(t);
 function update(){t.classList.toggle('show',window.scrollY>420)}
 t.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};window.addEventListener('scroll',update,{passive:true});update();
}
function shell(){
 document.querySelectorAll('header.header,.mobile-drawer,.drawer-backdrop,footer.footer').forEach(function(e){e.remove()});
 var h=document.createElement('header');h.className='header';h.innerHTML='<div class="header-inner"><nav class="nav right">'+nav(0,3)+'</nav><a class="brand" href="'+href('index.html')+'" aria-label="گروه پوشاک فاخر ایرانیان"><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"></a><nav class="nav left">'+nav(3,6)+'</nav><button class="mobile-trigger" type="button" aria-label="منوی موبایل" aria-expanded="false"><span></span><span></span></button></div>';
 document.body.insertBefore(h,document.body.firstElementChild);
 var d=document.createElement('aside');d.className='mobile-drawer';d.id='mobileDrawer';d.innerHTML='<button class="drawer-close" type="button" aria-label="بستن">×</button><img class="mobile-drawer-logo" src="'+href('assets/images/logo.png')+'" alt="فاخر"><nav>'+links.map(item).join('')+'</nav>';document.body.appendChild(d);
 var b=document.createElement('div');b.className='drawer-backdrop';b.id='drawerBackdrop';document.body.appendChild(b);
 var f=document.createElement('footer');f.className='footer';f.innerHTML='<div class="footer-inner"><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"><div class="footer-quote">«فاخر بپوشید؛ اصالت، از جزئیات آغاز می‌شود.»</div><p>گروه پوشاک فاخر ایرانیان</p></div>';document.body.appendChild(f);
 var t=h.querySelector('.mobile-trigger');function toggle(force){var open=force===undefined?!d.classList.contains('open'):force;d.classList.toggle('open',open);b.classList.toggle('open',open);document.body.classList.toggle('drawer-open',open);t.setAttribute('aria-expanded',open?'true':'false');}t.onclick=function(){toggle()};d.querySelector('.drawer-close').onclick=function(){toggle(false)};b.onclick=function(){toggle(false)};d.querySelectorAll('a').forEach(function(a){a.onclick=function(){toggle(false)}});window.addEventListener('scroll',function(){h.classList.toggle('scrolled',scrollY>25)},{passive:true});
 backToTop();gallery();localizeNumbers();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();
