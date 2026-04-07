# 🔄 ARKAN Theme — Full frappe_visual Redesign Prompt

> **Paste this entire prompt in a new chat session to redesign arkan_theme.**
> **Date:** April 2026 | **Version:** 2.0

---

## Mission

Redesign `arkan_theme` to **fully leverage every capability of `frappe_visual`** (307+ components, 10 tiers, auto-enhancers, Scene Engine, CSS effects, icon system, page generators, DocType visualizers). The current theme has 26+ standalone JS modules that duplicate or conflict with frappe_visual features. The redesign must:

1. **Replace** custom JS modules with frappe_visual equivalents wherever possible
2. **Integrate** Scene Engine, CSS effects, auto-enhancers, and icon system natively
3. **Comply** 100% with both reference documents (cited below)
4. **Preserve** the ARKAN cyber-tech identity (dark-first, cyan/purple, neural grid aesthetic)
5. **Pass** every mandatory checklist from both guides

---

## 📋 Reference Documents (MUST READ FIRST)

Before writing ANY code, read these two files completely:

```
/workspaces/frappe_docker/frappe-bench/apps/frappe_visual/docs/visual_app_design.md
/workspaces/frappe_docker/frappe-bench/apps/frappe_visual/docs/VISUAL_PAGES_GUIDE.md
```

Also read the ecosystem context:

```
/workspaces/frappe_docker/.github/copilot-instructions.md          ← Master constitution
/workspaces/frappe_docker/.github/chats/arkan_theme.md             ← Chat decisions
/workspaces/frappe_docker/frappe-bench/apps/arkan_theme/CONTEXT.md ← Current architecture
/workspaces/frappe_docker/frappe-bench/apps/arkan_theme/ARKAN_THEME_PROMPT.md ← Original brand spec (colors, logos, animations)
```

---

## 🏗 Current State (What Exists)

### App Identity (KEEP AS-IS)

| Field             | Value                                                           |
| ----------------- | --------------------------------------------------------------- |
| **App**           | `arkan_theme`                                                   |
| **Color**         | `#3B82F6` Blue / `#00F0FF` Cyan / `#8B5CF6` Purple              |
| **Aesthetic**     | Dark-first cyber-tech, neural network motifs                    |
| **Fonts**         | Space Grotesk (headings) + Inter (body) + JetBrains Mono (code) |
| **required_apps** | `frappe`, `frappe_visual`, `arkan_help`                         |

### Current JS Modules (26 files → most need replacement or slimming)

