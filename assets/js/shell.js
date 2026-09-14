/* FAKHER — centralized header, mobile menu and footer */
(function(){
'use strict';
var root=location.pathname.indexOf('/pages/')!==-1?'../':'./';
var file=location.pathname.split('/').pop()||'index.html';
var active=file==='index.html'?'home':file.replace('.html','');
var links=[['نخست','index.html','home'],['فروش','pages/sales.html','sales'],['پرو آنلاین','pages/virtual-fitting.html','virtual'],['سفارش','pages/order.html','order'],['درباره ما','pages/about.html','about'],['تماس با ما','pages/contact.html','contact']];
function href(p){return root+p}function item(x){return '<a'+(x[2]===active?' class="active"':'')+' href="'+href(x[1])+'">'+x[0]+'</a>'}function nav(a,b){return links.slice(a,b).map(item).join('')}
function shell(){
 document.querySelectorAll('header.header,.mobile-drawer,.drawer-backdrop,footer.footer').forEach(function(e){e.remove()});
 var h=document.createElement('header');h.className='header';h.innerHTML='<div class="header-inner"><nav class="nav right">'+nav(0,3)+'</nav><a class="brand" href="'+href('index.html')+'" aria-label="گروه پوشاک فاخر ایرانیان"><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"></a><nav class="nav left">'+nav(3,6)+'</nav><button class="mobile-trigger" type="button" aria-label="منوی موبایل" aria-expanded="false"><span></span><span></span></button></div>';
 document.body.insertBefore(h,document.body.firstElementChild);
 var d=document.createElement('aside');d.className='mobile-drawer';d.id='mobileDrawer';d.innerHTML='<button class="drawer-close" type="button" aria-label="بستن">×</button><img class="mobile-drawer-logo" src="'+href('assets/images/logo.png')+'" alt="فاخر"><nav>'+links.map(item).join('')+'</nav>';document.body.appendChild(d);
 var b=document.createElement('div');b.className='drawer-backdrop';b.id='drawerBackdrop';document.body.appendChild(b);
 var f=document.createElement('footer');f.className='footer';f.innerHTML='<div class="footer-inner"><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"><div class="footer-quote">«پوشش فاخر، روایتِ دقت و اصالت است.»</div><p>گروه پوشاک فاخر ایرانیان</p></div>';document.body.appendChild(f);
 var t=h.querySelector('.mobile-trigger');function toggle(force){var open=force===undefined?!d.classList.contains('open'):force;d.classList.toggle('open',open);b.classList.toggle('open',open);document.body.classList.toggle('drawer-open',open);t.setAttribute('aria-expanded',open?'true':'false');}t.onclick=function(){toggle()};d.querySelector('.drawer-close').onclick=function(){toggle(false)};b.onclick=function(){toggle(false)};d.querySelectorAll('a').forEach(function(a){a.onclick=function(){toggle(false)}});window.addEventListener('scroll',function(){h.classList.toggle('scrolled',scrollY>25)},{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();