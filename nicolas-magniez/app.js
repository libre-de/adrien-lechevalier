const phone = '+33647006159';
document.querySelectorAll('[data-phone]').forEach(el=>el.href='tel:'+phone);
document.querySelectorAll('[data-sms]').forEach(el=>el.href='sms:'+phone+'?body='+encodeURIComponent('Bonjour Nicolas, je souhaite vous parler de ma toiture.'));
document.querySelectorAll('form[data-lead]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data = new FormData(form);
    const lines=[];
    for(const [k,v] of data.entries()){ if(k!=='consent') lines.push(`${k} : ${v}`); }
    const body=['Bonjour Nicolas,','',...lines,'','Merci.'].join('
');
    window.location.href='mailto:nicolas.magniez@me.com?subject='+encodeURIComponent('Demande via le site Le Carré')+'&body='+encodeURIComponent(body);
  });
});
const tile=document.querySelector('.tile-motion');
function updateTile(){
  if(!tile) return;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const p=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;
  const y=window.innerHeight*0.16 + p*(window.innerHeight*0.62);
  const x=Math.sin(p*6.3)*110;
  const rot=-10 + Math.sin(p*8)*18;
  tile.style.transform=`translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
  tile.classList.toggle('is-square', p>.84);
  tile.style.opacity=p<.08?0:0.72;
}
window.addEventListener('scroll',updateTile,{passive:true});
window.addEventListener('resize',updateTile);
updateTile();