| File                        | Current Purpose          | frappe_visual Replacement                                                        |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| `arkan_theme.js`            | Main controller, init    | **KEEP** — slim down, delegate to fv                                             |
| `arkan_darkmode.js`         | Dark/light toggle        | **REPLACE** → `frappe.visual.ThemeManager`                                       |
| `arkan_effects.js`          | Particle/glow effects    | **REPLACE** → `.fv-fx-*` CSS classes + `frappe.visual.confetti()`                |
| `arkan_splash.js`           | Splash screen            | **REFACTOR** → use `frappe.visual.typewriter()` + `frappe.visual.morphingText()` |
| `arkan_loading.js`          | Loading indicators       | **REPLACE** → frappe_visual loading states                                       |
| `arkan_sounds.js`           | UI sounds                | **KEEP** — unique to theme                                                       |
| `arkan_workspace.js`        | Workspace customizations | **REPLACE** → `frappe.visual.workspaceEnhancer` handles this                     |
| `arkan_navbar.js`           | Navbar enhancements      | **SLIM** — only brand-specific; fv handles structure                             |
| `arkan_topbar.js`           | Top bar                  | **MERGE** into navbar.js                                                         |
| `arkan_forms.js`            | Form enhancements        | **REPLACE** → `frappe.visual.formEnhancer` handles this                          |
| `arkan_mobile.js`           | Mobile bottom nav        | **REPLACE** → `frappe.visual.bottomNav()`                                        |
| `arkan_shortcuts.js`        | Keyboard shortcuts       | **REPLACE** → `frappe.visual.shortcutManager()` + `frappe.visual.commandBar()`   |
| `arkan_ambient.js`          | Ambient effects          | **REFACTOR** → use `frappe.visual.dotPattern()` + `.fv-fx-morph-blob`            |
| `arkan_cursor.js`           | Custom cursor            | **REFACTOR** → use `.fv-fx-mouse-glow`                                           |
| `arkan_interactive_grid.js` | Interactive neural grid  | **KEEP** — unique brand feature, but hook into fv theme                          |
| `arkan_tour.js`             | Onboarding tour          | **REPLACE** → `frappe.visual.onboardingTour()`                                   |
| `arkan_presets.js`          | Theme presets            | **REPLACE** → `frappe.visual.ThemeManager`                                       |
| `arkan_print_headers.js`    | Print headers            | **KEEP** — print-specific                                                        |
| `arkan_minigame.js`         | Easter egg game          | **KEEP** — fun feature                                                           |
| `arkan_animated_favicon.js` | Animated favicon         | **KEEP** — unique                                                                |
| `arkan_pwa.js`              | PWA registration         | **KEEP** — unique                                                                |
| `arkan_desktop.js`          | Desktop enhancements     | **REPLACE** → desk_workspace.js from fv                                          |
| `arkan_welcome_msg.js`      | Welcome message          | **REFACTOR** → use `frappe.visual.typewriter()`                                  |
| `arkan_login.js`            | Login page               | **REFACTOR** → enhance with fv overlay components                                |
| `arkan_neural_grid.js`      | Neural grid background   | **KEEP** — hero brand feature                                                    |
| `arkan_matrix.js`           | Matrix rain effect       | **KEEP** — unique ambient                                                        |
| `fv_integration.js`         | frappe_visual bridge     | **EXPAND** — this becomes the main integration layer                             |

### Summary: After redesign

- **KEEP** (unique brand features): ~8 files (sounds, neural grid, matrix, minigame, favicon, pwa, print, login)
- **REPLACE with fv**: ~12 files → deleted entirely
- **REFACTOR** (slim + delegate): ~6 files
- **NEW**: `fv_integration.js` expanded to be the central theme↔fv bridge

---

## 🎯 Mandatory Integration Points

### 1. Auto-Enhancers — DO NOT FIGHT THEM

frappe_visual has 3 auto-enhancers that run on **every page**. The theme must **style them**, not replace them:

```javascript
// These are ALREADY active on every page:
frappe.visual.formEnhancer; // Stats ribbon + relationship graph on forms
frappe.visual.listEnhancer; // Table/Cards/Kanban/Timeline toggle on lists
frappe.visual.workspaceEnhancer; // Live counts + sparklines on workspaces

// The theme should STYLE their output, not recreate the functionality
// Override their CSS variables to match ARKAN colors:
```

```css
/* In arkan.css — theme the auto-enhancers */
.fv-form-stats-ribbon {
  background: var(--arkan-surface-raised);
  border-color: rgba(0, 240, 255, 0.1);
}
.fv-list-view-toggle .active {
  color: var(--arkan-cyan);
}
.fv-workspace-card {
  @include arkan-glass-card;
}
.fv-workspace-sparkline {
  --fv-sparkline-color: var(--arkan-cyan);
}
```

### 2. Icon System — MANDATORY Migration

**Current**: Mix of Font Awesome + raw SVG + custom icons
**Required**: ALL icons via `frappe.visual.icons.*`

```javascript
// ✅ CORRECT — use frappe_visual icon system
frappe.visual.icons.render("moon", { size: "md", color: "var(--arkan-cyan)" });
frappe.visual.icons.forDocType("ARKAN Settings");
frappe.visual.icons.statusBadge("Active");

// ❌ FORBIDDEN — no more Font Awesome or raw SVG
('<i class="fa fa-moon"></i>');
```

### 3. CSS Effects — Use `.fv-fx-*` Classes

Every screen must use **at least 3** of these (from visual_app_design.md):

