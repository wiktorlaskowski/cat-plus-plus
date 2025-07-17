(function() {
  const baseURL = 'https://wiktorlaskowski.github.io/cat-plus-plus/';
  const scripts = [
    'better-context-menus.user.js',
    'bold-blocks.user.js',
    'colored-editor-context-menu.user.js',
    'compact-editor.user.js',
    'extra-metadata.user.js',
    'left-side-stage.user.js',
    'make-projects-shared.user.js',
    'right-side-flag.user.js',
    'searchable-dropdowns.user.js',
    'unrounded-stage.user.js'
  ];

  function inject(code) {
    const script = document.createElement('script');
    script.textContent = code;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
  }

  // Ensure GM_addStyle is available
  inject(
    'window.GM_addStyle = function(css) {' +
      'var style = document.createElement("style");' +
      'style.textContent = css;' +
      '(document.head || document.documentElement).appendChild(style);' +
    '};'
  );

  Promise.all(
    scripts.map(name => fetch(baseURL + name).then(r => r.text()))
  )
  .then(codes => {
    codes.forEach(code => inject(code));
  })
  .catch(err => {
    console.error('Failed to load Cat++ scripts', err);
  });
})();
