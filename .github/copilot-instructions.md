# ARKAN Theme — Copilot Instructions

> Context file for GitHub Copilot and other AI assistants working in this codebase.

## Project Overview

**ARKAN Theme** is a pure frontend branding theme for Frappe v16 / ERPNext v16. It injects CSS overrides and standalone JavaScript to transform ERPNext into a luxury real estate experience. There are no DocTypes, no database models, no REST APIs — only hooks.py, boot.py, SCSS, JavaScript, and images.

## Architecture

- **Framework:** Frappe v16 (NOT Frappe v14/v15 or earlier)
- **App Type:** Theme-only (no DocTypes, no server-side logic beyond hooks/boot)
- **JavaScript:** ES5 IIFEs wrapping `arkan.*` namespace methods
- **Styles:** SCSS compiled to CSS, using `$arkan-*` variables and `var(--arkan-*)` custom properties
- **Python:** Only `hooks.py` (asset registration) and `boot.py` (session data)

## File Locations

- **App root:** `frappe-bench/apps/arkan_theme/`
- **Python module:** `arkan_theme/arkan_theme/`
- **Public assets:** `arkan_theme/arkan_theme/public/`
- **JavaScript:** `public/js/arkan_*.js` (7 files)
- **SCSS source:** `public/scss/*.scss` (12 partials + 1 master)
- **Compiled CSS:** `public/css/arkan.css` (auto-generated, do not edit)
- **Images:** `public/images/`
- **SVGs:** `public/svg/`

## Coding Conventions

### JavaScript
- Use IIFE pattern: `(function() { 'use strict'; /* ... */ })();`
- Attach all exports to `window.arkan.*` namespace
- Prefer ES5 syntax (`var`, `function()`, `.forEach()`) — no arrow functions or template literals in critical code paths
- Always check `typeof frappe !== 'undefined'` before using Frappe globals
- Add safety timers on any DOM overlay (setTimeout to auto-remove)
- Respect `prefers-reduced-motion` via `arkan.prefersReducedMotion()`
- Prefix private methods with `_` (e.g., `_cleanupFrappeFreeze`)

### SCSS
- Use `$arkan-*` SCSS variables for all colors, transitions, shadows
- Use `var(--arkan-*)` CSS custom properties for runtime-dynamic values
- Use provided mixins: `arkan-glass`, `arkan-card-elevated`, `arkan-gold-glow`, `arkan-focus-ring`
- Max nesting depth: 3 levels
- Section comments: `// ─── Section Name ───`
- Import new partials in `arkan.scss` in dependency order

### Naming
- JS files: `arkan_<module>.js`
- SCSS partials: `_<feature>.scss`
- DOM IDs: `arkan-<feature>-<element>` (e.g., `#arkan-search-overlay`)
- CSS classes: `arkan-<feature>-<modifier>` (e.g., `.arkan-loading-visible`)
- Body classes: `arkan-<state>` (e.g., `.arkan-day`, `.arkan-night`)

## Critical Knowledge

### DO
- Use `frappe.router.on('change', fn)` for SPA navigation events
- Use `frappe.after_ajax(fn)` to run code after pending requests complete
- Use `frappe.boot.arkan_theme` to access boot session data
- Use `frappe.dom.freeze/unfreeze` (overridden by our loading module)
- Always add `onerror` handlers on `<img>` elements (fallback if images missing)
- Test with `prefers-reduced-motion: reduce` enabled

### DO NOT
- **Never** use `frappe.request.on('before'/'after')` — it doesn't exist in Frappe
- **Never** modify Frappe or ERPNext core files
- **Never** create DocTypes in this app (it's theme-only)
- **Never** use jQuery `ajaxSend/ajaxComplete` for loading overlays (fires on heartbeat/polling, never disappears)
- **Never** use MutationObserver on Awesomplete results (causes infinite loops)
- **Never** edit `public/css/arkan.css` directly — it's compiled from SCSS
- **Never** use ES6 `import/export` syntax — Frappe's `app_include_js` doesn't support it

## Color Tokens

```
Gold:       #DDA46F  (--arkan-gold)
Gold Light: #E8BE94  (--arkan-gold-light)
Gold Dark:  #A56D29  (--arkan-gold-dark)
Navy:       #1D2939  (--arkan-navy)
Navy Light: #2A3A4D  (--arkan-navy-light)
Navy Deep:  #111827  (--arkan-navy-deep)
Cream:      #FFF1E7  (--arkan-cream)
Cream Warm: #FDE8D6  (--arkan-cream-warm)
Cream Cool: #FAF5F0  (--arkan-cream-cool)
```

## Build Commands

```bash
# SCSS compile
cd apps/arkan_theme/arkan_theme/public
npx sass scss/arkan.scss css/arkan.css --style compressed --source-map

# Frappe build
bench build --app arkan_theme

# Clear cache
bench --site dev.localhost clear-cache
```

## Module Dependency Order

```
arkan_theme.js     → Must be FIRST (sets up namespace)
arkan_skyline.js   → Before splash and login (they use skyline.create)
arkan_effects.js   → Independent
arkan_splash.js    → After skyline
arkan_loading.js   → After theme (uses namespace)
arkan_navbar.js    → After theme (uses namespace)
arkan_login.js     → After skyline (web_include_js, separate from desk)
```

## Key Frappe 16 APIs Used

```javascript
frappe.router.on('change', fn)      // SPA navigation
frappe.after_ajax(fn)                // After AJAX completion
frappe.dom.freeze(msg)               // Loading overlay (we override this)
frappe.dom.unfreeze()                // Remove loading (we override this)
frappe.boot                          // Boot session data
frappe.ready(fn)                     // Framework ready callback
frappe.call({method, args, callback}) // API call
$(document).on('toolbar_setup', fn)  // Toolbar rendered event
```

## Documentation Files

- `README.md` — User-facing documentation with features, installation, customization
- `CONTEXT.md` — Comprehensive AI-readable technical context (file-by-file)
- `DEVELOPMENT.md` — Developer guide with workflow, patterns, debugging
- `ROADMAP.md` — Feature proposals and completed items tracking
- `CHANGELOG.md` — Version history
- `.github/copilot-instructions.md` — This file