| Class                       | Where to Use in ARKAN               |
| --------------------------- | ----------------------------------- |
| `.fv-fx-glass`              | All cards, sidebar, navbar overlays |
| `.fv-fx-hover-lift`         | Workspace cards, desktop icons      |
| `.fv-fx-page-enter`         | Every page wrapper                  |
| `.fv-fx-mouse-glow`         | Replace custom cursor.js glow       |
| `.fv-fx-gradient-animated`  | Login background, splash            |
| `.fv-fx-hover-shine`        | Buttons, links                      |
| `.fv-fx-gradient-text`      | Brand name "ARKAN", section headers |
| `.fv-fx-morph-blob`         | Replace custom ambient blobs        |
| `.fv-fx-parallax-container` | Neural grid background layer        |

### 4. Scene Engine — Workspace Dashboards

Replace flat workspace headers with immersive SVG scenes:

```javascript
// ARKAN Settings workspace header — use scenePresetOffice with dark/blueprint theme
const scene = await frappe.visual.scenePresetOffice({
  container: "#arkan-workspace-header",
  theme: "dark", // matches ARKAN aesthetic
  frames: [
    { label: __("Theme"), value: "ARKAN", status: "success" },
    {
      label: __("Dark Mode"),
      value: frappe.visual.ThemeManager.isDark() ? __("ON") : __("OFF"),
    },
  ],
  documents: [
    {
      label: __("Customize"),
      count: 1,
      href: "/app/arkan-settings",
      color: "#00F0FF",
    },
  ],
});
```

### 5. Page Generators — About & Onboarding

```javascript
// About page: /arkan-theme-about
// MUST use frappe.visual.generator.aboutPage() — NOT custom HTML
frappe.visual.generator.aboutPage("#container", "arkan_theme");

// Onboarding: /arkan-theme-onboarding
// MUST use frappe.visual.storyboard() inside frappe.visual.floatingWindow()
const win = new frappe.visual.FloatingWindow({
  title: __("ARKAN Theme Setup"),
  position: "right",
  width: "450px",
});
frappe.visual.storyboard(win.body, {
  steps: [
    { title: __("Welcome"), content: "..." },
    { title: __("Colors"), content: "..." },
    { title: __("Dark Mode"), content: "..." },
    // ... 14+ steps minimum
  ],
});
```

### 6. Theme Manager Integration

```javascript
// In fv_integration.js — bridge ARKAN dark mode to frappe_visual's ThemeManager
frappe.visual.ThemeManager.init();

// Sync ARKAN's own dark/light toggle with ThemeManager
frappe.visual.ThemeManager.on("change", (theme) => {
  document.body.classList.toggle("arkan-night", theme === "dark");
  document.body.classList.toggle("arkan-day", theme === "light");
});

// Replace arkan_darkmode.js entirely:
arkan.toggleDarkMode = () => frappe.visual.ThemeManager.toggle();
```

### 7. Command Bar & Shortcuts

```javascript
// Replace arkan_shortcuts.js with:
frappe.visual.commandBar({
  // ARKAN-themed command palette
  theme: { bg: "var(--arkan-surface)", accent: "var(--arkan-cyan)" },
});

frappe.visual.shortcutManager({
  shortcuts: [
    {
      key: "mod+shift+d",
      action: () => frappe.visual.ThemeManager.toggle(),
      label: __("Toggle Dark Mode"),
    },
    {
      key: "mod+shift+n",
      action: () => arkan.toggleNeuralGrid(),
      label: __("Toggle Neural Grid"),
    },
  ],
});
```

### 8. Form Enhancement

```javascript
// Delete arkan_forms.js — frappe.visual.formEnhancer handles everything
// Only add ARKAN-specific styling in CSS:
```

```css
.fv-form-dashboard {
  background: var(--arkan-surface-raised);
}
.fv-form-stats-badge {
  border-color: rgba(0, 240, 255, 0.15);
}
.fv-relationship-graph .cy-node {
  border-color: var(--arkan-cyan);
}
```

### 9. Bilingual Tooltip (Already Active)

The `bilingualTooltip` auto-enhancer is active on every page. Theme just needs to style it:

```css
.fv-bilingual-tooltip {
  background: var(--arkan-surface-raised);
  border: 1px solid rgba(0, 240, 255, 0.1);
  color: var(--arkan-white);
}
```

