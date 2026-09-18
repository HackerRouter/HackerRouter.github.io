(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var notice = document.getElementById('content-notice');

  function updateToggle() {
    var dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = toggle.getAttribute('aria-label');
  }

  toggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('leedom-theme', root.dataset.theme);
    } catch (error) {}
    updateToggle();
  });
  updateToggle();

  function showNotice() {
    if (!notice.open) {
      notice.showModal();
      root.classList.add('notice-open');
    }
  }

  notice.addEventListener('cancel', function (event) {
    event.preventDefault();
  });
  notice.addEventListener('close', function () {
    root.classList.remove('notice-open');
    toggle.focus({ preventScroll: true });
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) showNotice();
  });
  showNotice();
})();
