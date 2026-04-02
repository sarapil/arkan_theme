# ARKAN Theme — Technical Context for AI Models

> **Purpose:** This file provides comprehensive technical context so that any AI model
> (GitHub Copilot, ChatGPT, Claude, etc.) can fully understand the codebase, make
> accurate modifications, and generate correct code within this project.

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Name** | ARKAN Theme (`arkan_theme`) |
| **Type** | Frappe App (pure frontend theme — no DocTypes, no server models) |
| **Framework** | Frappe v16 / ERPNext v16 |
| **Language** | JavaScript (ES5-compatible IIFEs) + SCSS (compiled to CSS) + Python (hooks/boot only) |
| **License** | MIT |
| **Publisher** | Arkan Labs (info@arkanlabs.com) |
| **Version** | 16.0.0 |
| **Build** | `pyproject.toml` with `flit_core` (no setup.py) |
| **Python** | >=3.14 |
| **Node** | >=24 |
| **Total Lines** | ~7,676 across 22 source files |

---

## 2. What This App Does

ARKAN Theme is a **client-side-only branding layer** for ERPNext. It:

1. Injects CSS that overrides Frappe's default styles with luxury real estate aesthetics
2. Injects JavaScript that adds visual features (skyline, splash, particles, search overlay)
3. Provides boot session data (version, brand name, logo URLs) via Python

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
frappe.boot          // Boot data (user, site, all boot_session data)
frappe.session       // Current session info
frappe.router        // SPA router — frappe.router.on('change', fn)
frappe.dom.freeze()  // Show loading overlay (overridden by arkan_loading.js)
frappe.dom.unfreeze()// Hide loading overlay (overridden by arkan_loading.js)
frappe.after_ajax()  // Run callback after current AJAX requests complete
frappe.call()        // Make API call to server
frappe.ready(fn)     // Execute when Frappe framework is ready
frappe.realtime      // Real-time event system
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

#### `hooks.py` (47 lines)
```
Purpose: Registers all CSS/JS assets with Frappe's hook system
Key Config:
  - app_include_js: 6 files (theme, skyline, effects, splash, loading, navbar)
  - app_include_css: 1 file (arkan.css)
  - web_include_js: 2 files (login, skyline)
  - web_include_css: 1 file (arkan.css)
  - boot_session: points to boot.boot_session
  - website_context: brand_name + favicon
  - required_apps: ["frappe"]
```

#### `boot.py` (10 lines)
```
Purpose: Adds arkan_theme data to frappe.boot during session initialization
Exports: bootinfo.arkan_theme = { version, brand_name, logo_url, favicon_url }
Access: frappe.boot.arkan_theme in browser JavaScript
```

### 4.2 JavaScript Files

All JS files use **IIFE pattern** (Immediately Invoked Function Expression) with `'use strict'`.
All modules attach to the `window.arkan` namespace.

#### `arkan_theme.js` (263 lines) — ENTRY POINT
```
Namespace: window.arkan (root)
Initialization: DOMContentLoaded + frappe.ready()
Exports:
  arkan.config           — { version, brandName, paths{}, colors{}, animations{} }
  arkan.init()           — Main initialization
  arkan.initFavicon()    — Replace browser favicons (5 sizes: 16/32/48/ico/192)
  arkan.initMetaTags()   — Title observer ("| ARKAN") + theme-color meta
  arkan.initAccessibility() — Skip link + ARIA role="main"
  arkan.initEventListeners() — Router change + reduced-motion + time updater
  arkan.onPageChange()   — page-content-enter CSS animation trigger
  arkan.updateTimeAwareTheme() — arkan-day/arkan-night body classes (6am–6pm)
  arkan.showSuccessFlash(el) — Flash animation utility
  arkan.initEasterEgg()  — Konami code → console log
  arkan.isLoginPage()    — Boolean: checks body class + URL
  arkan.prefersReducedMotion() — Boolean: checks config flag
Dependencies: frappe.router, frappe.boot, frappe.ready
```