### 10. Mobile Navigation

```javascript
// Replace arkan_mobile.js with frappe_visual's bottomNav:
frappe.visual.bottomNav({
  items: [
    { icon: "home", label: __("Home"), route: "/desk" },
    {
      icon: "search",
      label: __("Search"),
      action: () => frappe.visual.commandBar.open(),
    },
    {
      icon: "plus",
      label: __("New"),
      action: () => frappe.visual.quickAction(),
    },
    { icon: "bell", label: __("Alerts"), route: "/desk#notifications" },
    { icon: "settings", label: __("More"), route: "/app/arkan-settings" },
  ],
  theme: { activeColor: "var(--arkan-cyan)" },
});
```

---

## 📁 Target File Structure After Redesign

```
arkan_theme/
├── hooks.py                          # UPDATED — remove redundant JS includes
├── boot.py                           # KEEP
├── install.py                        # KEEP
├── seed.py                           # KEEP
├── public/
│   ├── css/
│   │   └── arkan.css                 # UPDATED — theme fv components + ARKAN brand
│   ├── scss/
│   │   ├── arkan.scss                # Master import
│   │   ├── _variables.scss           # ARKAN tokens + fv variable overrides
│   │   ├── _fv-overrides.scss        # NEW — style ALL fv auto-enhancer output
│   │   ├── _fv-scene.scss            # NEW — scene engine ARKAN theme
│   │   ├── _fv-effects.scss          # NEW — customize .fv-fx-* for ARKAN palette
│   │   ├── _typography.scss          # KEEP — Space Grotesk + Inter
│   │   ├── _layout.scss              # SLIM — remove what fv handles
│   │   ├── _login.scss               # KEEP — brand login page
│   │   ├── _splash.scss              # REFACTOR — use fv animations
│   │   ├── _neural-grid.scss         # KEEP — unique brand
│   │   ├── _rtl.scss                 # KEEP + use CSS Logical Properties
│   │   └── _print.scss              # KEEP
│   ├── js/
│   │   ├── arkan_theme.bundle.js     # Main bundle entry
│   │   ├── fv_integration.js         # EXPANDED — central fv↔ARKAN bridge
│   │   ├── arkan_neural_grid.js      # KEEP — hero feature
│   │   ├── arkan_login.js            # REFACTOR — use fv overlays
│   │   ├── arkan_sounds.js           # KEEP — unique
│   │   ├── arkan_animated_favicon.js # KEEP — unique
│   │   ├── arkan_minigame.js         # KEEP — fun
│   │   └── arkan_print_headers.js    # KEEP — print
│   └── images/                       # KEEP all brand assets
├── arkan_theme/
│   ├── page/
│   │   ├── arkan_theme_about/        # REWRITE — use fv generator.aboutPage()
│   │   └── arkan_theme_onboarding/   # REWRITE — use fv storyboard + floatingWindow
│   └── doctype/
│       └── arkan_settings/           # KEEP + add fv-powered settings UI
└── help/                             # KEEP — arkan_help integration
```

### hooks.py Changes

```python
# BEFORE (26 JS files loaded):
app_include_js = [
    "/assets/arkan_theme/js/arkan_theme.bundle.js",
    "/assets/arkan_theme/js/fv_integration.js",
]

# AFTER (same 2 files, but bundle is much smaller):
app_include_js = [
    "/assets/arkan_theme/js/arkan_theme.bundle.js",  # Slimmed: ~8 modules instead of 26
    "/assets/arkan_theme/js/fv_integration.js",       # Expanded: frappe_visual bridge
]
```

---

## ✅ Mandatory Checklists

### Screen Design Checklist (from visual_app_design.md) — EVERY screen:

```
□ Uses at least 1 frappe_visual component (not plain HTML)
□ Has at least 3 CSS effect classes (.fv-fx-*)
□ Has GSAP entrance animation (stagger on cards/items)
□ Supports dark mode (CSS variables only, no hardcoded colors)
□ Uses CSS Logical Properties (margin-inline-start, NOT margin-left)
□ All icons via frappe.visual.icons — NEVER Font Awesome
□ All strings wrapped in __() for i18n
□ Has contextual help ❓ button (arkan_help integration)
□ Lazy-loads via frappe.require("frappe_visual.bundle.js")
□ Responsive: works from 320px to 4K
□ Scene dashboards have SceneNavigator + SceneExporter
```

