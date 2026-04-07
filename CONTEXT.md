# ARKAN Theme — Technical Context for AI Models

> **Purpose:** This file provides comprehensive technical context so that any AI model
> (GitHub Copilot, ChatGPT, Claude, etc.) can fully understand the codebase, make
> accurate modifications, and generate correct code within this project.

---

## 1. Project Identity

| Field           | Value                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| **Name**        | ARKAN Theme (`arkan_theme`)                                                           |
| **Type**        | Frappe App (pure frontend theme — no DocTypes, no server models)                      |
| **Framework**   | Frappe v16 / ERPNext v16                                                              |
| **Language**    | JavaScript (ES5-compatible IIFEs) + SCSS (compiled to CSS) + Python (hooks/boot only) |
| **License**     | MIT                                                                                   |
| **Publisher**   | Arkan Labs (info@arkanlabs.com)                                                       |
| **Version**     | 16.2.0                                                                                |
| **Build**       | `pyproject.toml` with `flit_core` (no setup.py)                                       |
| **Python**      | >=3.14                                                                                |
| **Node**        | >=24                                                                                  |
| **Total Lines** | ~913 JS + SCSS across 13 JS modules + 20 SCSS partials (post-fv redesign)             |

---

## 2. What This App Does

ARKAN Theme is a **client-side-only branding layer** for ERPNext. It:

1. Injects CSS that overrides Frappe's default styles with futuristic cyber-tech aesthetics
2. Injects JavaScript that adds unique visual features (neural grid, splash, matrix rain, sounds)
3. Bridges frappe_visual's 307+ components to the ARKAN color palette via CSS variable mapping
4. Provides boot session data (version, brand name, logo URLs) via Python

It does **NOT**:

- Create any DocTypes or database tables
- Define any REST API endpoints
- Modify any Frappe or ERPNext core files
- Run any background jobs or scheduled tasks

---

## 3. How Frappe Apps Work (Essential Context)

### 3.1 Hook System

Every Frappe app has a `hooks.py` file that tells Frappe what to load. Key hooks used by this app:

```python
app_include_css = [...]   # CSS files loaded on every desk (app) page
app_include_js = [...]    # JS files loaded on every desk (app) page
web_include_css = [...]   # CSS files loaded on website/portal/login pages
web_include_js = [...]    # JS files loaded on website/portal/login pages
boot_session = "..."      # Python function called during session boot
```

### 3.2 Asset Loading

- Files in `arkan_theme/public/` are symlinked to `sites/assets/arkan_theme/`
- URLs use the pattern `/assets/arkan_theme/<path>`
- `bench build --app arkan_theme` copies assets and creates bundles
- `bench --site <site> clear-cache` clears server-side caches

### 3.3 Frappe JS Globals (Available at Runtime)

```javascript
frappe.boot; // Boot data (user, site, all boot_session data)
frappe.session; // Current session info
frappe.router; // SPA router — frappe.router.on('change', fn)
frappe.dom.freeze(); // Show loading overlay (overridden by arkan_loading.js)
frappe.dom.unfreeze(); // Hide loading overlay (overridden by arkan_loading.js)
frappe.after_ajax(); // Run callback after current AJAX requests complete
frappe.call(); // Make API call to server
frappe.ready(fn); // Execute when Frappe framework is ready
frappe.realtime; // Real-time event system
```

### 3.4 Critical Frappe 16 Limitation

**`frappe.request` is a plain object, NOT an event emitter.** Unlike some documentation suggests:

- `frappe.request.on('before', fn)` → **DOES NOTHING** (silently fails)
- `frappe.request.on('after', fn)` → **DOES NOTHING** (silently fails)

For AJAX lifecycle, use:

- `$(document).ajaxSend(fn)` — fires on every jQuery AJAX request (including heartbeat/polling)
- `$(document).ajaxComplete(fn)` — fires after every jQuery AJAX completes
- `frappe.after_ajax(fn)` — fires once when current pending requests complete

---

## 3.5 Frappe v16 Frontend Architecture (Critical)

Frappe v16 introduced radical frontend changes that affect how theme apps inject UI controls:

### Navbar is Gutted

