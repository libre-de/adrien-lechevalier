const words = ['réussir', 'briller', 'oser', 'créer', 'entreprendre'];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const word = document.querySelector('.word-swap');
let index = 0;
if (!reducedMotion.matches) setInterval(() => {
  index = (index + 1) % words.length;
  word.textContent = words[index] + '.';
  word.style.animation = 'none';
  void word.offsetWidth;
  word.style.animation = '';
}, 2800);
const menu = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');
const close = menu.querySelector('.nav-close');
function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  (open ? close : toggle).focus();
}
toggle.addEventListener('click', () => setMenu(true));
close.addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (menu.hidden) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const links = [close, ...menu.querySelectorAll('a')];
    if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0].focus(); }
  }
});
const video = document.querySelector('.hero-video');
const pause = document.createElement('button');
pause.className = 'video-toggle'; pause.type = 'button';
video.after(pause);
function videoLabel() { pause.textContent = video.paused ? 'Lire la vidéo' : 'Pause vidéo'; }
pause.addEventListener('click', () => { if (video.paused) video.play().catch(videoLabel); else video.pause(); });
video.addEventListener('play', videoLabel); video.addEventListener('pause', videoLabel);
if (reducedMotion.matches) { video.autoplay = false; video.pause(); }
videoLabel();
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('.submit');
  const feedback = form.querySelector('.form-feedback');
  button.disabled = true; button.textContent = '→ Envoi…'; feedback.textContent = '';
  try {
    // Route PocketBase utilisée par le site Hostinger original.
    // Elle doit être conservée ou remplacée sur tout nouvel hébergement.
    const response = await fetch('/hcgi/platform/api/collections/contact_messages/records', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!response.ok) throw new Error('Échec de l’envoi');
    feedback.classList.remove('form-feedback-error');
    feedback.textContent = 'Merci. Votre message est bien parti, je vous réponds rapidement.';
    form.reset();
  } catch {
    feedback.classList.add('form-feedback-error');
    feedback.textContent = 'Le message n’a pas pu être envoyé. Réessayez ou utilisez le lien « Écrire un mail ».';
  } finally { button.disabled = false; button.textContent = '→ Envoyer'; }
});
