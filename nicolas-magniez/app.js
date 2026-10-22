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
 const trail=journey.querySelector('.tile-trail');
 const svgNS='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(svgNS,'svg');
 svg.setAttribute('viewBox','0 0 1000 1000');
 svg.setAttribute('preserveAspectRatio','none');
 svg.setAttribute('width','100%');svg.setAttribute('height','100%');
 const path=document.createElementNS(svgNS,'path');
 path.setAttribute('d','M810 150 C820 260 180 260 190 370 S810 490 800 590 S180 700 190 800 S660 850 510 900');
 path.setAttribute('fill','none');path.setAttribute('stroke','rgba(184,76,52,.28)');
 path.setAttribute('stroke-width','2.5');path.setAttribute('stroke-dasharray','5 9');
 svg.appendChild(path);trail.appendChild(svg);
 const total=path.getTotalLength();
 const start=document.querySelector('.hero');
 const end=document.querySelector('.cta') || document.querySelector('#contact');
 let scheduled=false;
 function update(){
  scheduled=false;
  const top=window.scrollY,vh=window.innerHeight,vw=window.innerWidth;
  const begin=start?start.getBoundingClientRect().bottom+top-vh*.5:vh*.5;
  const finish=end?end.getBoundingClientRect().top+top:document.documentElement.scrollHeight-vh;
  const p=Math.max(0,Math.min(1,(top+vh*.3-begin)/Math.max(1,finish-begin)));
  journey.classList.toggle('active',p>.005&&p<=1);
  journey.classList.toggle('at-end',p>.88);
  const point=path.getPointAtLength(total*p);
  const x=vw*point.x/1000;
  const y=vh*point.y/1000;
  const angle=14*Math.sin(4*Math.PI*p);
  path.style.strokeDasharray=(total*p)+' '+total;
  path.style.strokeDashoffset='0';
  tile.style.transform='translate3d('+(x-tile.offsetWidth/2)+'px,'+(y-tile.offsetHeight/2)+'px,0) rotate('+angle+'deg)';
 }
 function request(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request);update();
}