- The `<header.navbar>` is now **almost empty on desktop** — only renders an announcement widget
- `.navbar-collapse`, `.navbar-nav`, `.standard-navbar-items`, `#navbar-breadcrumbs` are **GONE from desktop**
- The navbar still renders fully on **mobile** as a hamburger menu

### Sidebar is Primary Navigation

- New left sidebar: `.body-sidebar-container` → `.body-sidebar` → `.body-sidebar-top` + `.body-sidebar-bottom`
- Sidebar width: `50px` collapsed (icon rail), `220px` expanded (`var(--sidebar-width)`)
- Expanded state: `.body-sidebar-container.expanded` class
- The old `.desk-sidebar` / `.main-sidebar` classes are **GONE** — replaced by `.body-sidebar`
- Active sidebar items use `.active-sidebar` class (not `.selected` like v15)

### Workspace Pages

- `#page-Workspaces` is **GONE** — workspace pages use `.page-main-content` with dynamic IDs
- `.desk-page` only exists on EditorJS containers (`#editorjs.desk-page.page-main-content`)
- Widget content is inside `.main-section` or `.layout-main-section`

### Search

- Search is now a **modal dialog** (`frappe.get_modal()`), with `#navbar-search` input inside the modal
- The `.search-bar` element is a trigger that opens the modal

### URL Routing

- Desk URL prefix is `/desk/` (not `/app/`)
- Router handles backward compat by stripping both "desk" and "app" prefixes

### Dual-Target Injection Strategy

This theme uses a **sidebar-first, navbar-fallback** pattern:

- All theme controls (search trigger, dark mode, ambient sounds, PWA install) try to inject into `.body-sidebar-bottom` first
- If sidebar not found, falls back to `.navbar-collapse .navbar-nav` for mobile/legacy
- Sidebar-injected items use `.arkan-sidebar-action` class with `.item-anchor` + `.sidebar-item-icon` + `.sidebar-item-label` structure
- When sidebar is collapsed, labels are hidden and icons are centered

### Key CSS Variables (v16)

```
--navbar-height: 48px          (unchanged from v15)
--page-head-height: 45px       (new in v16)
--sidebar-width: 220px         (new in v16)
--sidebar-hover-color: #f3f3f3
--sidebar-active-color: rgba(255,255,255,1)
--sidebar-border-color: #ededed
```

---

## 4. File-by-File Reference

### 4.1 Python Files

#### `hooks.py`

```
Purpose: Registers all CSS/JS assets with Frappe's hook system
Key Config:
  - app_include_js: 1 file (arkan_theme.bundle.js — 13 modules concatenated)
  - app_include_css: 2 files (arkan.bundle.css, arkan-theme.css)
  - web_include_js: 2 files (login, skyline)
  - web_include_css: 1 file (arkan.css)
  - boot_session: points to boot.boot_session
  - website_context: brand_name + favicon
  - required_apps: ["frappe", "frappe_visual"]
  - Version: 16.2.0
```

#### `boot.py` (10 lines)

```
Purpose: Adds arkan_theme data to frappe.boot during session initialization
Exports: bootinfo.arkan_theme = { version, brand_name, logo_url, favicon_url }
Access: frappe.boot.arkan_theme in browser JavaScript
```

### 4.2 JavaScript Files (13 modules → 1 bundle)

All JS files use **IIFE pattern** with `'use strict'`.
All modules attach to the `window.arkan` namespace.
Build via `build_bundle.sh` → `arkan_theme.bundle.js` (38KB).

**Post-redesign (v16.2.0):** 14 modules were deleted and delegated to frappe_visual.

#### `arkan_theme.js` (~126 lines) — ENTRY POINT

```
Namespace: window.arkan (root)
Initialization: DOMContentLoaded + frappe.ready()
Exports:
  arkan.config           — { version, brandName, paths{}, colors{}, animations{} }
  arkan.init()           — Main initialization (neural grid, splash, matrix, sounds, navbar)
  arkan.initFavicon()    — Replace browser favicons
  arkan.initMetaTags()   — Title observer ("| ARKAN") + theme-color meta
  arkan.initEventListeners() — Router change + reduced-motion
  arkan.onPageChange()   — page-content-enter CSS animation
  arkan.updateTimeAwareTheme() — arkan-day/arkan-night body classes
Note: Does NOT init darkmode, effects, loading, shortcuts, workspace — all delegated to fv_integration.js
```

