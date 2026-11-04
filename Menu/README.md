# SCOTTI — Digital Menu

Static, single-page bilingual (Arabic / English) menu. No build step.

- `index.html` — page structure
- `css/style.css` — styles
- `js/app.js` — rendering, navigation, search, animations
- `data/menu.js` — **all menu data** (names, prices, sizes, calories, image path)
- `images/` — product photos (`<product-name>.webp`) and `hero.webp`

## Run locally
Open `index.html` in a browser (works without a server).

## Publish on GitHub Pages
Repo **Settings → Pages → Deploy from a branch → `main` / root**.

## Editing the menu
Edit `data/menu.js` only. A price is a number (`15`) or sizes (`[["M",15],["L",17]]`).
