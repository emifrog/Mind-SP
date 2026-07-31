/* MindSP — interactions de la landing page.
   Chargé en defer : le DOM est complet à l'exécution. */
(function () {
  'use strict';

  var reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasIO = 'IntersectionObserver' in window;

  /* ── Menu mobile ─────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('nav-menu');

  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      panel.setAttribute('data-open', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Un clic sur une entrée referme le panneau : sinon il masque
    // la section vers laquelle on vient de naviguer.
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Repasser en nav desktop pendant que le panneau est ouvert le laisserait
    // dans un état incohérent (aria-expanded=true sur un bouton masqué).
    var desktop = window.matchMedia('(min-width: 861px)');
    var onDesktop = function (e) { if (e.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else desktop.addListener(onDesktop);
  }

  /* ── Bouton de retour en haut ────────────────────────────────── */
  var toTop = document.querySelector('.to-top');

  if (toTop) {
    toTop.addEventListener('click', function () {
      // `behavior: 'smooth'` en dur ignorerait le scroll-behavior: auto que la
      // feuille de style applique sous prefers-reduced-motion : on s'y conforme.
      window.scrollTo({ top: 0, behavior: reducedMq.matches ? 'auto' : 'smooth' });
      // Ramène aussi le focus clavier en haut, sinon la tabulation reprendrait
      // au pied de page alors que la vue est revenue en haut.
      var brand = document.querySelector('.nav .brand');
      if (brand) brand.focus();
    });

    var hero = document.querySelector('.hero');
    if (hero && hasIO) {
      new IntersectionObserver(function (entries) {
        toTop.setAttribute('data-visible', String(!entries[0].isIntersecting));
      }, { threshold: 0 }).observe(hero);
    } else {
      var onScroll = function () {
        toTop.setAttribute('data-visible', String(window.scrollY > 700));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ── Apparition au scroll ────────────────────────────────────── */
  // Si le moteur sait animer depuis la position de défilement, la feuille de style
  // s'en charge entièrement (voir @supports (animation-timeline: view())) : inutile
  // d'observer quoi que ce soit, et le rendu ne dépend plus de ce fichier.
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()')) return;

  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var show = function (el) { el.classList.add('is-visible'); };

  if (reducedMq.matches || !hasIO) {
    Array.prototype.forEach.call(items, show);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      io.unobserve(entry.target);   // l'animation ne joue qu'une fois
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  Array.prototype.forEach.call(items, function (el) { io.observe(el); });
})();