#### `fv_integration.js` (~230 lines) — FRAPPE_VISUAL BRIDGE

```
Namespace: arkan.darkmode, arkan.loading, arkan.workspace, arkan.forms
Purpose: Central bridge between ARKAN theme and frappe_visual 307+ components
Exports:
  arkan.darkmode.isDark()    — Boolean: check current mode
  arkan.darkmode.setMode(m)  — Set 'dark'/'light', persist localStorage, dispatch event
  arkan.darkmode.toggle()    — Toggle between modes
  arkan.loading.show(msg)    — Glass-effect loading overlay
  arkan.loading.remove()     — Remove loading overlay
  arkan.workspace.init()     — Welcome banner + widget stagger
  arkan.forms.enhanceTimeline() — IntersectionObserver reveal
Auto-init on app_ready:
  - Dark mode initialization (localStorage-backed)
  - Workspace welcome banner
  - Lazy-load frappe_visual.bundle.js
  - Configure auto-enhancers (formEnhancer, listEnhancer, workspaceEnhancer)
  - Register keyboard shortcuts via frappe.visual.shortcutManager
  - Setup mobile bottomNav via frappe.visual.bottomNav
  - Override frappe.dom.freeze/unfreeze
page-change handler:
  - Route to settings/reports generators
```

#### `arkan_navbar.js` (~93 lines) — SIDEBAR GLOW & DARK TOGGLE

```
Namespace: arkan.navbar
Exports:
  arkan.navbar.init()   — Web navbar glow line + desk sidebar glow + dark toggle
Internal:
  _enhanceWebNavbar()   — Adds gradient glow line to .navbar (portal/login)
  _enhanceDeskSidebar() — Adds vertical glow edge to .body-sidebar
  _addDarkModeToggle()  — Injects ☀️/🌙 toggle button in sidebar bottom
```

#### Remaining Unique Modules (kept — not replaceable by frappe_visual):

- `arkan_neural_grid.js` (120 lines) — SVG neural network animation
- `arkan_splash.js` (73 lines) — One-time branded splash screen
- `arkan_matrix.js` (70 lines) — Matrix rain canvas effect
- `arkan_sounds.js` (55 lines) — Ambient sound system
- `arkan_interactive_grid.js` (29 lines) — Interactive grid background
- `arkan_minigame.js` (28 lines) — Easter egg minigame
- `arkan_animated_favicon.js` (28 lines) — Animated favicon
- `arkan_pwa.js` (23 lines) — PWA installation prompt
- `arkan_print_headers.js` (18 lines) — Print header customization
- `arkan_seasons.js` (20 lines) — Seasonal themes

### 4.3 SCSS Files (20 partials → arkan.css)

All SCSS files use `$arkan-*` variables and `var(--arkan-*)` custom properties.
Import order matters — defined in `arkan.scss`.

#### `_variables.scss`

```
Defines:
  SCSS Variables: $arkan-cyan (#00F0FF), $arkan-purple (#8B5CF6), $arkan-deep-black (#0A0F1C)
  Semantic: $arkan-success, $arkan-danger, $arkan-warning
  Transitions: $arkan-transition-fast (150ms), -base (250ms), -slow (400ms)
  CSS Custom Properties: All above as --arkan-* on :root
  frappe_visual Bridge: 15 --fv-* variables mapped from ARKAN tokens
  Light Mode: body.arkan-light-mode overrides for --fv-* variables
Mixins:
  @include arkan-glass, arkan-card-elevated, arkan-focus-ring
```

#### `_fv-overrides.scss` (NEW — 165 lines)

```
Styles frappe_visual auto-enhancer output for ARKAN palette:
  .fv-form-stats-ribbon, .fv-list-view-toggle, .fv-workspace-card
  .fv-bilingual-tooltip, .fv-command-bar, .fv-bottom-nav
  .fv-onboarding-tour, .fv-floating-window, .fv-storyboard
```

#### `_fv-scene.scss` (NEW — 85 lines)

```
Scene Engine overrides: .fv-scene-frame, .fv-scene-label, .fv-scene-value
Status colors + .fv-scene-navigator, .fv-scene-exporter
```

#### `_fv-effects.scss` (NEW — 120 lines)

