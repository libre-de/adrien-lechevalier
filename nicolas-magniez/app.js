const phone='+33647006159';
document.querySelectorAll('[data-phone]').forEach(a=>a.href='tel:'+phone);
document.querySelectorAll('[data-sms]').forEach(a=>a.href='sms:'+phone+'?body='+encodeURIComponent('Bonjour Nicolas, je souhaite vous parler de ma toiture.'));
document.querySelectorAll('form[data-lead]').forEach(f=>f.addEventListener('submit',e=>{
 e.preventDefault();if(!f.reportValidity())return;
 const lines=[...new FormData(f).entries()].filter(([k])=>k!=='consent').map(([k,v])=>k+': '+v);
 location.href='mailto:nicolas.magniez@me.com?subject=Demande%20Le%20Carre&body='+encodeURIComponent(['Bonjour Nicolas,','',...lines,'','Merci.'].join('\n'));
}));
const journey=document.querySelector('.tile-journey');
if(journey&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const tile=journey.querySelector('.roof-tile');
 const start=document.querySelector('.hero');
 const end=document.querySelector('#contact');
 let scheduled=false;
 function update(){
  scheduled=false;
  const top=window.scrollY,vh=window.innerHeight,vw=window.innerWidth;
  const begin=start?start.getBoundingClientRect().bottom+top-vh*.75:vh*.5;
  const finish=end?end.getBoundingClientRect().top+top:document.documentElement.scrollHeight-vh;
  const p=Math.max(0,Math.min(1,(top+vh*.3-begin)/Math.max(1,finish-begin)));
  journey.classList.toggle('active',p>.005&&p<.997);
  journey.classList.toggle('at-end',p>.88);
  const x=vw*(.5+.32*Math.cos(4*Math.PI*p));
  const y=vh*(.15+.7*p);
  const angle=18*Math.sin(4*Math.PI*p);
  tile.style.transform='translate3d('+(x-tile.offsetWidth/2)+'px,'+(y-tile.offsetHeight/2)+'px,0) rotate('+angle+'deg)';
 }
 function request(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request);update();
}
