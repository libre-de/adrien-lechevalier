// Afficher immédiatement le poster, puis charger la vidéo sans bloquer le rendu initial.
document.querySelectorAll('.hero-media video').forEach(video => {
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData === true;
  const showVideo = () => video.closest('.hero-media')?.classList.add('video-ready');
  video.addEventListener('loadeddata', showVideo, {once:true});
  if (reduced || saveData) return; // Conserver l'image plutôt que forcer le téléchargement.
  const play = () => {
    if (!video.isConnected) return;
    const promise = video.play();
    promise?.catch?.(() => {});
  };
  if (mobile) {
    // Laisser finir les ressources critiques avant d'envoyer la requête vidéo.
    const schedule = () => {
      if ('requestIdleCallback' in window) requestIdleCallback(play, {timeout:3000});
      else setTimeout(play, 1100);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, {once:true});
  } else play();
});
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
  const telInput = form.querySelector('[name="Téléphone"]');
  const mailInput = form.querySelector('[name="Email"]');
  [telInput, mailInput].forEach(input => input?.addEventListener('input', () => telInput?.setCustomValidity('')));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const telephone = form.querySelector('[name="Téléphone"]');
    const email = form.querySelector('[name="Email"]');
    if (!telephone?.value.trim() && !email?.value.trim()) {
      telephone?.setCustomValidity('Renseignez un téléphone ou une adresse e-mail.');
      telephone?.reportValidity();
      return;
    }
    telephone?.setCustomValidity('');
    if (!form.reportValidity()) return;
    const button = form.querySelector('[type="submit"]');
    const feedback = form.querySelector('.form-feedback');
    if (button.disabled) return;
    button.disabled = true;
    const original = button.textContent;
    button.textContent = 'Envoi en cours…';
    if (feedback) feedback.textContent = '';
    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: data
      });
      const result = await response.json();
      // FormSubmit retourne parfois "false" comme chaîne : ne jamais l'interpréter comme true.
      if (!response.ok || !(result.success === true || result.success === 'true')) {
        throw new Error(result.message || 'Envoi non confirmé');
      }
      if (feedback) feedback.textContent = 'Votre demande a bien été envoyée. Nicolas Magniez reviendra vers vous.';
      form.reset();
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({event:'lead_form_success',form_page:location.pathname});
    } catch (error) {
      if (feedback) feedback.textContent = 'L’envoi n’a pas pu être confirmé. Veuillez réessayer ultérieurement.';
      console.error('Formulaire Le Carré :', error);
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
});

document.querySelectorAll('.mobile-menu-toggle').forEach(toggle => {
  const nav = document.getElementById(toggle.getAttribute('aria-controls'));
  if (!nav) return;
  const close = () => {toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');};
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click',close));
  document.addEventListener('keydown', e => {if(e.key==='Escape')close();});
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
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportH);
    const finish = Math.max(start + 1, maxScroll);
    const progress = clamp((scrollTop - start + viewportH * 0.2) / Math.max(1, finish - start + viewportH * 0.2), 0, 1);

    // La trajectoire reste celle d'origine. Sa fin se stabilise sur le footer,
    // sans déport artificiel à droite ni bascule de la tuile.
    const travel = Math.min(progress, 0.90);
    const point = guide.getPointAtLength(total * travel);
    const lookAhead = guide.getPointAtLength(Math.min(total, total * (travel + 0.012)));
    const angle = Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * 180 / Math.PI;
    const uprightAngle = clamp(angle - 90, -32, 32);

    const footerRect = endTarget.getBoundingClientRect();
    const landing = clamp((progress - 0.86) / 0.14, 0, 1);
    const eased = landing * landing * (3 - 2 * landing);
    const footerX = window.innerWidth * (window.innerWidth < 760 ? 0.68 : 0.70);
    const footerY = clamp(footerRect.top + 34, 50, viewportH - 75);
    const x = (point.x / 1000) * window.innerWidth * (1 - eased) + footerX * eased;
    const y = (point.y / 1000) * viewportH * (1 - eased) + footerY * eased;
    const finalAngle = uprightAngle * (1 - eased);

    follower.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${finalAngle}deg)`;
    path.style.strokeDashoffset = `${total * (1 - travel)}`;
    // Le sillage s'efface dans les derniers centimètres : pas de boucle dans le footer.
    const trailFade = 1 - clamp((progress - 0.85) / 0.10, 0, 1);
    journey.querySelector('.journey-layer').style.opacity = String(trailFade);

    journey.classList.toggle('active', progress > 0.015 && progress <= 1);
    journey.classList.toggle('at-end', progress >= 0.999);
  }

  function requestUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(updateTileJourney);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  updateTileJourney();
}
