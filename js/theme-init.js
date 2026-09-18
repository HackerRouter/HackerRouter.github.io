(function () {
  var mode = 'light';
  try {
    if (localStorage.getItem('leedom-theme') === 'dark') mode = 'dark';
  } catch (error) {}
  document.documentElement.dataset.theme = mode;
})();
