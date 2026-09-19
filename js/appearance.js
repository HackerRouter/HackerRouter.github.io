(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var notice = document.getElementById('content-notice');
  var dismissNotice = document.getElementById('notice-dismiss');
  var noticeDismissed = false;

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
    try {
      noticeDismissed = localStorage.getItem('leedom-notice-dismissed') === 'true';
    } catch (error) {}
    if (noticeDismissed) return;
    if (!notice.open) {
      notice.showModal();
      root.classList.add('notice-open');
    }
  }

  notice.querySelector('form').addEventListener('submit', function () {
    if (dismissNotice.checked) {
      noticeDismissed = true;
      try {
        localStorage.setItem('leedom-notice-dismissed', 'true');
      } catch (error) {}
    }
  });

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
