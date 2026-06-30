# Timberhill HOA Website

Static website for the Timberhill Homeowners Association (Corvallis, Oregon).
Built with HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

---

## Project Structure

```
timberhill-hoa/
├── index.html          Single HTML file containing all tab content
├── README.md           This file (developer reference)
├── css/
│   └── styles.css      All styles — organized by section with comments
├── js/
│   └── main.js         Tab switching, accordion, mobile menu, session persistence
├── images/
│   ├── bridge.jpg      Common area walkway photo (Home tab)
│   ├── pool.jpg        Community pool photo (Home tab)
│   └── favicon.ico     Browser tab icon
└── docs/               All downloadable HOA documents
    ├── ccrs.pdf
    ├── bylaws.pdf
    ├── articles_of_incorporation.pdf
    ├── community_handbook.docx
    ├── pool_rules.docx
    ├── common_area_map.pdf
    └── common_area_map_1.pdf
```

---

## Architecture

The site is a single-page application driven by `data-tab` attributes.

**Tab switching** — any element with `data-tab="tab-id"` (nav buttons, sidebar links) calls
`activateTab(tabId)` in `main.js`, which shows/hides `<section id="tab-id" class="tab-panel">` elements.
No page reloads. The active tab is persisted in `sessionStorage` under the key `tha-tab`.

**Left sidebar** — mirrors the top nav. Both use `data-tab` so `main.js` handles them identically.

**Accordion** — `.accordion-btn` buttons expand/collapse `.accordion-body` divs using `max-height`
animation. `aria-expanded` is toggled for accessibility.

**Mobile** — at ≤700 px the hamburger button replaces the tab row. Left sidebar is hidden (top nav covers it).

---

## Adding a New Document

1. Drop the file into `docs/` (PDF, DOCX, or other format).
2. Open `index.html` and find the relevant `<ul class="doc-list">` in the Documents tab.
3. Add one line:
   ```html
   <li>
     <a href="docs/your-file.pdf" class="pdf" target="_blank" rel="noopener">
       Your Document Label
     </a>
   </li>
   ```
   Use `class="pdf"` for PDFs, `class="docx"` for Word files, `class="map"` for maps.
4. To also embed it inline, copy one of the existing `<div class="doc-viewer-wrap">` blocks and
   update the `src` and `title` attributes.
5. Commit and push — GitHub Pages redeploys automatically within ~60 seconds.

---

## Adding a New Tab

1. Add a nav button in `#top-nav ul`:
   ```html
   <li role="presentation">
     <button class="tab-btn" role="tab" data-tab="tab-mypage"
       aria-selected="false" aria-controls="tab-mypage">My Page</button>
   </li>
   ```
2. Add a sidebar link in `#left-menu ul`:
   ```html
   <li><a href="#" data-tab="tab-mypage">My Page</a></li>
   ```
3. Add the content panel in `#right-content`:
   ```html
   <section id="tab-mypage" class="tab-panel" role="tabpanel" tabindex="0">
     <div class="panel-headline"><h1>My Page</h1></div>
     <div class="panel-body"><p>Content here…</p></div>
   </section>
   ```
No JavaScript changes needed — `main.js` discovers tabs by `data-tab` at runtime.

---

## Updating Colors

All colors are defined as comments at the top of `css/styles.css`. Search for the hex value
you want to change (e.g. `#227648`) and replace all instances in that file.

---

## Deploying to GitHub Pages

1. Push the repository to GitHub (public repo, `main` branch).
2. In the repo: **Settings → Pages → Source: Deploy from branch → main / (root) → Save**.
3. The site goes live at `https://YOUR-USERNAME.github.io/timberhill-hoa/` within ~2 minutes.

For a custom domain, see the separate `instructions.md` file (not committed to the repo).

---

## Updating Content

All content lives in `index.html`. Each tab is a `<section id="tab-*">` block.
Edit text directly. Commit the change. GitHub Pages redeploys automatically.

Board member names are in the Contact tab. Update them as the Board changes.