#### `arkan_skyline.js` (1,023 lines) — LARGEST MODULE
```
Namespace: arkan.neuralGrid
Exports:
  arkan.neuralGrid.create(container, options) — Build full skyline SVG
    Options: { fullScene, showStars, showWater, showReflections, animated }
  arkan.neuralGrid.config — { viewBox, skyHeight, waterHeight, buildingColor, waterColor }
Internal Methods:
  createSVG()          — Base SVG element with viewBox="0 0 1920 600"
  addDefs(svg)         — Gradient definitions (sky, water, gold glow)
  addSky(svg)          — Sky background rectangle
  addBuildings(svg)    — All building silhouettes
  addBurjKhalifa(g)    — Needle at y=30, detailed spire
  addBurjAlArab(g)     — Sail-shaped silhouette with helipad
  addDubaiFrame(g)     — Rectangular frame with viewing deck
  addCayanTower(g)     — Twisted tower silhouette
  addGenericTowers(g)  — 15+ varied rectangular buildings
  addBuildingWindows(g) — Gold window dots with <animate> opacity
  addWater(svg, animated) — Water gradient + animated reflections
  addReflections(svg)  — Building reflections in water
  createLinearGradient() — Helper for SVG gradient creation
  createRect() / createPath() — SVG shape helpers
Used by: arkan_splash.js, arkan_login.js, _layout.scss (workspace background)
Note: Defines arkan.isLoginPage and arkan.prefersReducedMotion fallbacks
      for contexts where arkan_theme.js hasn't loaded (login/web pages)
```

#### `arkan_effects.js` (371 lines)
```
Namespace: arkan.effects
Exports:
  arkan.effects.init(container)    — Start canvas effects
  arkan.effects.stop()             — Stop all animations, remove canvas
  arkan.effects.enableGoldDust()   — Enable floating gold particles
  arkan.effects.initWindowLights() — Building window glow effect
Internal:
  createCanvas()       — Canvas element with absolute positioning
  resizeCanvas()       — Window resize handler
  initStars()          — 80/50/25 stars (desktop/tablet/mobile)
  initParticles()      — 20 gold dust particles
  drawStars(timestamp) — Render with sine-wave shimmer (40% chance)
  drawParticles(dt)    — Upward floating particles with wrap-around
  createShootingStar() — Random spawn, gradient trail
  drawShootingStars(dt) — Render with opacity fade
  startAnimation()     — requestAnimationFrame loop
Config: arkan.effects.config.stars.{count, tabletCount, mobileCount, ...}
Auto-init: Only on login pages (checks arkan.isLoginPage())
```

#### `arkan_splash.js` (207 lines)
```
Namespace: arkan.splash
Exports:
  arkan.splash.init()       — Show splash (if conditions met)
  arkan.splash.forceShow()  — Dev: bypass session check
  arkan.splash.reset()      — Dev: clear session flag
Internal:
  create()            — Build overlay DOM (#arkan-splash-overlay)
  animate()           — Sequenced animation (logo → underline → tagline)
  fadeOut()            — Opacity transition + pointer-events: none
  remove()            — Remove from DOM + clear safety timer
  startSafetyTimer()  — 5s hard timeout (guaranteed removal)
  _injectSkyline()    — Embed arkan.neuralGrid.create() as background
Config: arkan.splash.config.{sessionKey, displayTime:2800, fadeOutTime:500, maxTimeout:5000}
Session Key: 'arkan_splash_shown' in sessionStorage
Skip Conditions: sessionStorage set, login page, non-desk page, reduced-motion
Safety: Flag set BEFORE animation; try/catch around create/animate; 5s timeout
```

#### `arkan_loading.js` (145 lines)
```
Namespace: arkan.loading
Exports:
  arkan.loading.init()    — Override freeze/unfreeze, start cleanup
  arkan.loading.show()    — Create and show loading overlay
  arkan.loading.remove()  — Fade out and remove overlay
Internal:
  _cleanupFrappeFreeze()  — Remove stuck #freeze + orphaned .modal-backdrop
  _safetyTimer             — 3s auto-remove timeout
Boot: Polls for frappe.dom and frappe.after_ajax every 200ms
Overrides:
  frappe.dom.freeze(msg) → self.show()
  frappe.dom.unfreeze()  → self.remove()
Router: frappe.router.on('change') → show() + frappe.after_ajax → remove()
Cleanup: setInterval(2000) removes stuck #freeze and excess .modal-backdrop
CSS Dependency: #freeze { display: none !important } in _splash.scss
DOM ID: #arkan-loading-overlay
```

