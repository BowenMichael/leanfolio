# Leanfolio — Repository Overview & Architecture

Welcome to **Leanfolio**, the portfolio and showcase application for **Michael Bowen** (Junior Software Engineer specializing in robotics, automation systems, and game engine architecture).

This document provides a comprehensive technical overview of the codebase, system architecture, core dependencies, data pipelines, and technical audit findings.

---

## 1. System Mission & Scope

Leanfolio serves as a fast, responsive, and minimalist portfolio site designed to present robotics engineering (FANUC CRX & M-Series, Roboguide digital twins, OpenCV vision, IO state machines) and interactive graphics / game programming projects (Unreal Engine 5, Unity, C++, BGFX/SDL2).

Originally adapted from the Cleanfolio template, Leanfolio leverages Next.js for hybrid static/server rendering, SEO customization, and dynamic project pages.

---

## 2. High-Level Architecture & Tech Stack

```
+-------------------------------------------------------------------+
|                        Next.js Application                        |
+---------------------------------+---------------------------------+
|          Pages Router           |         Context & State         |
|  - pages/[[...app]].js (Home)   |  - contexts/theme.js            |
|  - pages/projects/index.js      |    (Light/Dark Theme Provider)  |
|  - pages/projects/[id].js       |                                 |
+---------------------------------+---------------------------------+
|                       Component Layer                             |
|  - Navbar, About, Work, Projects, ProjectCard, ProjectPost        |
|  - Skills, Contact, Footer, ScrollToTop                           |
+---------------------------------+---------------------------------+
|                         Data Layer                                |
|  - data/portfolio.js (Content, Projects, Work, Skills, Social)    |
+-------------------------------------------------------------------+
```

### Core Technologies
- **Framework**: [Next.js](https://nextjs.org/) (v12.1.0) with Pages Router.
- **UI Library**: React (v17.0.2).
- **Styling**: Vanilla CSS modules & component stylesheets with CSS custom properties (`styles/App.css`, `styles/index.css`), complemented by `@material-ui/core` (v4.12.3) icons and components.
- **Syntax Highlighting & Rich Text**: `react-code-blocks` (v0.0.9) and `react-markdown` (v8.0.5) with `rehype-raw` for embedding rich code snippets and interactive demos.
- **Analytics & Telemetry**: Google Analytics (`lib/google-analytics.js`) and Smartlook client integration.

---

## 3. Directory Layout

| Directory / File | Description |
|---|---|
| [`components/`](file:///components) | Modular React UI components (About, Work, Projects, ProjectCard, ProjectPost, Skills, Contact, Navbar, Footer, ScrollToTop). |
| [`contexts/theme.js`](file:///contexts/theme.js) | React Context managing light/dark theme toggling, persisting preference to `localStorage`. |
| [`data/portfolio.js`](file:///data/portfolio.js) | Centralized content repository containing portfolio metadata, project logs, code snippets, and skills. |
| [`docs/`](file:///docs) | Documentation assets, preview animations, and strategic planning documents ([`ROADMAP.md`](file:///docs/ROADMAP.md)). |
| [`lib/google-analytics.js`](file:///lib/google-analytics.js) | Google Analytics 4 pageview event helpers. |
| [`pages/`](file:///pages) | Next.js Pages router endpoints: `[[...app]].js` (main page), `projects/index.js`, and dynamic `projects/[id].js`. |
| [`public/`](file:///public) | Static assets including resumes ([`public/Resumes/`](file:///public/Resumes)), images, and project thumbnails. |
| [`styles/`](file:///styles) | Component and global CSS style sheets defining CSS variables for light and dark themes. |
| [`review.md`](file:///review.md) | Stakeholder feedback and UX improvement notes. |
| [`AGENTS.md`](file:///AGENTS.md) | Autonomous agent protocols, worktree rules, and budget guardrails. |
| [`CHANGELOG.md`](file:///CHANGELOG.md) | Keep-a-Changelog audit trail of modifications. |

---

## 4. Key Subsystems & Execution Flow

### A. Theme Management
`contexts/theme.js` exposes `ThemeProvider` and `ThemeContext`. When users click the theme toggle in `Navbar.js`, the body class updates between `light` and `dark`. CSS variables in `styles/App.css` automatically recalculate background colors, text colors, and shadows.

### B. Routing & Dynamic Project Showcase
- **Home Route (`pages/[[...app]].js`)**: Mounts `Navbar`, `About`, `Work` (focusing on industrial automation & BOB palletizer), `Projects`, `Skills`, and `Contact`.
- **Dynamic Projects Route (`pages/projects/[id].js`)**: Extracts the `id` param via `getServerSideProps` and finds the corresponding entry from `ProjectsData` or `WorkData`. Renders `ProjectPost` with markdown support and C++/Unreal code blocks.

---

## 5. Technical Audit & Improvement Opportunities

During technical inspection of the current codebase, the following improvement vectors were identified:

1. **Hydration / SSR Bypass**:
   `[[...app]].js` and `projects/[id].js` conditionally return `null` until `isMounted` is true (`if (!isMounted) return null;`). This avoids theme hydration mismatch but bypasses server-side HTML rendering, impacting initial paint performance and SEO indexing.
2. **Monolithic Data File (`data/portfolio.js`)**:
   `data/portfolio.js` is over 440 lines long and mixes raw C++ code strings, JSON configs, markdown, work history, and project definitions in a single file. Decomposing into modular datasets (`data/work.js`, `data/projects.js`, `data/skills.js`) will improve maintainability.
3. **Legacy Dependency Stack**:
   The project runs Next.js 12, React 17, and `@material-ui/core` v4. Upgrading to modern Next.js and MUI v5 / modern Tailwind will provide better build times, security patches, and React 18/19 streaming features.
4. **Interactive Feature Desires (from `review.md`)**:
   User feedback highlighted adding a profile image to the intro, updating navbar contact to resume, and exploring real-time / local editing capabilities.

---

## 6. Strategic Roadmap & Proposed Issues

For the detailed multi-phase development plan and actionable proposed GitHub issues, see **[`docs/ROADMAP.md`](file:///docs/ROADMAP.md)**.