### RTL Rules (MANDATORY — ARKAN serves Arabic market):

```css
/* ✅ */
margin-inline-start: 10px;
padding-inline-end: 10px;
text-align: start;
inset-inline-start: 0;

/* ❌ FORBIDDEN */
margin-left: 10px;
padding-right: 10px;
text-align: left;
left: 0;
```

### Integration Checklist:

```
□ formEnhancer output styled with ARKAN colors
□ listEnhancer output styled with ARKAN colors
□ workspaceEnhancer output styled with ARKAN colors
□ bilingualTooltip styled with ARKAN glassmorphism
□ ALL icons migrated to frappe.visual.icons.*
□ ThemeManager used for dark/light toggle (not custom)
□ commandBar used for keyboard shortcuts (not custom)
□ onboardingTour used for tours (not custom)
□ bottomNav used for mobile nav (not custom)
□ Scene Engine used for workspace dashboard headers
□ Page generators used for About + Onboarding pages
□ .fv-fx-glass used on all cards/surfaces (themed to ARKAN palette)
□ .fv-fx-page-enter on every page wrapper
□ .fv-fx-gradient-text on ARKAN brand name
□ .fv-fx-hover-lift on all interactive cards
□ Neural grid + matrix rain kept as unique brand features
□ arkan_sounds.js kept as unique feature
□ arkan_minigame.js kept as fun feature
□ All deleted JS modules have NO references left in hooks.py or HTML
```

---

## 🎨 CSS Variable Bridge

The theme must map ARKAN variables to frappe_visual's CSS custom properties:

```scss
// _variables.scss — ARKAN ↔ frappe_visual bridge
:root {
  // ARKAN brand tokens
  --arkan-cyan: #00f0ff;
  --arkan-purple: #8b5cf6;
  --arkan-surface: #0a0f1c;
  --arkan-surface-raised: #111827;
  --arkan-white: #e8ecf1;

  // Map to frappe_visual tokens so fv components use ARKAN colors
  --fv-primary: var(--arkan-cyan);
  --fv-primary-light: rgba(0, 240, 255, 0.15);
  --fv-accent: var(--arkan-purple);
  --fv-bg-surface: var(--arkan-surface);
  --fv-bg-card: var(--arkan-surface-raised);
  --fv-text-primary: var(--arkan-white);
  --fv-border-default: rgba(0, 240, 255, 0.1);
  --fv-glass-bg: rgba(17, 24, 39, 0.6);
  --fv-glass-border: rgba(0, 240, 255, 0.1);

  // Scene Engine theming
  --fv-scene-bg: var(--arkan-surface);
  --fv-scene-accent: var(--arkan-cyan);
  --fv-scene-secondary: var(--arkan-purple);

  // Graph Engine theming
  --fv-node-border: var(--arkan-cyan);
  --fv-edge-color: var(--arkan-purple);
  --fv-node-bg: var(--arkan-surface-raised);
}

// Light mode overrides
body.arkan-day {
  --arkan-surface: #f1f5f9;
  --arkan-surface-raised: #ffffff;
  --arkan-white: #111827;
  --fv-glass-bg: rgba(255, 255, 255, 0.7);
  --fv-glass-border: rgba(0, 240, 255, 0.15);
}
```

---

## 🔧 fv_integration.js — Central Bridge (Expand This File)