```
Customizes ALL .fv-fx-* classes for ARKAN colors:
  .fv-fx-glass, .fv-fx-hover-lift, .fv-fx-mouse-glow
  .fv-fx-gradient-animated, .fv-fx-gradient-text, .fv-fx-morph-blob
```

#### `_layout.scss` (~1,450 lines) — LARGEST SCSS

```
Sidebar, Page Head, Workspace, Search, Mobile.
All directional properties use CSS Logical Properties.
```

#### `_splash.scss` — Splash overlay + loading + #freeze hide

#### `_login.scss` — Login page (RTL-safe via logical properties)

#### `_rtl.scss` — RTL overrides for Frappe core physical-property CSS

---

## 5. Module Interaction Diagram (v16.2.0 — post frappe_visual redesign)

```
┌─────────────────────────────────────────────────────┐
│                    Frappe 16 Core                     │
│  frappe.router.on('change')  frappe.dom.freeze()     │
│  frappe.after_ajax()         frappe.ready()           │
└──────────┬───────────────────────────┬───────────────┘
           │                           │
     ┌─────▼─────┐              ┌─────▼─────┐
     │  hooks.py  │              │  boot.py   │
     │ (1 bundle) │              │ (session)  │
     └─────┬──────┘              └────────────┘
           │
    ┌──────┴──────────────────────────────────────┐
    │    arkan_theme.bundle.js (13 modules)        │
    ├─────────────────────────────────────────────┤
    │                                              │
    │  arkan_theme.js ◄── ENTRY POINT             │
    │       │  Config, favicon, meta, router        │
    │       │                                       │
    │       ├── fv_integration.js ◄── FV BRIDGE    │
    │       │     Dark mode, loading, workspace     │
    │       │     Lazy-loads frappe_visual.bundle.js│
    │       │     Configures auto-enhancers         │
    │       │     Registers shortcuts, bottomNav    │
    │       │     Settings/reports generators       │
    │       │                                       │
    │       ├── arkan_navbar.js                     │
    │       │     Sidebar glow + dark mode toggle   │
    │       │                                       │
    │       ├── arkan_neural_grid.js                │
    │       │     SVG neural network animation      │
    │       │                                       │
    │       ├── arkan_splash.js                     │
    │       │     One-time branded splash            │
    │       │                                       │
    │       ├── arkan_matrix.js                     │
    │       │     Matrix rain canvas effect          │
    │       │                                       │
    │       ├── arkan_sounds.js                     │
    │       │     Ambient sound system               │
    │       │                                       │
    │       └── 6 smaller modules                   │
    │           (grid, minigame, favicon, pwa,       │
    │            print_headers, seasons)              │
    ├─────────────────────────────────────────────┤
    │        frappe_visual (lazy-loaded)            │
    │  307+ components, auto-enhancers, icons       │
    │  formEnhancer, listEnhancer, workspaceEnhancer│
    │  ThemeManager, SceneEngine, CSS effects        │
    └─────────────────────────────────────────────┘
```

---

## 6. Naming Conventions

| Element               | Convention                   | Examples                                            |
| --------------------- | ---------------------------- | --------------------------------------------------- |
| JS Namespace          | `arkan.<module>.<method>`    | `arkan.neuralGrid.create()`, `arkan.loading.show()` |
| CSS Custom Properties | `--arkan-<token>`            | `--arkan-gold`, `--arkan-navy-deep`                 |
| SCSS Variables        | `$arkan-<token>`             | `$arkan-gold`, `$arkan-transition-base`             |
| SCSS Mixins           | `arkan-<name>`               | `arkan-glass`, `arkan-focus-ring`                   |
| DOM IDs               | `arkan-<feature>-<element>`  | `#arkan-splash-overlay`, `#arkan-search-input`      |
| CSS Classes           | `arkan-<feature>-<modifier>` | `.arkan-loading-visible`, `.arkan-search-btn`       |
| Body Classes          | `arkan-<state>`              | `.arkan-day`, `.arkan-night`                        |
| JS Files              | `arkan_<module>.js`          | `arkan_theme.js`, `arkan_skyline.js`                |
| SCSS Files            | `_<feature>.scss`            | `_variables.scss`, `_layout.scss`                   |
| Image Files           | Descriptive lowercase        | `logo-header.png`, `favicon-32x32.png`              |

