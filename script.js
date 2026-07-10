// Cookie consent + iframe gate
(function () {
  var CONSENT_KEY = 'cookieConsent';

  function applyConsent(consent) {
    document.querySelectorAll('.subscribe-gate').forEach(function (gate) {
      var blocked = gate.querySelector('.subscribe-gate__blocked');
      var embed = gate.querySelector('.subscribe-gate__embed');
      if (!blocked || !embed) return;
      if (consent === 'accepted') {
        blocked.style.display = 'none';
        embed.style.display = 'block';
        var iframe = embed.querySelector('iframe[data-src]');
        if (iframe && !iframe.src) iframe.src = iframe.dataset.src;
      } else {
        blocked.style.display = 'flex';
        embed.style.display = 'none';
      }
    });
  }

  function init() {
    var consent = localStorage.getItem(CONSENT_KEY);
    var banner = document.getElementById('cookieBanner');
    applyConsent(consent);
    if (!consent && banner) banner.classList.add('visible');
    var acceptBtn = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) acceptBtn.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      if (banner) banner.classList.remove('visible');
      applyConsent('accepted');
    });
    if (declineBtn) declineBtn.addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      if (banner) banner.classList.remove('visible');
      applyConsent('declined');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// Newsletter RSS feed
(function () {
  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function loadFeed() {
    var container = document.getElementById('newsletterCards');
    if (!container) return;
    var rssUrl = encodeURIComponent('https://howmomai.substack.com/feed');
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status !== 'ok' || !data.items || !data.items.length) {
          var section = document.getElementById('newsletter-feed');
          if (section) section.style.display = 'none';
          return;
        }
        container.innerHTML = data.items.map(function (item) {
          var date = new Date(item.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          var excerpt = stripHtml(item.description).slice(0, 100).trim() + '…';
          var img = item.thumbnail || (item.enclosure && item.enclosure.link) || '';
          var imageHtml = img
            ? '<img class="newsletter-card__image" src="' + img + '" alt="" loading="lazy" />'
            : '<div class="newsletter-card__image newsletter-card__image--placeholder">✦</div>';
          return '<a href="' + item.link + '" class="newsletter-card" target="_blank" rel="noopener">'
            + imageHtml
            + '<div class="newsletter-card__body">'
            + '<p class="newsletter-card__date">' + date + '</p>'
            + '<h3 class="newsletter-card__title">' + item.title + '</h3>'
            + '<p class="newsletter-card__excerpt">' + excerpt + '</p>'
            + '<span class="newsletter-card__read">Read →</span>'
            + '</div>'
            + '</a>';
        }).join('');
      })
      .catch(function () {
        var section = document.getElementById('newsletter-feed');
        if (section) section.style.display = 'none';
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadFeed);
  else loadFeed();
})();

// Hamburger menu
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Announcement bar dismiss + nav offset
const bar = document.getElementById('announcementBar');
const closeBtn = document.getElementById('announcementClose');

function setNavTop() {
  const height = bar && !bar.classList.contains('hidden') ? bar.offsetHeight : 0;
  document.documentElement.style.setProperty('--nav-top', height + 'px');
}

if (bar && localStorage.getItem('announcementDismissed') === 'true') {
  bar.classList.add('hidden');
}

setNavTop();

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    bar.classList.add('hidden');
    localStorage.setItem('announcementDismissed', 'true');
    setNavTop();
  });
}
