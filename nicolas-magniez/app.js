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
    const body=['Bonjour Nicolas,','',...lines,'','Merci.'].join('\n');
    window.location.href='mailto:nicolas.magniez@me.com?subject='+encodeURIComponent('Demande via le site Le Carré')+'&body='+encodeURIComponent(body);
  });
});