```javascript
// fv_integration.js — ARKAN Theme ↔ frappe_visual integration layer
(function () {
  "use strict";

  // Wait for frappe_visual to load
  frappe.require("frappe_visual.bundle.js", () => {
    if (!frappe.visual) return;

    // 1. Theme sync
    frappe.visual.ThemeManager.init();
    frappe.visual.ThemeManager.on("change", (theme) => {
      document.body.classList.toggle("arkan-night", theme === "dark");
      document.body.classList.toggle("arkan-day", theme === "light");
    });

    // 2. Configure auto-enhancers for ARKAN aesthetic
    frappe.visual.formEnhancer.configure({
      showGraph: true,
      showStats: true,
      showQuickLinks: true,
      animate: true,
    });
    frappe.visual.workspaceEnhancer.configure({
      glassCards: true,
      sparklines: true,
      liveCounts: true,
    });

    // 3. Register ARKAN-specific shortcuts
    frappe.visual.shortcutManager?.({
      shortcuts: [
        {
          key: "mod+shift+d",
          action: () => frappe.visual.ThemeManager.toggle(),
          label: __("Toggle Dark Mode"),
        },
        {
          key: "mod+shift+n",
          action: () => window.arkan?.toggleNeuralGrid?.(),
          label: __("Toggle Neural Grid"),
        },
        {
          key: "mod+shift+s",
          action: () => window.arkan?.toggleSounds?.(),
          label: __("Toggle Sounds"),
        },
      ],
    });

    // 4. Mobile bottom nav
    if (frappe.is_mobile()) {
      frappe.visual.bottomNav?.({
        items: [
          { icon: "home", label: __("Home"), route: "/desk" },
          {
            icon: "search",
            label: __("Search"),
            action: () => frappe.visual.commandBar?.open?.(),
          },
          { icon: "plus", label: __("New"), action: () => frappe.new_doc() },
          { icon: "bell", label: __("Alerts"), route: "/desk#notifications" },
          {
            icon: "settings",
            label: __("Settings"),
            route: "/app/arkan-settings",
          },
        ],
      });
    }

    // 5. Inject scene header on ARKAN workspace
    frappe.router?.on?.("change", () => {
      const route = frappe.get_route_str();
      if (
        route === "Workspace/ARKAN Theme" ||
        route === "Workspace/arkan-settings"
      ) {
        _injectSceneHeader();
      }
    });

    console.log(
      "%c⚡ ARKAN Theme + frappe_visual integration active",
      "color: #00F0FF; font-weight: bold;",
    );
  });

  async function _injectSceneHeader() {
    const container = document.querySelector(".workspace-header");
    if (!container || container.dataset.arkanScene) return;
    container.dataset.arkanScene = "1";

    await frappe.visual.scenePresetOffice?.({
      container,
      theme: "dark",
      frames: [
        { label: __("Theme"), value: "ARKAN", status: "success" },
        { label: __("Version"), value: "16.1", status: "info" },
      ],
    });
  }
})();
```

---

## 📖 About Page Redesign — 14+ Slides (Mandatory)

The current `arkan_theme_about` page uses custom HTML. Rewrite it using:

```javascript
frappe.visual.generator.aboutPage("#container", "arkan_theme");
```

This auto-generates 14+ slides with:

1. App overview with animated SVG illustrations
2. Module map via `frappe.visual.appMap()`
3. Entity relationships via `frappe.visual.erd()`
4. Workflows via `frappe.visual.dependencyGraph()`
5. Stakeholder perspectives (per user type)
6. Use-cases (per company type)
7. Integration map (how arkan_theme connects to fv, arkan_help, caps)
8. Security & permissions (CAPS capabilities)
9. Reports & analytics
10. Getting started guide

Add ARKAN-specific slides: 11. Color system showcase (cyan/purple gradients live) 12. Neural grid demo (interactive) 13. Dark/light mode comparison 14. Sound & animation settings

---

## 📱 Onboarding Redesign — Storyboard + FloatingWindow

```javascript
// Render inside frappe.visual.floatingWindow (opposite side of sidebar)
const steps = [
  { title: __("Welcome to ARKAN"), icon: "sparkles", content: "..." },
  { title: __("Choose Your Mode"), icon: "moon", content: "..." }, // dark/light toggle
  { title: __("Brand Colors"), icon: "palette", content: "..." },
  { title: __("Neural Grid"), icon: "chart-dots-3", content: "..." },
  { title: __("Keyboard Shortcuts"), icon: "keyboard", content: "..." },
  { title: __("Sound Effects"), icon: "volume", content: "..." },
  { title: __("Mobile Experience"), icon: "device-mobile", content: "..." },
  { title: __("Form Enhancements"), icon: "forms", content: "..." },
  { title: __("Workspace Scenes"), icon: "photo", content: "..." },
  { title: __("Help System"), icon: "help", content: "..." },
  { title: __("Advanced Settings"), icon: "settings", content: "..." },
  { title: __("You're Ready!"), icon: "rocket", content: "..." },
];
```

