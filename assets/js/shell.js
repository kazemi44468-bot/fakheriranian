/* FAKHER — one shared HTML shell for all pages */
(function(){
  'use strict';
  var root=location.pathname.indexOf('/pages/')!==-1?'../':'./';
  var file=location.pathname.split('/').pop()||'index.html';
  var active=file==='index.html'?'home':file.replace('.html','');
  var links=[
    ['نخست','index.html','home'],['فروش','pages/sales.html','sales'],['پرو آنلاین','pages/virtual-fitting.html','virtual'],
    ['سفارش','pages/order.html','order'],['درباره ما','pages/about.html','about'],['تماس با ما','pages/contact.html','contact']
  ];
  function href(path){return root+path;}
  function item(x){return '<a'+(x[2]===active?' class="active"':'')+' href="'+href(x[1])+'">'+x[0]+'</a>';}
  function nav(start,end){return links.slice(start,end).map(item).join('');}
  function shell(){
    document.querySelectorAll('header.header,.mobile-drawer,.drawer-backdrop,footer.footer').forEach(function(el){el.remove();});
    var header=document.createElement('header'); header.className='header';
    header.innerHTML='<div class="header-inner"><nav class="nav right">'+nav(0,3)+'</nav><a class="brand" href="'+href('index.html')+'" aria-label="گروه پوشاک فاخر ایرانیان"><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"></a><nav class="nav left">'+nav(3,6)+'</nav><button class="mobile-trigger" type="button" aria-label="منوی موبایل" aria-expanded="false"></button></div>';
    document.body.insertBefore(header,document.body.firstElementChild);
    var drawer=document.createElement('aside'); drawer.className='mobile-drawer'; drawer.id='mobileDrawer'; drawer.setAttribute('aria-label','منوی موبایل');
    drawer.innerHTML='<button class="drawer-close" type="button" aria-label="بستن">×</button><img class="mobile-drawer-logo" src="'+href('assets/images/logo.png')+'" alt="فاخر"><nav>'+links.map(item).join('')+'</nav>';
    document.body.appendChild(drawer);
    var backdrop=document.createElement('div'); backdrop.className='drawer-backdrop'; backdrop.id='drawerBackdrop'; document.body.appendChild(backdrop);
    var footer=document.createElement('footer'); footer.className='footer';
    footer.innerHTML='<div class="footer-grid"><div><img src="'+href('assets/images/logo.png')+'" alt="گروه پوشاک فاخر ایرانیان"><h3>گروه پوشاک فاخر ایرانیان</h3><p>طراحی، انتخاب پارچه و دوخت دقیق برای پوشش رسمی، سازمانی و شخصی.</p></div></div><div class="footer-bottom">© گروه پوشاک فاخر ایرانیان · کلیه حقوق محفوظ است.</div>';
    document.body.appendChild(footer);
    var trigger=header.querySelector('.mobile-trigger');
    function toggle(force){var open=force===undefined?!drawer.classList.contains('open'):force;drawer.classList.toggle('open',open);backdrop.classList.toggle('open',open);document.body.classList.toggle('drawer-open',open);trigger.setAttribute('aria-expanded',open?'true':'false');}
    trigger.addEventListener('click',function(){toggle();}); drawer.querySelector('.drawer-close').addEventListener('click',function(){toggle(false);}); backdrop.addEventListener('click',function(){toggle(false);});
    drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false);});});
    window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>30);},{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();