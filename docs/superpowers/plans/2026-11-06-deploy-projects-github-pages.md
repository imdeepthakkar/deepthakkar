# Deploy AI Projects to GitHub Pages (Option 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy and link all 12 AI hobby projects to individual GitHub Pages repositories (`https://imdeepthakkar.github.io/<repo>/`) or local portal pages, eliminating the broken Vercel dependency.

**Architecture:** Each standalone project is either published to its own GitHub repository with GitHub Pages enabled, or served as a relative static page within the primary `deepthakkar` GitHub Pages portal. The main portal `index.html` is updated with direct HTTPS links to each live, independently deployed site.

**Tech Stack:** GitHub CLI (`gh`), Git, GitHub Pages, HTML5/CSS3/JavaScript, Vite, Next.js.

---

## Global Constraints

- Every link on `https://imdeepthakkar.github.io/deepthakkar/` must resolve to HTTP 200 (no 404s, no 402 Vercel payment errors).
- All deployments must use GitHub Pages (100% free static hosting).
- Retain portal visual styling and card structure in `index.html`.

---

## Tasks

### Task 1: Fix Local In-Portal Pages & Portfolio Link
Fix the links for components that already exist in the repository or are already deployed on GitHub Pages.

**Files:**
- Modify: `index.html:236-322`
- Verify: `agy.html`, `scrum-master.html`, `scrum-scenarios.html`

- [ ] **Step 1: Update in-repo links to relative URLs in `index.html`**
  - `/portfolio` -> `https://imdeepthakkar.github.io/portfolio/` (already 200 OK)
  - `/agy` -> `./agy.html`
  - `/scrum-master` -> `./scrum-master.html`
  - `/scrum-scenarios` -> `./scrum-scenarios.html`
- [ ] **Step 2: Commit and push changes to `main`**
- [ ] **Step 3: Verify the links return HTTP 200**

---

### Task 2: Publish Weather App to its Own Repository & Enable GitHub Pages
The weather app is fully self-contained in `weather/` (HTML, JS, PWA icons), but was previously git-ignored.

**Files:**
- Source: `weather/`
- Target: New repository `imdeepthakkar/weather-app`

- [ ] **Step 1: Remove `weather/` from `.gitignore`**
- [ ] **Step 2: Initialize or push `weather/` to GitHub repo `imdeepthakkar/weather-app`**
- [ ] **Step 3: Enable GitHub Pages on `imdeepthakkar/weather-app` (`main` branch, `/` root)**
- [ ] **Step 4: Update `index.html` link for Weather App to `https://imdeepthakkar.github.io/weather-app/`**
- [ ] **Step 5: Verify `https://imdeepthakkar.github.io/weather-app/` loads with HTTP 200**

---

### Task 3: Publish System Design Learning & Enable GitHub Pages
Deploy the System Design portal from `AIProjects/system-design-learning`.

**Files:**
- Source: `C:\Users\deept\AIProjects\system-design-learning` (`index.html`, `assets/`)
- Target: GitHub repository `imdeepthakkar/system-design-learning`

- [ ] **Step 1: Create repository `imdeepthakkar/system-design-learning` via `gh`**
- [ ] **Step 2: Push code to `main` branch**
- [ ] **Step 3: Enable GitHub Pages on `imdeepthakkar/system-design-learning`**
- [ ] **Step 4: Update `index.html` link to `https://imdeepthakkar.github.io/system-design-learning/`**
- [ ] **Step 5: Verify live URL with curl**

---

### Task 4: Publish GitHub Repo Manager & Enable GitHub Pages
Deploy the Vite static build from `AIProjects/github-repo-manager`.

**Files:**
- Source: `C:\Users\deept\AIProjects\github-repo-manager` (`dist/` contains static HTML/CSS/JS)
- Target: GitHub repository `imdeepthakkar/github-repo-manager`

- [ ] **Step 1: Create repository `imdeepthakkar/github-repo-manager` via `gh`**
- [ ] **Step 2: Push static build (`dist` contents or repository root with `index.html`)**
- [ ] **Step 3: Enable GitHub Pages on `imdeepthakkar/github-repo-manager`**
- [ ] **Step 4: Update `index.html` link to `https://imdeepthakkar.github.io/github-repo-manager/`**
- [ ] **Step 5: Verify live URL with curl**

---

### Task 5: Deploy Rejseplanen UI to GitHub Pages
Deploy the existing `dist` build in `AIProjects/rejseplanen-ui`.

**Files:**
- Source: `C:\Users\deept\AIProjects\rejseplanen-ui`
- Target: `imdeepthakkar/rejseplanen-ui` (Pages already enabled via API)

- [ ] **Step 1: Check build artifacts in `rejseplanen-ui` and ensure root or `gh-pages` branch serves `dist`**
- [ ] **Step 2: Configure Pages source to serve the built bundle**
- [ ] **Step 3: Update `index.html` link to `https://imdeepthakkar.github.io/rejseplanen-ui/`**
- [ ] **Step 4: Verify live URL with curl**

---

### Task 6: Deploy GreenCart DK, AI Job Search & Personal Calendar
Deploy remaining micro-apps to their respective GitHub Pages.

**Files:**
- GreenCart: `AIProjects/AI-Agent/public` &rarr; `imdeepthakkar/greencart-dk`
- AI Job Search: `AIProjects/ai-job-search/job_scraper` &rarr; `imdeepthakkar/ai-job-search`
- Personal Calendar: `AIProjects/personal-calendar` &rarr; static export to `imdeepthakkar/personal-calander`
- Java Interview: Link to `https://github.com/imdeepthakkar/java-interview-questions` or static viewer

- [ ] **Step 1: Deploy GreenCart DK to `imdeepthakkar/greencart-dk` and enable Pages**
- [ ] **Step 2: Enable Pages for `imdeepthakkar/ai-job-search`**
- [ ] **Step 3: Configure Personal Calendar static export for `imdeepthakkar/personal-calander`**
- [ ] **Step 4: Update all corresponding links in `index.html`**
- [ ] **Step 5: Push `deepthakkar` to `origin/main` and verify all 12 links live**