#### `arkan_navbar.js` (341 lines)
```
Namespace: arkan.navbar
Exports:
  arkan.navbar.init()        — Bootstrap navbar enhancements
  arkan.navbar.openSearch()  — Open/toggle search overlay
  arkan.navbar.closeSearch() — Close search overlay
Internal:
  wrapSearchBar()      — Hide .search-bar, inject SVG search icon
  hideHelp()           — display:none on .dropdown-help
  patchNotifications() — Add has-unseen class, poll every 3s
  patchChat()          — Add arkan-chat class
  _repositionDropdown() — Poll Awesomplete results every 200ms
Boot: DOMContentLoaded + toolbar_setup event
Keyboard: Ctrl+G (capture phase) opens search, ESC closes
DOM IDs: #arkan-search-overlay, #arkan-search-input
Proxy: Mirrors typing to #navbar-search (Frappe's hidden AwesomeBar)
```

#### `arkan_login.js` (261 lines)
```
Namespace: arkan.login
Exports:
  arkan.login.init()       — Initialize login page enhancements
Internal:
  isLoginPage()        — Check body data-path + URL
  injectSkyline()      — arkan.neuralGrid.create() or fallback SVG
  createFallbackSkyline() — Inline SVG with landmarks
  createWindowLights() — Random gold dots on building silhouettes
  injectParticles()    — Canvas particle system (35 particles)
  injectBrandFooter()  — "© 2026 Arkan. All rights reserved."
  enhanceLogo()        — Replace login logo src + heading text
DOM IDs: #arkan-login-skyline, #arkan-login-particles, #arkan-login-brand
```

### 4.3 SCSS Files

All SCSS files use `$arkan-*` variables and `var(--arkan-*)` custom properties.
Import order matters — defined in `arkan.scss`.

#### `_variables.scss` (125 lines)
```
Defines:
  SCSS Variables: $arkan-gold, $arkan-navy, $arkan-cream + variants
  Semantic: $arkan-success (#2D6A4F), $arkan-danger (#9B1B30)
  Transitions: $arkan-transition-fast (150ms), -base (250ms), -slow (400ms)
  Shadows: $arkan-shadow-sm/md/lg
  Radii: $arkan-radius-sm (3px) / md (4px) / lg (6px) / full (9999px)
  CSS Custom Properties: All above exposed as --arkan-* on :root
  Component tokens: --navbar-height (48px), --sidebar-width (220px)
Mixins:
  @include arkan-glass     → rgba(29,41,57,0.8) + blur(20px)
  @include arkan-card-elevated → cream bg + shadow + radius
  @include arkan-gold-glow → box-shadow gold 0.3 opacity
  @include arkan-focus-ring → gold border + 3px ring
Media Query: prefers-reduced-motion: reduce → disables all animations
```

#### `_layout.scss` (~1,450 lines) — LARGEST SCSS
```
Sections:
  Navbar:              rgba(17,24,39,0.8) + backdrop-filter blur(20px) (mobile only in v16)
  Sidebar (v15):       .layout-side-section — Linear gradient navy-deep to navy-light (form/list sidebars)
  Sidebar (v16):       .body-sidebar-container — Primary nav sidebar with gold accents, .active-sidebar states
  Sidebar Actions:     .arkan-sidebar-action — Theme controls (search, darkmode, ambient, PWA) in sidebar bottom
  Page Head:           Glassmorphism (0.82 opacity) + subtle border-bottom
  Workspace:           .page-main-content + #page-Workspaces (dual selector for v15/v16 compat)
  Layout Main:         0.92 opacity cream background
  Search Overlay:      Glassmorphism panel styling for arkan_navbar.js
  Notifications:       Bell swing animation, unseen indicator
  Mobile (<768px):     Responsive sidebar, collapsed navbar
  Sidebar Toggle:      Custom button with gold hover
Important Rules:
  .navbar { position: sticky; top: 0; z-index: 1030; }
  .body-sidebar { v16 primary nav with dark gradient + gold accents }
  .page-head { position: sticky; top: var(--navbar-height); }
```

#### `_splash.scss` (188 lines)
```
Contains:
  #arkan-splash-overlay — Full-screen fixed overlay z-index: 99999
  .arkan-loading-overlay — Loading indicator z-index: 99998
  .arkan-loading-ring — Gold spinning ring animation
  .arkan-loading-visible — Opacity transition
  .arkan-loading-fadeout — Exit animation
  #freeze { display: none !important } — CRITICAL: hides Frappe's native freeze
  .modal-backdrop orphan protection
```

---

