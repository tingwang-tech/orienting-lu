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
  // ── Newsletter feed config ──
  // The Substack mixes How Mom AI posts and Orienting Field Notes posts, and the RSS
  // carries no category or section to tell them apart. So we show ONLY the Field Notes
  // issues listed here by slug (the part after /p/ in the post URL). When you publish a
  // new Field Notes issue, add its slug to this array.
  // Durable fix: move Field Notes to its own Substack and point NEWSLETTER_FEED_URL there,
  // then empty this array to show everything on that feed.
  var NEWSLETTER_FEED_URL = 'https://howmomai.substack.com/feed';
  var FIELD_NOTES_SLUGS = [
    'how-to-build-an-ai-brain-with-one'
  ];

  function slugFromLink(link) {
    var m = /\/p\/([^\/?#]+)/.exec(link || '');
    return m ? m[1] : '';
  }

  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function loadFeed() {
    var container = document.getElementById('newsletterCards');
    if (!container) return;
    var rssUrl = encodeURIComponent(NEWSLETTER_FEED_URL);
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var section = document.getElementById('newsletter-feed');
        if (data.status !== 'ok' || !data.items || !data.items.length) {
          if (section) section.style.display = 'none';
          return;
        }
        var items = data.items;
        if (FIELD_NOTES_SLUGS.length) {
          items = items.filter(function (item) {
            return FIELD_NOTES_SLUGS.indexOf(slugFromLink(item.link)) !== -1;
          });
        }
        if (!items.length) {
          if (section) section.style.display = 'none';
          return;
        }
        container.innerHTML = items.map(function (item) {
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
