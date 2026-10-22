const phone = '+33647006159';
document.querySelectorAll('[data-phone]').forEach(el => el.href = 'tel:' + phone);
document.querySelectorAll('[data-reveal-phone]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    if (el.dataset.revealed === 'true') {
      window.location.href = 'tel:' + phone;
      return;
    }
    el.dataset.revealed = 'true';
    el.textContent = '06 47 00 61 59';
    el.setAttribute('aria-label', 'Appeler Nicolas Magniez au 06 47 00 61 59');
    el.setAttribute('title', 'Cliquer de nouveau pour appeler');
    window.dispatchEvent(new CustomEvent('lecarre:phone_revealed', {detail:{location:el.closest('header')?'header':'contact'}}));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({event:'phone_revealed',phone_location:el.closest('header')?'header':'contact'});
  });
});
document.querySelectorAll('[data-sms]').forEach(el => el.href = 'sms:' + phone + '?body=' + encodeURIComponent('Bonjour Nicolas, je souhaite vous parler de ma toiture.'));

document.querySelectorAll('form[data-lead]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (k !== 'consent') lines.push(`${k} : ${v}`);
    }
    const body = ['Bonjour Nicolas,', '', ...lines, '', 'Merci.'].join('\n');
    window.location.href = 'mailto:nicolas.magniez@me.com?subject=' + encodeURIComponent('Demande via le site Le Carré') + '&body=' + encodeURIComponent(body);
  });
});

const journey = document.querySelector('.tile-journey');
if (journey && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const follower = journey.querySelector('.tile-follower');
  const path = journey.querySelector('.journey-progress');
  const guide = journey.querySelector('.journey-guide');
  const total = guide.getTotalLength();
  const hero = document.querySelector('.hero');
  const endTarget = document.querySelector('footer') || document.body;
  let raf = null;

  path.style.strokeDasharray = `${total}`;
  path.style.strokeDashoffset = `${total}`;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function updateTileJourney() {
    raf = null;
    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportH = window.innerHeight;
    const start = hero ? hero.offsetTop + hero.offsetHeight * 0.7 : viewportH * 0.6;
    const finish = endTarget ? endTarget.getBoundingClientRect().top + scrollTop : (document.documentElement.scrollHeight - viewportH);
    const progress = clamp((scrollTop + viewportH * 0.35 - start) / Math.max(1, finish - start), 0, 1);

    const point = guide.getPointAtLength(total * progress);
    const lookAhead = guide.getPointAtLength(Math.min(total, total * Math.min(progress + 0.012, 1)));
    const angle = Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * 180 / Math.PI;
    const uprightAngle = Math.max(-32, Math.min(32, angle - 90));

    const x = (point.x / 1000) * window.innerWidth;
    const y = (point.y / 1000) * window.innerHeight;

    follower.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${uprightAngle}deg)`;
    path.style.strokeDashoffset = `${total * (1 - progress)}`;

    journey.classList.toggle('active', progress > 0.015 && progress <= 1);
    journey.classList.toggle('at-end', progress > 0.88);
  }

  function requestUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(updateTileJourney);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  updateTileJourney();
}
