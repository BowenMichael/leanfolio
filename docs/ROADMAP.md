# Leanfolio — Development Roadmap & Proposed Issues

This roadmap defines the strategic progression for **Leanfolio**, aligning developer experience, modernization goals, and feedback from [`review.md`](file:///review.md).

---

## 1. Strategic Development Milestones

```
+-----------------------------------------------------------------------------------+
| Phase 1: Architecture & Modularization                                            |
| - Decompose data/portfolio.js into domain modules                                 |
| - Eliminate SSR hydration bypass in pages/[[...app]].js                           |
| - Modernize lint/build configurations                                             |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| Phase 2: UX Enhancements & Portfolio Polish                                       |
| - Incorporate personal hero visuals & "About Me" section (per review.md)          |
| - Streamline Navigation (Resume link direct access)                               |
| - Implement responsive layout & accessibility hardening                           |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| Phase 3: Interactive Visualizations & Live Editing                                |
| - Robotics digital twin / 3D model viewer (Three.js / WebGL)                      |
| - Real-time client-side preview / local content editing                           |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| Phase 4: Core Framework Modernization & CI/CD                                     |
| - Migrate to Next.js 14+ / React 18+ & modern component library                   |
| - Automated testing pipeline (Jest, RTL, Playwright E2E)                          |
+-----------------------------------------------------------------------------------+
```

---

## 2. Proposed Development Issues

The following backlog of issues is proposed to systematically progress development:

### Issue 1: Decompose `data/portfolio.js` into Modular Content Files
- **Goal**: Adhere to AGENTS.md anti-monolith guidelines and isolate domains.
- **Description**: Break the 448-line `data/portfolio.js` into:
  - `data/about.js`: Bio, social links, resume references.
  - `data/work.js`: Industrial robotics & Rigorous Technology projects.
  - `data/projects.js`: Game development and graphics engine projects.
  - `data/skills.js`: Categorized skills and routing tags.
  - `data/codeSnippets.js`: C++ and BGFX render strings.
- **Acceptance Criteria**:
  - [ ] No single data file exceeds 150 lines.
  - [ ] Central index `data/index.js` or `data/portfolio.js` re-exports modular files without breaking imports.

### Issue 2: Fix SSR Hydration Bypass & Route Hash Animation Bug
- **Goal**: Enable true Server-Side Rendering (SSR) for search engines and instant initial load.
- **Description**: Currently, `pages/[[...app]].js` returns `null` if not mounted, disabling SSR. Additionally, the hash check `window.location.href === '#projects' || '#skills'` is syntactically flawed. Replace with clean CSS theme attribute injection (`data-theme`) and standard Next.js router hooks.
- **Acceptance Criteria**:
  - [ ] HTML contains initial markup on first server render without layout flash.
  - [ ] Theme switches seamlessly without full page mount blocking.

### Issue 3: Implement UX Improvements from Stakeholder Review
- **Goal**: Incorporate actionable improvements documented in `review.md`.
- **Description**:
  1. Add personal profile image in hero section (`About.js`).
  2. Update Navbar to provide direct "Resume" view/download link.
  3. Expand "About Me" section highlighting systems engineering and robotics focus.
- **Acceptance Criteria**:
  - [ ] Hero section features portrait visual with responsive fallback.
  - [ ] Navbar links directly to current active resume in `/Resumes/`.
  - [ ] Expanded bio section matches target roles from `review.md`.

### Issue 4: Upgrade Next.js & Migrate Legacy Material-UI v4
- **Goal**: Eliminate deprecated packages, improve build times, and harden security.
- **Description**: Migrate `@material-ui/core` (v4) to modern MUI v5 or clean Tailwind CSS, and update Next.js from v12 to modern Next.js.
- **Acceptance Criteria**:
  - [ ] No deprecated `@material-ui/core` dependencies remain.
  - [ ] `npm run build` runs cleanly without legacy peer dependency warnings.

### Issue 5: Implement Automated Unit & E2E Testing Suite
- **Goal**: Ensure regression-free autonomous agent workflows.
- **Description**: Configure Jest with React Testing Library for component smoke tests, along with GitHub Actions CI pipeline running lint and build on all pull requests.
- **Acceptance Criteria**:
  - [ ] Smoke tests for `Navbar`, `About`, `ProjectCard`, and dynamic routes.
  - [ ] `npm test` runs with log suppression adhering to user global rules.