---

## 🧹 Files to DELETE After Redesign

These JS files should be fully deleted — their functionality is now in frappe_visual:

```
arkan_darkmode.js        → frappe.visual.ThemeManager
arkan_effects.js         → .fv-fx-* CSS classes
arkan_loading.js         → fv loading states
arkan_workspace.js       → frappe.visual.workspaceEnhancer
arkan_forms.js           → frappe.visual.formEnhancer
arkan_mobile.js          → frappe.visual.bottomNav()
arkan_shortcuts.js       → frappe.visual.shortcutManager() + commandBar()
arkan_ambient.js         → .fv-fx-morph-blob + dotPattern()
arkan_cursor.js          → .fv-fx-mouse-glow
arkan_tour.js            → frappe.visual.onboardingTour()
arkan_presets.js         → frappe.visual.ThemeManager
arkan_desktop.js         → fv desk_workspace.js
arkan_topbar.js          → merged into navbar
arkan_welcome_msg.js     → frappe.visual.typewriter()
```

---

## ⚡ Build & Verify

```bash
cd /workspaces/frappe_docker/frappe-bench

# Build after changes
bench build --app arkan_theme

# Clear cache
bench --site dev.localhost clear-cache

# Verify no Font Awesome icons remain
grep -r "fa fa-\|fa-solid\|fa-regular\|font-awesome" apps/arkan_theme/arkan_theme/public/ && echo "❌ FONT AWESOME FOUND" || echo "✅ No Font Awesome"

# Verify no margin-left/padding-right (RTL violations)
grep -rn "margin-left\|margin-right\|padding-left\|padding-right\|text-align: left\|text-align: right" apps/arkan_theme/arkan_theme/public/scss/ && echo "❌ RTL VIOLATIONS" || echo "✅ RTL Clean"

# Verify all strings are translatable
grep -rn "title:\|label:\|desc:" apps/arkan_theme/arkan_theme/public/js/ | grep -v "__(" | grep -v "//" && echo "❌ UNTRANSLATED STRINGS" || echo "✅ All translated"
```

---

## 📜 Post-Redesign Documentation

After completing all changes, update:

```
/workspaces/frappe_docker/.github/chats/arkan_theme.md     ← Add architecture decisions
/workspaces/frappe_docker/frappe-bench/apps/arkan_theme/CONTEXT.md  ← Update file structure
```

End every interaction with:

```
📜 Docs updated: chats/arkan_theme.md, CONTEXT.md
```

---

## 🏁 Success Criteria

The redesign is complete when:

1. ✅ **0 Font Awesome icons** remain anywhere in the codebase
2. ✅ **0 margin-left/padding-right** (all CSS Logical Properties)
3. ✅ **14 JS files deleted** (replaced by frappe_visual)
4. ✅ **About page** uses `generator.aboutPage()` with 14+ slides
5. ✅ **Onboarding** uses `storyboard()` inside `floatingWindow()`
6. ✅ **Every screen** passes the 11-point Screen Design Checklist
7. ✅ **Auto-enhancers** styled with ARKAN colors (not disabled/overridden)
8. ✅ **Scene Engine** workspace header on ARKAN Settings page
9. ✅ **ThemeManager** handles all dark/light switching
10. ✅ **commandBar** + **shortcutManager** handle all keyboard interaction
11. ✅ **bottomNav** handles mobile navigation
12. ✅ **CSS variable bridge** maps ARKAN tokens → fv tokens
13. ✅ **Neural grid + matrix rain + sounds + minigame** preserved as unique brand features
14. ✅ **Build passes** with no errors
15. ✅ **All help files** present in `help/{en,ar}/`
