/* GDPR Consent Mode v2 + cookie-consent banner
 * localStorage key: 'consent'  |  values: 'accepted' | 'declined'  |  no PII stored
 */
(function () {
  'use strict';

  var KEY = 'consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (!window.gtag) { window.gtag = gtag; }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var stored = getConsent();

  if (stored === 'accepted') {
    gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
  }

  if (stored !== null) { return; }

  function removeBanner() {
    var b = document.getElementById('cc-banner');
    if (b && b.parentNode) { b.parentNode.removeChild(b); }
  }

  function showBanner() {
    if (document.getElementById('cc-banner') || !document.body) { return; }

    var banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#1a1a1a;color:#fff;padding:12px 16px;' +
      'display:flex;align-items:center;justify-content:space-between;' +
      'flex-wrap:wrap;gap:8px;' +
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
      'font-size:14px;line-height:1.5;';

    var text = document.createElement('span');
    text.textContent = 'This site uses cookies for ads.';
    text.style.cssText = 'flex:1;min-width:200px;';

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:8px;flex-shrink:0;';

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.id = 'cc-accept';
    acceptBtn.textContent = 'Accept';
    acceptBtn.style.cssText =
      'background:#16a34a;color:#fff;border:none;border-radius:4px;' +
      'padding:6px 14px;font-size:14px;font-weight:600;cursor:pointer;';

    var declineBtn = document.createElement('button');
    declineBtn.type = 'button';
    declineBtn.id = 'cc-decline';
    declineBtn.textContent = 'Decline';
    declineBtn.style.cssText =
      'background:transparent;color:#ccc;border:1px solid #666;border-radius:4px;' +
      'padding:6px 14px;font-size:14px;cursor:pointer;';

    btns.appendChild(acceptBtn);
    btns.appendChild(declineBtn);
    banner.appendChild(text);
    banner.appendChild(btns);
    document.body.appendChild(banner);

    acceptBtn.addEventListener('click', function () {
      gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
      setConsent('accepted');
      removeBanner();
    });

    declineBtn.addEventListener('click', function () {
      gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied' });
      setConsent('declined');
      removeBanner();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
