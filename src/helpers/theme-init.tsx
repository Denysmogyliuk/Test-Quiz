import Script from 'next/script'

export function ThemeInit() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {`(function(){
  if (window.__themeInitialized) return;
  window.__themeInitialized = true;
  try {
    function getCookie(name) {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }
    var theme = getCookie('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'system' || !theme) {
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`}
    </Script>
  )
}
