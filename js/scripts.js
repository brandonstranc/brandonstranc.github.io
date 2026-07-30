document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const closeButton = document.querySelector('.menu-close');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) {
    return;
  }

  const setMenuState = (isOpen) => {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  toggle.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('is-open'));
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      setMenuState(false);
    });
  }

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  const resetMenuOnResize = () => {
    if (window.innerWidth > 700) {
      setMenuState(false);
    }
  };

  window.addEventListener('resize', resetMenuOnResize);
  resetMenuOnResize();
});
