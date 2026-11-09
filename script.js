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

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const details = new FormData(form);
  const subject = `Website enquiry from ${details.get('business')}`;
  const body = [
    `Name: ${details.get('name')}`,
    `Business: ${details.get('business')}`,
    `Email: ${details.get('email')}`,
    `Phone: ${details.get('phone') || 'Not provided'}`,
    '',
    'What they have in mind:',
    details.get('message'),
  ].join('\n');
  const mailto = `mailto:ryanchandupa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('.form-success').textContent = 'Your email app is opening with your note ready to send.';
  window.location.href = mailto;
});
