# MindSP — Landing page

Page de présentation de **MindSP**, plateforme SaaS de gestion RH, formation et temps de
travail pour les Services Départementaux d'Incendie et de Secours (SDIS).

Site statique : aucune dépendance, aucune étape de build.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page entière |
| `style.css` | Feuille de style complète |
| `main.js` | Menu mobile, bouton de retour en haut, apparition au défilement |
| `site.webmanifest` | Icônes et couleurs pour l'installation sur mobile |
| `images/` | Captures produit (WebP + repli JPEG), logo, favicons, carte de partage |

## Aperçu local

Ouvrir `index.html` suffit pour un coup d'œil. Certaines vérifications demandent un vrai
serveur : sur `file://`, le navigateur isole chaque fichier dans sa propre origine et
l'accès au CSSOM (`document.styleSheets[].cssRules`) lève une `SecurityError`.

```sh
npx serve .
```

## Choix techniques

**Images** — les captures sont servies en WebP à deux largeurs (700 / 1300) via
`<picture>` + `srcset`, avec repli JPEG, `loading="lazy"` et dimensions explicites pour
éviter tout saut de mise en page.

**Animations** — l'apparition au défilement a deux implémentations exclusives, choisies
par `@supports` : `animation-timeline: view()` en CSS pur là où le moteur le supporte
(aucune dépendance à `main.js`), sinon un `IntersectionObserver` en repli. Le menu mobile
s'anime via `@starting-style` et `transition-behavior: allow-discrete`, qui rendent la
propriété `display` transitionnable. `prefers-reduced-motion` neutralise l'ensemble.

## À traiter avant mise en production

- Le domaine canonique et l'`og:image` sont fixés sur `https://mindsp.fr/` dans le
  `<head>` d'`index.html`. Si le domaine de production diffère, la vignette de partage
  ne s'affichera pas : trois occurrences à ajuster.
- Les liens *Mentions légales*, *Politique de confidentialité* et *Accessibilité* du pied
  de page pointent encore vers `href="#"`.
