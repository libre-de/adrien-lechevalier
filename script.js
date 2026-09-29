const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 841px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const status = form.querySelector('.form-note');
    const button = form.querySelector('button[type="submit"]');
    const endpoint = form.action;
    if (endpoint.includes('FORM_ENDPOINT_PENDING')) {
      status.textContent = 'Le formulaire est en cours d’activation. Vous pouvez réserver un échange ci-dessous.';
      return;
    }

    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Envoi en cours…';
    status.textContent = 'Envoi de votre demande…';

    try {
      const ajaxEndpoint = endpoint.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('Envoi refusé');
      }
      form.reset();
      status.textContent = 'Merci, votre message a bien été envoyé. Je vous répondrai rapidement.';
      status.classList.add('form-note--success');
    } catch {
      status.textContent = 'L’envoi a échoué. Merci de réessayer ou de réserver un échange.';
      status.classList.remove('form-note--success');
    } finally {
      button.disabled = false;
      button.innerHTML = label;
    }
  });
});
