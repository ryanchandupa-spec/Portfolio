const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('.form-success');
  const submitButton = form.querySelector('.submit-button');
  const accessKey = form.elements.access_key.value.trim();

  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    status.textContent = 'The contact form is almost ready. Add your Web3Forms access key to connect it to your inbox.';
    status.classList.add('form-error');
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector('span').textContent = '…';
  status.textContent = 'Sending your note…';
  status.classList.remove('form-error');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Please try again in a moment.');
    status.textContent = 'Thank you! We received your note.';
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Sorry, your note could not be sent. Please email us directly.';
    status.classList.add('form-error');
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector('span').textContent = '↗';
  }
});
