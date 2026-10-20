const PHONE='+33647006159',EMAIL='nicolas.magniez@me.com';document.querySelectorAll('[data-call]').forEach(a=>a.href='tel:'+PHONE);document.querySelectorAll('[data-sms]').forEach(a=>a.href='sms:'+PHONE+'?body='+encodeURIComponent('Bonjour Nicolas, je souhaiterais échanger sur ma toiture.'));document.querySelectorAll('form[data-contact]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form),lines=[...d.entries()].filter(([k])=>k!=='Accord').map(([k,v])=>k+' : '+v);location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Demande de toiture — Le Carré')+'&body='+encodeURIComponent(lines.join('\n'));const el=form.querySelector('[role=status]');if(el)el.textContent='Votre messagerie va s’ouvrir. Pensez à envoyer le courriel pour transmettre la demande.';}));
/* Animation progressive, désactivée si l’utilisateur préfère réduire le mouvement */
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
const elements=document.querySelectorAll('.card,.review,.photo-real,.form,.section h2');
elements.forEach(el=>el.setAttribute('data-reveal',''));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');reveal.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 30px 0px'});
elements.forEach(el=>reveal.observe(el));
}
