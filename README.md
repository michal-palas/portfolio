# Koudelka Engineering & Consulting — portfolio

A static, bilingual (DE/EN) one-page portfolio site for Alfred Koudelka —
independent partner for sales and engineering in machine and plant construction.

Plain HTML/CSS/JS, no build step.

```
index.html        The whole page (German inline + data-en for English)
styles.css        Styling (navy/steel corporate)
app.js            Language toggle, image lightbox, mobile nav
assets/
  img/            Logo + web-optimised reference images
  AGB.pdf         Terms & conditions
.github/workflows/deploy.yml   Publishes to GitHub Pages on push
```

## View locally

Any static server works, e.g.:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Create a repository named **`portfolio`** and push this to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Every push publishes automatically to `https://<user>.github.io/portfolio/`.

All asset paths are relative, so the site works under that subpath without any
configuration.

## To do

- Replace the placeholder contact details (address, UID, phone, email, website)
  in `index.html` — they are marked with a dashed underline and a note in the
  contact section.