## 5. Module Interaction Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Frappe 16 Core                     │
│  frappe.router.on('change')  frappe.dom.freeze()     │
│  frappe.after_ajax()         frappe.ready()           │
│  frappe.boot                 $(document).ajaxSend()   │
└──────────┬───────────────────────────┬───────────────┘
           │                           │
     ┌─────▼─────┐              ┌─────▼─────┐
     │  hooks.py  │              │  boot.py   │
     │ (includes) │              │ (session)  │
     └─────┬──────┘              └────────────┘
           │
    ┌──────┴──────────────────────────────────────┐
    │           Desk Pages (app_include_*)         │
    ├─────────────────────────────────────────────┤
    │                                              │
    │  arkan_theme.js ◄── ENTRY POINT             │
    │       │  Sets up namespace, config            │
    │       │  Initializes favicon, meta, a11y      │
    │       │                                       │
    │       ├── arkan_skyline.js                    │
    │       │     Creates SVG skyline (used by       │
    │       │     splash, login, and workspace)      │
    │       │                                        │
    │       ├── arkan_effects.js                    │
    │       │     Canvas stars & particles            │
    │       │     (auto-init on login only)           │
    │       │                                        │
    │       ├── arkan_splash.js                     │
    │       │     One-time branded splash             │
    │       │     Uses arkan.neuralGrid.create()        │
    │       │                                        │
    │       ├── arkan_loading.js                    │
    │       │     Overrides frappe.dom.freeze/unfreeze│
    │       │     Cleans up stuck #freeze elements    │
    │       │                                        │
    │       └── arkan_navbar.js                     │
    │             Custom search overlay               │
    │             Proxies to Frappe AwesomeBar        │
    │                                                │
    ├─────────────────────────────────────────────┤
    │           Web/Login (web_include_*)           │
    │                                                │
    │  arkan_login.js                               │
    │       Uses arkan.neuralGrid.create()             │
    │       Has its own fallback SVG                 │
    │                                                │
    │  arkan_skyline.js                             │
    │       Loaded on web pages too for login use    │
    ├─────────────────────────────────────────────┤
    │                                                │
    │  arkan.css  (compiled from arkan.scss)        │
    │       All 12 SCSS partials merged               │
    │       Loaded on ALL pages (desk + web)          │
    └─────────────────────────────────────────────┘
```

---

## 6. Naming Conventions

| Element | Convention | Examples |
|---------|-----------|----------|
| JS Namespace | `arkan.<module>.<method>` | `arkan.neuralGrid.create()`, `arkan.loading.show()` |
| CSS Custom Properties | `--arkan-<token>` | `--arkan-gold`, `--arkan-navy-deep` |
| SCSS Variables | `$arkan-<token>` | `$arkan-gold`, `$arkan-transition-base` |
| SCSS Mixins | `arkan-<name>` | `arkan-glass`, `arkan-focus-ring` |
| DOM IDs | `arkan-<feature>-<element>` | `#arkan-splash-overlay`, `#arkan-search-input` |
| CSS Classes | `arkan-<feature>-<modifier>` | `.arkan-loading-visible`, `.arkan-search-btn` |
| Body Classes | `arkan-<state>` | `.arkan-day`, `.arkan-night` |
| JS Files | `arkan_<module>.js` | `arkan_theme.js`, `arkan_skyline.js` |
| SCSS Files | `_<feature>.scss` | `_variables.scss`, `_layout.scss` |
| Image Files | Descriptive lowercase | `logo-header.png`, `favicon-32x32.png` |

---

## 7. Common Patterns

### 7.1 Module Registration
```javascript
(function() {
    'use strict';
    window.arkan = window.arkan || {};
    arkan.myModule = {
        init: function() { /* ... */ },
        // ...
    };
    // Boot logic at bottom
})();
```

### 7.2 Frappe API Check Before Use
```javascript
if (typeof frappe !== 'undefined' && frappe.router && frappe.router.on) {
    frappe.router.on('change', function() { /* ... */ });
}
```

### 7.3 Safety Timers
All overlays have hard timeouts to guarantee removal:
```javascript
this._safetyTimer = setTimeout(function() { self.remove(); }, 3000);
```

### 7.4 Reduced Motion Respect
```javascript
if (arkan.prefersReducedMotion && arkan.prefersReducedMotion()) return;
```
```scss
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### 7.5 Login Page Detection
```javascript
arkan.isLoginPage = function() {
    return document.body.getAttribute('data-path') === 'login' ||
           window.location.pathname.includes('/login');
};
```

### 7.6 SCSS Mixin Usage
```scss
.my-element {
    @include arkan-glass;       // Glassmorphism background
    @include arkan-gold-glow;   // Gold glow shadow
    @include arkan-focus-ring;  // Focus accessibility ring
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

*Last updated: 2025 — Generated for AI model consumption*
