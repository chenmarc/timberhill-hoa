# Meadowridge at Timberhill HOA Website

A clean, professional static website for the Meadowridge at Timberhill Homeowners Association.
Built with HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools.

---

## 📁 Project Structure

```
meadowridge-hoa/
├── index.html              ← Single-page application (all tabs)
├── README.md               ← This file
├── css/
│   └── styles.css          ← All styles (well-commented, organized by section)
├── js/
│   └── main.js             ← Tab switching, accordion, mobile menu, form handler
├── images/
│   ├── meadowridge1.jpg    ← Header panoramic photo (replace with seasonal shots)
│   └── favicon.ico         ← Browser tab icon
└── docs/                   ← PDFs and downloadable documents (add your files here)
    ├── meadowridge-ccrs.pdf
    ├── meadowridge-bylaws.pdf
    ├── arc-application.pdf
    └── ... (add more as needed)
```

---

## 🚀 GitHub Pages Setup (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository** (the green button or `+` icon).
3. Name it: `meadowridge-hoa` (or any name you prefer).
4. Set visibility to **Public** (required for free GitHub Pages hosting).
5. Click **Create repository**.

### Step 2 — Upload Your Files

**Option A — Drag and Drop (easiest):**
1. Open your new repository on GitHub.
2. Click **Add file → Upload files**.
3. Drag your entire `meadowridge-hoa/` folder contents into the window.
4. Click **Commit changes**.

**Option B — Git command line:**
```bash
cd meadowridge-hoa
git init
git add .
git commit -m "Initial site launch"
git remote add origin https://github.com/YOUR-USERNAME/meadowridge-hoa.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top menu).
2. Scroll to **Pages** in the left sidebar.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch: `main`, folder: `/ (root)`.
5. Click **Save**.

### Step 4 — Visit Your Site

After 1–2 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/meadowridge-hoa/
```

---

## 🌐 Custom Domain (Optional)

To use a domain like `www.meadowridgehoa.org`:

### Step 1 — Buy a domain
Purchase from any registrar: Namecheap, Google Domains, GoDaddy, Cloudflare Registrar, etc.

### Step 2 — Add CNAME to GitHub
1. In your repository, click **Add file → Create new file**.
2. Name it exactly: `CNAME`
3. Contents: `www.meadowridgehoa.org` (just the domain, no https://)
4. Commit the file.

### Step 3 — Point DNS to GitHub
In your domain registrar's DNS settings, add these records:

| Type  | Host | Value                   |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | YOUR-USERNAME.github.io |

### Step 4 — Enable HTTPS in GitHub Settings
Back in **Settings → Pages**, check **Enforce HTTPS** once the domain verifies (up to 24 hours).

---

## 📧 Contact Form — Connecting to a Real Email

The contact form currently shows a demo success message. To make it actually send emails, choose one:

### Option A — Formspree (recommended, free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, note your form endpoint URL.
3. In `index.html`, change the `<form>` tag:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```
4. Remove the `novalidate` attribute and the `id="contact-form"` JS handler in `main.js`.
5. Formspree sends emails directly to your inbox.

### Option B — Netlify Forms (if you host on Netlify instead)
Add `data-netlify="true"` to the `<form>` tag. Netlify handles the rest.

### Option C — EmailJS (no backend, client-side)
Follow the [EmailJS quickstart](https://www.emailjs.com/docs/tutorial/overview/).

---

## ✏️ Customization Guide

### Updating Tab Content
All content is in `index.html`. Each tab is a `<section id="tab-NAME">` block.
- Edit the text directly between the `<p>` tags.
- Add/remove list items with `<li>` tags.

### Adding Documents (PDFs)
1. Place PDF files in the `docs/` folder.
2. In `index.html`, find the Documents tab and add a line:
   ```html
   <li><a href="docs/your-file.pdf" class="pdf">Your Document Name</a></li>
   ```

### Changing Colors
All colors are defined at the top of `css/styles.css` in the comment block.
The main colors are:
- `#8fbbbc` — teal page background
- `#d8d7b3` — sand/khaki header, footer, sidebar
- `#fef1c3` — soft cream content area
- `#227648` — forest green accents
- `#535341` — olive text

### Changing the Header Photo
Replace `images/meadowridge1.jpg` with any wide panoramic image (ideally 1600px wide or wider).
Keep the filename the same, or update the `src` in `index.html`.

### Adding New Tabs
1. Add a button to `#top-nav ul` in `index.html`:
   ```html
   <li role="presentation">
     <button class="tab-btn" role="tab" data-tab="tab-mynewtab" aria-selected="false">New Tab</button>
   </li>
   ```
2. Add a link to `#left-menu`:
   ```html
   <li><a href="#" data-tab="tab-mynewtab">New Tab</a></li>
   ```
3. Add a content panel in `#right-content`:
   ```html
   <section id="tab-mynewtab" class="tab-panel" role="tabpanel" tabindex="0">
     <div class="panel-headline"><h1>New Tab Title</h1></div>
     <div class="panel-body"><p>Content here...</p></div>
   </section>
   ```
No JavaScript changes needed — the tab system auto-discovers buttons by `data-tab` attribute.

---

## 🔄 Making Updates After Launch

**To update content:**
1. Edit `index.html` in your code editor or directly on GitHub (click the pencil ✏️ icon).
2. Commit/save your changes.
3. GitHub Pages redeploys automatically within ~60 seconds.

**To add new PDFs:**
1. Upload the PDF to the `docs/` folder in your GitHub repository.
2. Add the link to `index.html` in the Documents tab.

---

## ♿ Accessibility Notes

- All tab buttons have `role="tab"` and `aria-selected` attributes.
- All tab panels have `role="tabpanel"` and `tabindex="0"` for keyboard navigation.
- The contact form uses `<label>` elements properly linked to inputs.
- Keyboard users can navigate tabs with Tab/Enter/Space.
- Reduced motion is respected via `@media (prefers-reduced-motion: reduce)`.
- Color contrast meets WCAG AA for all text/background combinations.

---

## 📱 Mobile Notes

On screens under 700px wide:
- A hamburger menu replaces the tab bar.
- The left sidebar is hidden (navigation is handled by the hamburger menu).
- Content stacks vertically.
- The contact form spans full width.

---

*Site built with plain HTML, CSS, and JavaScript — no dependencies, no build step required.*