---

## 7. Common Patterns

### 7.1 Module Registration

```javascript
(function () {
  "use strict";
  window.arkan = window.arkan || {};
  arkan.myModule = {
    init: function () {
      /* ... */
    },
    // ...
  };
  // Boot logic at bottom
})();
```

### 7.2 Frappe API Check Before Use

```javascript
if (typeof frappe !== "undefined" && frappe.router && frappe.router.on) {
  frappe.router.on("change", function () {
    /* ... */
  });
}
```

### 7.3 Safety Timers

All overlays have hard timeouts to guarantee removal:

```javascript
this._safetyTimer = setTimeout(function () {
  self.remove();
}, 3000);
```

### 7.4 Reduced Motion Respect

```javascript
if (arkan.prefersReducedMotion && arkan.prefersReducedMotion()) return;
```

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### 7.5 Login Page Detection

```javascript
arkan.isLoginPage = function () {
  return (
    document.body.getAttribute("data-path") === "login" ||
    window.location.pathname.includes("/login")
  );
};
```

### 7.6 SCSS Mixin Usage

```scss
.my-element {
  @include arkan-glass; // Glassmorphism background
  @include arkan-gold-glow; // Gold glow shadow
  @include arkan-focus-ring; // Focus accessibility ring
}
```

---

## 8. Known Gotchas & Critical Knowledge

1. **`frappe.request.on()` DOES NOT WORK** in Frappe. It's a plain object. Use jQuery AJAX hooks or `frappe.after_ajax()` instead.

2. **`#freeze` element** — Frappe creates `<div id="freeze" class="modal-backdrop fade">` when `frappe.dom.freeze()` is called. If our override wasn't loaded yet, this element persists. That's why we have CSS `#freeze { display: none !important }` and periodic cleanup.

3. **jQuery `ajaxSend`/`ajaxComplete`** fire for ALL requests including heartbeat polling and realtime. Using these to show/hide an overlay causes it to never disappear.

4. **Script load order** — `hooks.py` `app_include_js` array determines load order. `arkan_theme.js` must be first (sets up namespace). `arkan_skyline.js` must load before `arkan_splash.js` and `arkan_login.js` (they call `arkan.neuralGrid.create()`).

5. **SCSS compilation** is NOT automatic. After editing `.scss` files, you must run `npx sass` manually, then `bench build`. The Frappe `bench watch` only watches for JS changes.

6. **Asset symlink** — `bench build` creates symlinks from `sites/assets/arkan_theme/` → `apps/arkan_theme/arkan_theme/public/`. Direct file edits in `public/` are immediately visible without rebuild for JS/CSS (but cache must be cleared).

7. **Awesomplete** — Frappe uses the Awesomplete library for autocomplete. Our search overlay clones its results via polling (not MutationObserver, which caused infinite loops).

8. **`sessionStorage` vs `localStorage`** — Splash uses `sessionStorage` (per-tab, cleared on tab close). This means splash shows once per new tab/window, which is intentional.

---

## 9. How to Add a New Feature

1. **New JS module:** Create `arkan_<name>.js` in `public/js/`, use IIFE + `arkan.<name>` namespace, add to `hooks.py` `app_include_js`
2. **New SCSS partial:** Create `_<name>.scss` in `public/scss/`, add `@import '<name>'` to `arkan.scss` in correct dependency order
3. **New image:** Place in `public/images/`, reference via `/assets/arkan_theme/images/<file>`
4. **Build:** `npx sass scss/arkan.scss css/arkan.css --style compressed --source-map && bench build --app arkan_theme && bench --site dev.localhost clear-cache`

---

## 10. Build & Test Workflow

```bash
# 1. Edit SCSS/JS files
# 2. Compile SCSS
cd /workspace/development/frappe-bench/apps/arkan_theme/arkan_theme/public
npx sass scss/arkan.scss css/arkan.css --style compressed --source-map

# 3. Build Frappe assets
cd /workspace/development/frappe-bench
bench build --app arkan_theme

# 4. Clear cache
bench --site dev.localhost clear-cache

# 5. Hard refresh browser (Ctrl+Shift+R)
```

---

_Last updated: 2025 — Generated for AI model consumption_
