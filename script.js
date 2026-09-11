const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const form = document.getElementById('enquiryForm');
const status = document.getElementById('enquiryStatus');
const submit = document.getElementById('enquirySubmit');

if (form && status && submit) {
  const strings = form.dataset.strings ? JSON.parse(form.dataset.strings) : {};
  const t = (key, fallback) => strings[key] || fallback;

  const setStatus = (message, state) => {
    status.textContent = message;
    status.className = 'enquiry__status' + (state ? ' is-' + state : '');
  };

  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const required = ['name', 'email', 'message'];
    let firstInvalid = null;

    required.forEach((field) => {
      const input = form.elements[field];
      const valid = input.value.trim() !== '' && (field !== 'email' || input.checkValidity());
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      setStatus(t('invalid', 'Please fill in your name, a valid email, and a message.'), 'error');
      firstInvalid.focus();
      return;
    }

    submit.disabled = true;
    setStatus(t('sending', 'Sending...'), null);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });

      if (!response.ok) throw new Error('Request failed with status ' + response.status);

      form.classList.add('enquiry--sent');
      setStatus(t('success', 'Thank you. Your message reached me and I will reply within two working days.'), 'success');
    } catch (error) {
      submit.disabled = false;
      setStatus(t('error', 'That did not send. Please email hi@orienting.lu directly and I will pick it up there.'), 'error');
    }
  });
}
