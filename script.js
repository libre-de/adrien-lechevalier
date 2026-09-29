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
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.querySelector('[name="Nom"]').value.trim();
    const email = form.querySelector('[name="Email"]').value.trim();
    const message = form.querySelector('[name="Message"]').value.trim();
    if (!name || !email || !message) return;

    const subject = form.dataset.subject || 'Prise de contact depuis le site';
    const body = `Bonjour Adrien,\n\n${message}\n\nNom : ${name}\nE-mail : ${email}`;
    window.location.href = `mailto:adrien.lechevalier@solayia.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
