/* Bridgeton Strong - Halloween theme (critters + date gate). Upload to /sites/BridgetonStrong/SiteAssets/.
   Active Oct 25 - Nov 1 inclusive; test with ?halloween=1 / ?halloween=0. Pairs with the <style> block on the page. */
(function(){
  'use strict';
  if(window.__bsHalloween) return; window.__bsHalloween=true;   // guard against double-loading

  /* ===== Date gate: Oct 25 through Nov 1 inclusive, visitor's local time ===== */
  function inWindow(dt){var m=dt.getMonth(), d=dt.getDate(); return (m===9&&d>=25)||(m===10&&d===1);}
  var qs=(location.search.match(/[?&]halloween=([01])/)||[])[1];
  var active = qs==='1' ? true : qs==='0' ? false : inWindow(new Date());
  if(!active) return;

  var root=document.documentElement;
  root.classList.add('bs-halloween');
  /* SharePoint's page scripts can reset <html class> after load, which would silently switch the theme off.
     Put the class back whenever it goes missing. */
  try{
    new MutationObserver(function(){
      if(!root.classList.contains('bs-halloween')) root.classList.add('bs-halloween');
    }).observe(root,{attributes:true,attributeFilter:['class']});
  }catch(e){}

  /* Spooky title font (falls back to Chiller/fantasy if blocked) */
  try{
    var f=document.createElement('link'); f.rel='stylesheet';
    f.href='https://fonts.googleapis.com/css2?family=Creepster&display=swap';
    document.head.appendChild(f);
  }catch(e){}

  /* ===== Critters ===== */
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FREQ=3;   // 1 = calm, 3 = busy (a critter every ~5-9 seconds), 5 = swarm
  var layer=document.createElement('div'); layer.id='bs-hw-layer'; layer.setAttribute('aria-hidden','true');
  document.body.appendChild(layer);

  var W=function(){return window.innerWidth}, H=function(){return window.innerHeight};
  function rnd(a,b){return a+Math.random()*(b-a)}
  function mk(html,w,h){
    var s=document.createElementNS('http://www.w3.org/2000/svg','svg');
    s.setAttribute('viewBox','0 0 '+w+' '+h); s.setAttribute('width',w); s.setAttribute('height',h);
    s.innerHTML=html; layer.appendChild(s); return s;
  }


  /* ===== "Ghosts busted" counter in the title bar (remembered per visitor) ===== */
  var KEY='bsHalloweenBusted', busted=0;
  try{busted=parseInt(localStorage.getItem(KEY),10)||0}catch(e){}
  var st=document.createElement('style');
  st.textContent='#bs-hw-count{position:fixed;top:9px;left:230px;z-index:2147483001;pointer-events:none;'+
    'font:600 13px "Segoe UI",system-ui,sans-serif;color:#fff;padding:4px 12px 4px 10px;border-radius:999px;'+
    'background:rgba(0,0,0,.55);border:1px solid #ff7a18;box-shadow:0 0 10px rgba(255,122,24,.45);white-space:nowrap}'+
    '#bs-hw-count b{color:#ffb347;font-variant-numeric:tabular-nums}'+
    '@media (max-width:1100px){#bs-hw-count{display:none}}';
  document.head.appendChild(st);
  var pill=document.createElement('div'); pill.id='bs-hw-count';
  document.body.appendChild(pill);
  function showCount(bump){
    pill.innerHTML='\uD83D\uDC7B Ghosts busted: <b>'+busted+'</b>';
    if(bump&&!reduce) pill.animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:300,easing:'ease-out'});
  }
  showCount(false);
  function bust(){
    busted++; try{localStorage.setItem(KEY,String(busted))}catch(e){}
    showCount(true);
  }

  /* Click/tap a critter: it vanishes in a puff of eerie smoke */
  var SMOKE=['rgba(190,150,255,.55)','rgba(140,90,210,.5)','rgba(235,225,250,.4)','rgba(255,150,60,.35)'];
  function gone(n){return function(){n.remove()}}
  function poof(el,anim){
    var r=el.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, size=Math.max(r.width,r.height);
    anim.pause(); el.style.pointerEvents='none'; bust();
    el.animate([{opacity:1,filter:'blur(0px)',scale:1},{opacity:0,filter:'blur(8px)',scale:1.35}],
      {duration:380,easing:'ease-out',fill:'forwards'}).onfinish=gone(el);
    if(reduce) return;
    for(var i=0;i<9;i++){
      var d=document.createElement('div'), sz=size*rnd(.45,.8), a=Math.random()*Math.PI*2, dist=rnd(.3,.9)*size;
      d.className='bs-smoke';
      d.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(cx-sz/2)+'px;top:'+(cy-sz/2)+'px;background:radial-gradient(circle,'+SMOKE[Math.floor(Math.random()*SMOKE.length)]+' 0%,rgba(80,40,140,0) 70%)';
      layer.appendChild(d);
      var x=Math.cos(a)*dist, y=Math.sin(a)*dist-rnd(20,70);
      d.animate([
        {transform:'translate(0,0) scale(.3)',opacity:0,filter:'blur(2px)'},
        {transform:'translate('+x*.5+'px,'+y*.5+'px) scale(1)',opacity:1,filter:'blur(5px)',offset:.3},
        {transform:'translate('+x+'px,'+y+'px) scale(1.9)',opacity:0,filter:'blur(14px)'}
      ],{duration:rnd(900,1400),easing:'ease-out',delay:rnd(0,120)}).onfinish=gone(d);
    }
    for(var j=0;j<6;j++){
      var sp=document.createElement('div'), a2=Math.random()*Math.PI*2, ds=rnd(.6,1.3)*size;
      sp.className='bs-smoke';
      sp.style.cssText='width:5px;height:5px;left:'+(cx-2)+'px;top:'+(cy-2)+'px;background:#ffb347;box-shadow:0 0 8px #ff7a18';
      layer.appendChild(sp);
      sp.animate([{transform:'translate(0,0)',opacity:1},{transform:'translate('+Math.cos(a2)*ds+'px,'+(Math.sin(a2)*ds-30)+'px)',opacity:0}],
        {duration:rnd(500,900),easing:'ease-out'}).onfinish=gone(sp);
    }
  }
  function done(el,anim){
    anim.onfinish=gone(el);
    el.addEventListener('pointerdown',function(e){e.preventDefault();poof(el,anim)},{once:true});
  }

  function bat(){
    var sc=rnd(.8,1.5), el=mk(
      '<g fill="#14001f" stroke="#9d4edd" stroke-width="1.2">'+
      '<path class="bs-wing" d="M32 14 C26 2 12 2 0 10 C8 10 10 16 14 20 C18 16 24 18 32 22Z"/>'+
      '<path class="bs-wing" d="M32 14 C38 2 52 2 64 10 C56 10 54 16 50 20 C46 16 40 18 32 22Z"/>'+
      '<ellipse cx="32" cy="17" rx="5" ry="8"/><path d="M28 10 L29 4 L32 9 L35 4 L36 10Z"/></g>'+
      '<circle cx="30" cy="14" r="1.2" fill="#ff7a18"/><circle cx="34" cy="14" r="1.2" fill="#ff7a18"/>',64,32);
    el.style.width=64*sc+'px'; el.style.height=32*sc+'px';
    var ltr=Math.random()<.5, y0=rnd(80,H()*.7), y1=y0+rnd(-160,160), dur=rnd(5500,8500);
    var x0=ltr?-100:W()+100, x1=ltr?W()+100:-100, mid=(x0+x1)/2, fl='scaleX('+(ltr?1:-1)+')';
    done(el,el.animate([
      {transform:'translate('+x0+'px,'+y0+'px) '+fl},
      {transform:'translate('+(x0+(mid-x0)*.5)+'px,'+(y0+(y1-y0)*.5-60)+'px) '+fl,offset:.3},
      {transform:'translate('+mid+'px,'+(y0+(y1-y0)*.5+50)+'px) '+fl,offset:.6},
      {transform:'translate('+x1+'px,'+y1+'px) '+fl}
    ],{duration:dur,easing:'linear'}));
  }

  function ghost(){
    var sc=rnd(.9,1.6), el=mk(
      '<path d="M4 46V20a16 16 0 0 1 32 0v26l-5.3-4-5.4 4-5.3-4-5.3 4-5.4-4z" fill="#f6eefc" fill-opacity=".88"/>'+
      '<ellipse cx="14" cy="20" rx="2.6" ry="3.6" fill="#1a0b2e"/><ellipse cx="26" cy="20" rx="2.6" ry="3.6" fill="#1a0b2e"/>'+
      '<ellipse cx="20" cy="30" rx="3" ry="4" fill="#1a0b2e"/>',40,48);
    el.style.width=40*sc+'px'; el.style.height=48*sc+'px';
    el.style.filter='drop-shadow(0 0 10px rgba(180,120,255,.7))';
    var ltr=Math.random()<.5, base=rnd(100,H()*.65), dur=rnd(9000,14000), n=8, fr=[];
    for(var i=0;i<=n;i++){
      var t=i/n, x=ltr?-80+(W()+160)*t:W()+80-(W()+160)*t;
      fr.push({transform:'translate('+x+'px,'+(base+Math.sin(t*Math.PI*3)*45)+'px)',opacity:(i===0||i===n)?0:.85});
    }
    done(el,el.animate(fr,{duration:dur,easing:'linear'}));
  }

  function spider(){
    var sc=rnd(.9,1.4), len=rnd(120,Math.min(380,H()*.55)), x=rnd(40,Math.max(60,W()-80)), legs='';
    for(var i=0;i<4;i++){var a=6+i*7;
      legs+='<path d="M20 '+(len+14)+' q-12 '+(-14+i*4)+' -17 '+(a-10)+' M20 '+(len+14)+' q12 '+(-14+i*4)+' 17 '+(a-10)+'" fill="none" stroke="#14001f" stroke-width="2"/>';}
    var el=mk('<line x1="20" y1="0" x2="20" y2="'+(len+8)+'" stroke="#c9b5e6" stroke-width="1"/>'+legs+
      '<circle cx="20" cy="'+(len+16)+'" r="9" fill="#14001f" stroke="#9d4edd" stroke-width="1.2"/>'+
      '<circle cx="20" cy="'+(len+10)+'" r="5" fill="#14001f" stroke="#9d4edd" stroke-width="1.2"/>'+
      '<circle cx="18" cy="'+(len+9)+'" r="1.2" fill="#ff7a18"/><circle cx="22" cy="'+(len+9)+'" r="1.2" fill="#ff7a18"/>',40,len+40);
    el.style.width=40*sc+'px'; el.style.height=(len+40)*sc+'px';
    var top='translate('+x+'px,'+(-(len+40)*sc)+'px)', low='translate('+x+'px,0px)';
    done(el,el.animate([{transform:top},{transform:low,offset:.25,easing:'ease-out'},
      {transform:'translate('+x+'px,-14px)',offset:.45},{transform:low,offset:.65},
      {transform:low,offset:.8},{transform:top}],{duration:7000,easing:'ease-in-out'}));
  }

  var kinds=[ghost,bat,spider];
  function auto(){
    if(!reduce&&!document.hidden) kinds[Math.floor(Math.random()*3)]();
    setTimeout(auto,rnd(9000,16000)/FREQ*1.6);
  }
  if(!reduce){
    setTimeout(bat,1500);
    setTimeout(ghost,4000);
    setTimeout(auto,5000);
  }
})();
