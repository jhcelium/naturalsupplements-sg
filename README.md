# Neoi SG Supplements — Astro SEO Template

This repository is a **template** for Singapore supplement educational sites.
**Each fork = one independent site + one independent domain.**

## What this site is
- Educational content only (no product sales)
- Not medical advice
- Singapore-first phrasing and buyer questions
- Japan-inspired long-term routine perspective

## Local development
```bash
npm install
npm run dev
```

## Build (Cloudflare Pages)
```bash
npm run build
npm run preview
```
Output directory: `dist/`

## How to create a new site (Fork workflow)

1. **Fork** this repo on GitHub.

2. In the forked repo:
   - Edit **`data/site.json`**:
     - `domain`
     - `primaryKw` / `secondaryKws`
     - `exploreLinks`
   - Replace the entire **`content/`** folder with your new site's content.

3. Deploy the fork to **Cloudflare Pages**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Bind custom domain to that Pages project (example):
     - `collagensupplements.neoi.jp`

## Files you usually change per site
- `data/site.json`
- `content/home.md`
- `content/about.md`
- `content/faq.md`
- `content/articles/*.md`
