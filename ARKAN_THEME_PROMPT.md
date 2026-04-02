# 🚀 ARKAN Theme — Complete Creation Prompt

## Mission Statement

Create a **complete Frappe v16 theme app** called `arkan_theme` for **ARKAN** — an AI & Technology Solutions company. The theme must be a **full clone of the existing `tavira_theme` architecture** but with a completely different brand identity: futuristic, cyber-tech, AI-driven aesthetic replacing the luxury real estate look.

> **Reference app**: `apps/tavira_theme/` — clone its ENTIRE structure, rename every `tavira` → `arkan`, then redesign every visual element for the ARKAN brand.

---

## 1. Brand Identity

| Attribute | Value |
|-----------|-------|
| **Company Name** | ARKAN (أركان) |
| **Industry** | AI & Technology Solutions / Smart IT Infrastructure |
| **Tagline** | `Intelligent Foundations · بنية ذكية` |
| **Alt Taglines** | "Where AI Meets Infrastructure" / "Building Tomorrow's Intelligence" |
| **Brand Voice** | Cutting-edge, precise, futuristic, confident |
| **Font Primary** | **Space Grotesk** (headings, UI, brand text) |
| **Font Secondary** | **Inter** (body text, data, forms) |
| **Font Mono** | **JetBrains Mono** (code snippets, terminal-style elements) |

---

## 2. Color System

### Primary Palette

| Token | Color | Hex | Usage |
|-------|-------|-----|-------|
| `$arkan-black` | Deep Black | `#0A0F1C` | Primary background, navbar, sidebar |
| `$arkan-black-light` | Midnight Blue | `#111827` | Raised surfaces, cards |
| `$arkan-black-deep` | Void Black | `#060A14` | Deep backgrounds, overlays |
| `$arkan-cyan` | Electric Cyan | `#00F0FF` | Primary accent, links, active states, glows |
| `$arkan-cyan-light` | Ice Cyan | `#67F7FF` | Hover states, highlights |
| `$arkan-cyan-dark` | Deep Cyan | `#00B8C4` | Pressed states, darker accent |
| `$arkan-purple` | Neon Purple | `#8B5CF6` | Secondary accent, gradients, badges |
| `$arkan-purple-light` | Lavender | `#A78BFA` | Hover states |
| `$arkan-purple-dark` | Deep Violet | `#6D28D9` | Pressed states |
| `$arkan-white` | Ghost White | `#E8ECF1` | Primary text on dark |
| `$arkan-white-warm` | Soft White | `#F1F5F9` | Secondary text |
| `$arkan-gray` | Steel Gray | `#374151` | Borders, dividers |
| `$arkan-gray-light` | Mist Gray | `#6B7280` | Muted text |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$arkan-success` | `#10B981` | Emerald Green — success states |
| `$arkan-danger` | `#EF4444` | Red — errors, destructive |
| `$arkan-warning` | `#F59E0B` | Amber — warnings |
| `$arkan-info` | `#00F0FF` | Cyan — info (same as primary) |

### Gradient Presets

```scss
// Primary Gradient (Cyan → Purple)
$arkan-gradient-primary: linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%);

// Surface Gradient (Dark → Darker)
$arkan-gradient-surface: linear-gradient(180deg, #111827 0%, #0A0F1C 100%);

// Neon Glow Gradient (for borders, accents)
$arkan-gradient-glow: linear-gradient(90deg, #00F0FF, #8B5CF6, #00F0FF);

// Neural Gradient (for background patterns)
$arkan-gradient-neural: radial-gradient(ellipse at 30% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%);
```

### CSS Custom Properties

```scss
:root {
  --arkan-black: #0A0F1C;
  --arkan-black-light: #111827;
  --arkan-black-deep: #060A14;
  --arkan-cyan: #00F0FF;
  --arkan-cyan-light: #67F7FF;
  --arkan-cyan-dark: #00B8C4;
  --arkan-purple: #8B5CF6;
  --arkan-purple-light: #A78BFA;
  --arkan-purple-dark: #6D28D9;
  --arkan-white: #E8ECF1;
  --arkan-white-warm: #F1F5F9;
  --arkan-gray: #374151;
  --arkan-gray-light: #6B7280;
  --arkan-success: #10B981;
  --arkan-danger: #EF4444;
  --arkan-warning: #F59E0B;
  --arkan-info: #00F0FF;
  --arkan-gradient-primary: linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%);
  --arkan-gradient-glow: linear-gradient(90deg, #00F0FF, #8B5CF6, #00F0FF);
  --arkan-surface: #0A0F1C;
  --arkan-surface-raised: #111827;
  --arkan-surface-overlay: rgba(10, 15, 28, 0.85);
  --navbar-height: 48px;
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 60px;
}
```

---

## 3. Logo Design — ARKAN

### Concept
The letter **"A"** formed by **neural network nodes and connections**, enclosed within **angular brackets `< >`** (code/tech symbolism). The nodes glow with cyan, connections pulse with purple.

### SVG Variants Required

#### 3a. `arkan-logo-main.svg` (200×155) — Primary Logo Mark
```
Design Description:
- Angular bracket < on left side, > on right side (like HTML tags)
- Inside: Letter "A" constructed from:
  - 5-7 neural network NODES (circles, r=4-6px) at vertices of the A shape
  - CONNECTIONS (lines) between nodes forming the A structure
  - Top node = apex of A
  - Two bottom nodes = feet of A
  - Middle nodes = crossbar of A
  - Additional floating nodes around the A for depth
- Color: Nodes = #00F0FF (cyan), Connections = #8B5CF6 (purple)
- Angular brackets = gradient from cyan to purple
```

#### 3b. `arkan-icon.svg` (90×90) — Compact Icon
```
Simplified version: Just the neural A inside < > at smaller scale.
5 nodes minimum, clean at 16×16 rendering.
```

#### 3c. `logo_animated.svg` (200×155) — Animated Version
```
SMIL Animations:
1. Angular brackets slide in from left/right (0–0.4s)
2. Nodes fade in one by one with scale pulse (0.3–1.0s, staggered 0.1s each)
3. Connections draw with stroke-dasharray animation (0.5–1.2s)
4. Final glow pulse on all nodes (1.2–1.8s)
5. Subtle continuous pulse on nodes (infinite, 2s cycle, subtle)
```

#### 3d. `arkan-logo-horizontal.svg` (400×128) — Horizontal Logo + Text
```
Left: Neural A icon (compact)
Separator: Vertical gradient line (cyan→purple)
Right: "ARKAN" in Space Grotesk Bold, color #E8ECF1
Below text: "INTELLIGENT FOUNDATIONS" in Inter Light, color #00F0FF, opacity 0.7
```

#### 3e. `arkan-logo.svg` (300×450) — Vertical Full Logo
```
Top: Large Neural A icon mark
Bottom: "ARKAN" text centered
Gradient treatment on icon
```

#### 3f. `arkan-watermark.svg` (800×800) — Large Watermark
```
Same neural A concept at large scale, opacity 0.03
With geometric frame/border accents
Used as subtle page background watermark
```

#### 3g. `brand-pattern.svg` (100×100) — Repeating Pattern Tile
```
Geometric pattern: Circuit board traces + small nodes
Tileable (edges connect seamlessly)
Stroke only, opacity 0.03-0.05
Colors: cyan lines, purple node dots
```

#### 3h. `neural_grid.svg` — REPLACES `dubai_skyline.svg`
```
Full-width (1920×400) neural network visualization:
- Random distribution of 40-60 nodes (circles)
- Interconnecting lines between nearby nodes
- Layered depth: foreground nodes larger/brighter, background smaller/dimmer
- Gradient: left=cyan dominant, right=purple dominant
- Some nodes pulse with glow animations
- Data flow particles traveling along connection lines
- Background: gradient from #060A14 to #0A0F1C
```

### PNG Image Assets Required

| File | Size | Description |
|------|------|-------------|
| `favicon.ico` | multi | Standard favicon (16, 32, 48) |
| `favicon-16x16.png` | 16×16 | Tiny favicon |
| `favicon-32x32.png` | 32×32 | Standard favicon |
| `favicon-48x48.png` | 48×48 | Large favicon |
| `favicon-192.png` | 192×192 | Android/PWA icon |
| `logo.png` | ~300×300 | General logo |
| `logo-header.png` | ~40×40 | Navbar logo |
| `logo-icon.png` | ~64×64 | App icon |
| `logo-login.png` | ~200×200 | Login page logo |
| `splash.png` | ~400×400 | Splash screen logo |
| `arkan-nav-logo.png` | ~32×32 | Navbar small logo |

> **All PNG files** should be generated from the SVG source with transparent background. The neural A icon with cyan glow effect.

---

## 4. App Structure — Exact Mirror of tavira_theme

```
arkan_theme/
├── .gitignore
├── license.txt
├── pyproject.toml                    # name=arkan_theme, "AI & Tech Solutions Theme"
├── README.md
├── CHANGELOG.md
├── arkan_theme/
│   ├── __init__.py
│   ├── hooks.py                      # All tavira→arkan, brand settings
│   ├── boot.py                       # ArkanSettings DocType reader
│   ├── modules.txt                   # "ARKAN Theme"
│   ├── patches.txt                   # Empty initially
│   ├── config/
│   │   └── __init__.py
│   ├── arkan_theme/                  # DocType module folder
│   │   ├── __init__.py
│   │   └── doctype/
│   │       ├── __init__.py
│   │       └── arkan_settings/       # Settings DocType (like TAVIRA Settings)
│   │           ├── __init__.py
│   │           ├── arkan_settings.py
│   │           └── arkan_settings.json
│   ├── templates/
│   │   ├── includes/
│   │   └── emails/
│   ├── www/
│   │   ├── 403.html
│   │   ├── 404.html
│   │   └── error.html
│   └── public/
│       ├── manifest.json             # PWA manifest with ARKAN branding
│       ├── sw.js                     # Service Worker
│       ├── css/
│       │   └── arkan.css             # Compiled from SCSS
│       ├── scss/
│       │   ├── arkan.scss            # Master import file
│       │   ├── _variables.scss       # All ARKAN color/font/spacing tokens
│       │   ├── _typography.scss      # Space Grotesk + Inter setup
│       │   ├── _animations.scss      # Cyber/glitch/pulse animations
│       │   ├── _buttons.scss         # Neon-glow buttons
│       │   ├── _forms.scss           # Dark form fields with cyan focus
│       │   ├── _form-enhancements.scss # Glass-card sidebar sections
│       │   ├── _layout.scss          # Dark layout, sidebar, navbar
│       │   ├── _tables.scss          # Dark tables with grid lines
│       │   ├── _cards.scss           # Glass cards with neon borders
│       │   ├── _modals.scss          # Dark modals with glow
│       │   ├── _login.scss           # Neural network login page
│       │   ├── _splash.scss          # AI-themed splash screen
│       │   ├── _darkmode.scss        # Already dark — light mode overrides
│       │   ├── _rtl.scss             # RTL support
│       │   ├── _reports.scss         # Report styling
│       │   ├── _mobile-nav.scss      # Mobile bottom nav
│       │   ├── _transitions.scss     # Page transitions
│       │   ├── _charts.scss          # Chart theming
│       │   ├── _shortcuts.scss       # Keyboard shortcuts overlay
│       │   ├── _seasons.scss         # Seasonal effects (snow, etc.)
│       │   ├── _avatars.scss         # User avatar styling
│       │   ├── _print.scss           # Print styles
│       │   ├── _ambient.scss         # Ambient background effects
│       │   ├── _neural-grid.scss     # NEW: Neural network grid (replaces _interactive-skyline.scss)
│       │   ├── _tour.scss            # Onboarding tour
│       │   ├── _presets.scss         # Theme presets
│       │   ├── _minigame.scss        # Easter egg minigame
│       │   └── _welcome-msg.scss     # Welcome message
│       ├── js/
│       │   ├── arkan_theme.js        # Main theme controller
│       │   ├── arkan_darkmode.js     # Dark/Light mode toggle
│       │   ├── arkan_neural_grid.js  # NEW: Neural network animated background (replaces skyline)
│       │   ├── arkan_effects.js      # Particle/glow effects
│       │   ├── arkan_splash.js       # Splash screen
│       │   ├── arkan_loading.js      # Loading indicators
│       │   ├── arkan_sounds.js       # UI sounds (tech beeps)
│       │   ├── arkan_workspace.js    # Workspace customizations
│       │   ├── arkan_navbar.js       # Navbar enhancements
│       │   ├── arkan_topbar.js       # Top bar
│       │   ├── arkan_forms.js        # Form enhancements
│       │   ├── arkan_mobile.js       # Mobile bottom nav
│       │   ├── arkan_shortcuts.js    # Keyboard shortcuts
│       │   ├── arkan_seasons.js      # Seasonal effects
│       │   ├── arkan_ambient.js      # Ambient effects
│       │   ├── arkan_cursor.js       # Custom cursor (crosshair/tech)
│       │   ├── arkan_interactive_grid.js  # Interactive neural grid
│       │   ├── arkan_tour.js         # Onboarding tour
│       │   ├── arkan_presets.js      # Theme presets
│       │   ├── arkan_print_headers.js # Print headers
│       │   ├── arkan_minigame.js     # Easter egg game
│       │   ├── arkan_animated_favicon.js # Animated favicon
│       │   ├── arkan_pwa.js          # PWA/Service Worker registration
│       │   ├── arkan_desktop.js      # Desktop enhancements
│       │   ├── arkan_welcome_msg.js  # Welcome message
│       │   ├── arkan_login.js        # Login page enhancements
│       │   └── arkan_matrix.js       # NEW: Matrix rain / data stream effect
│       ├── images/
│       │   ├── (all PNGs listed in section 3)
│       └── svg/
│           ├── arkan-logo-main.svg
│           ├── arkan-logo-horizontal.svg
│           ├── arkan-logo.svg
│           ├── arkan-icon.svg
│           ├── arkan-watermark.svg
│           ├── logo_animated.svg
│           ├── brand-pattern.svg
│           └── neural_grid.svg       # Replaces dubai_skyline.svg
```

---

## 5. Visual Design Specifications

### 5a. Navbar
- **Background**: `#0A0F1C` with subtle bottom border gradient (cyan→purple→cyan)
- **Logo**: Neural A icon on left, subtle cyan glow on hover
- **Text**: `#E8ECF1` (Ghost White)
- **Active indicator**: Cyan underline with glow `box-shadow: 0 2px 8px rgba(0,240,255,0.3)`
- **Search bar**: Dark glass `rgba(255,255,255,0.05)`, cyan border on focus
- **Height**: 48px (same as TAVIRA)

### 5b. Sidebar
- **Background**: `#0A0F1C` with neural pattern overlay at 3% opacity
- **Active item**: Left border cyan gradient, background `rgba(0,240,255,0.08)`
- **Hover**: `rgba(0,240,255,0.05)` background
- **Section headers**: Gradient text (cyan→purple) with `background-clip: text`
- **Scrollbar**: Thin, cyan thumb

### 5c. Cards & Surfaces
- **Glass card**: `background: rgba(17,24,39,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(0,240,255,0.1)`
- **Hover**: Border brightens to `rgba(0,240,255,0.25)`, subtle glow
- **Elevated**: `box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 1px rgba(0,240,255,0.1)`

### 5d. Buttons
- **Primary**: Gradient background (cyan→purple), white text, glow on hover
- **Secondary**: Transparent + cyan border, cyan text, fill on hover
- **Danger**: Red background, glow red on hover
- **Success**: Emerald background

### 5e. Forms
- **Input fields**: Dark background `#111827`, border `#374151`, cyan border on focus
- **Focus glow**: `box-shadow: 0 0 0 3px rgba(0,240,255,0.15)`
- **Labels**: `#6B7280` (muted gray), uppercase, letter-spacing
- **Required star**: Cyan instead of red

### 5f. Splash Screen
```
Design:
- Full-screen deep black (#060A14) background
- Center: Logo animated SVG plays (neural A draws itself)
- Background: Subtle matrix/data rain in cyan at very low opacity
- Scanning line sweeps across (like a laser scan)
- "ARKAN" text fades in below logo in Space Grotesk
- Tagline "Intelligent Foundations" types in like terminal
- Duration: ~2800ms, then fades out
```

### 5g. Login Page
```
Design:
- Full-screen neural network grid background (animated)
- Glass card login form in center
- Logo at top of card
- Cyan focus rings on inputs
- "Sign In" button with gradient glow
- Floating particles in background (cyan dots)
- Subtle scan line animation across background
```

### 5h. Neural Grid Background (replaces Dubai Skyline)
```
Design:
- Full-width decorative element for workspaces/login
- Canvas-based or SVG animated neural network:
  - 30-50 nodes distributed across viewport
  - Lines connecting nearby nodes (distance-based)
  - Nodes glow: mix of cyan and purple
  - Data particles travel along connections
  - Mouse proximity: nodes near cursor brighten and attract connections
  - Parallax effect on scroll
  - Performance: requestAnimationFrame, respects prefers-reduced-motion
```

### 5i. Cursor Effects
```
- Default: Normal cursor
- On interactive elements: Subtle cyan ring follows cursor (like targeting reticle)
- On click: Brief ripple pulse (cyan)
- Respects prefers-reduced-motion
```

### 5j. Form Sidebar (Premium Glass Cards)
```
Same architecture as TAVIRA's form-enhancements.scss but:
- Glass cards: dark bg with cyan/purple accents instead of gold
- Section heads: gradient text (cyan→purple)
- Timeline dots: cyan instead of gold
- Sidebar-menu: cyan-tinted items
- Timestamps: cyan at low opacity
```

---

## 6. NEW Features (Beyond TAVIRA)

### 6a. `arkan_matrix.js` — Matrix Data Rain
```
Optional ambient effect (toggleable in settings):
- Columns of falling characters (mix of: 0/1, Arabic numerals ٠-٩, kanji-style glyphs)
- Color: #00F0FF at varying opacities (0.03-0.1)
- Falls behind content, purely decorative
- Canvas-based, very lightweight
- Triggered on login page and optionally on desk
```

### 6b. AI Command Palette Enhancement
```
Enhanced keyboard shortcut overlay with terminal/AI aesthetic:
- Dark glass overlay
- Commands appear like terminal prompts
- Typing animation
- "ARKAN AI" branding in corner
```

### 6c. Glitch Text Effect
```
CSS-only glitch effect on brand name "ARKAN":
- Subtle RGB split on hover
- Used on splash, login, and 404 pages
- Pure CSS (clip-path + animation)
```

### 6d. Typing Terminal Effect
```
For taglines and welcome messages:
- Monospace cursor blinking
- Characters appear one-by-one
- Optional: show > prompt before text
```

### 6e. Holographic Card Effect
```
On hover of key cards/widgets:
- Subtle rainbow/holographic shimmer
- Using background-position animation on gradient
- Very subtle, premium feel
```

---

## 7. Key Implementation Files — Detailed Specs

### 7a. `hooks.py`
```python
app_name = "arkan_theme"
app_title = "ARKAN Theme"
app_publisher = "ARKAN"
app_description = "AI & Technology Solutions Theme for ERPNext 16"
app_email = "info@arkan.tech"
app_license = "MIT"
app_home = "/desk"

add_to_apps_screen = [{
    "name": "arkan_theme",
    "logo": "/assets/arkan_theme/images/logo-header.png",
    "title": "ARKAN Theme",
    "route": "/desk/arkan-settings",
}]

app_include_css = ["/assets/arkan_theme/css/arkan.css"]
app_include_js = [
    # List ALL JS files (same pattern as tavira_theme hooks.py)
]
web_include_css = ["/assets/arkan_theme/css/arkan.css"]
web_include_js = [
    "/assets/arkan_theme/js/arkan_neural_grid.js",
    "/assets/arkan_theme/js/arkan_login.js"
]
website_context = {
    "brand_name": "ARKAN",
    "favicon": "/assets/arkan_theme/images/favicon.ico"
}
app_logo_url = "/assets/arkan_theme/images/logo-login.png"
boot_session = "arkan_theme.boot.boot_session"
required_apps = ["frappe"]
```

### 7b. `boot.py`
```python
# Same structure as tavira_theme/boot.py
# Reads "ARKAN Settings" DocType
# Defaults: brand_name="ARKAN", primary_color="#00F0FF", secondary_color="#0A0F1C"
# accent_color="#8B5CF6", etc.
```

### 7c. `manifest.json`
```json
{
  "name": "ARKAN — AI & Technology Solutions ERP",
  "short_name": "ARKAN",
  "description": "Intelligent business management powered by ERPNext",
  "start_url": "/desk",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#0A0F1C",
  "theme_color": "#00F0FF",
  "icons": [
    { "src": "/assets/arkan_theme/images/favicon-192.png", "sizes": "192x192", "type": "image/png" }
  ]
}
```

### 7d. `sw.js` — Service Worker
```javascript
// Same as tavira sw.js but with arkan cache names
// Cache name: 'arkan-theme-v1'
// Network-first strategy for API calls
// Cache-first for assets
```

---

## 8. Dark Mode / Light Mode Strategy

**ARKAN is dark-first** (opposite of TAVIRA which is light-first):

- **Default mode**: DARK (the cyber aesthetic)
- **Light mode** (`_darkmode.scss` becomes `_lightmode.scss` conceptually):
  - Background: `#F1F5F9`
  - Text: `#111827`
  - Cards: White with subtle cyan/purple border
  - Accent colors remain cyan/purple but slightly darker for contrast
  - Navbar: White/Light gray with dark text

---

## 9. Animations & Keyframes

### Core Animations
```scss
// Node pulse (for neural network nodes)
@keyframes arkan-node-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 12px rgba(0,240,255,0.4); }
}

// Connection flow (data traveling along lines)
@keyframes arkan-data-flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}

// Glow pulse (for buttons, active elements)
@keyframes arkan-glow-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(0,240,255,0.2); }
  50% { box-shadow: 0 0 20px rgba(0,240,255,0.4), 0 0 40px rgba(139,92,246,0.1); }
}

// Scan line (horizontal sweep)
@keyframes arkan-scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

// Glitch text
@keyframes arkan-glitch {
  0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 1px); }
  40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
  60% { clip-path: inset(40% 0 30% 0); transform: translate(-1px, 2px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(1px, -2px); }
}

// Typing cursor blink
@keyframes arkan-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

// Section entrance (glass cards)
@keyframes arkan-section-in {
  0% { opacity: 0; transform: translateY(8px) scale(0.96); filter: blur(2px); }
  60% { opacity: 0.8; transform: translateY(-1px) scale(1.005); filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

// Border gradient rotation
@keyframes arkan-border-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## 10. SCSS Mixins

```scss
@mixin arkan-glass {
  background: rgba(10, 15, 28, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

@mixin arkan-glass-card {
  @include arkan-glass;
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 8px;
}

@mixin arkan-neon-glow($color: #00F0FF, $intensity: 0.3) {
  box-shadow: 0 0 20px rgba($color, $intensity);
}

@mixin arkan-gradient-text {
  background: linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@mixin arkan-focus-ring {
  outline: none;
  border-color: var(--arkan-cyan);
  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.15);
}

@mixin arkan-gradient-border {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: var(--arkan-gradient-primary);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
  }
}
```

---

## 11. Special Pages

### 404 Page (`www/404.html`)
```
- Dark background with neural grid
- Large "404" with glitch animation
- "NODE NOT FOUND" subtitle in monospace
- Floating disconnected neural nodes animation
- "Return to Base" button (link to /desk)
```

### 403 Page (`www/403.html`)
```
- "ACCESS DENIED" with scan line effect
- Lock icon with red glow
- Terminal-style error message
```

### Error Page (`www/error.html`)
```
- "SYSTEM ERROR" with glitch effect
- Error code display in monospace
- Circuit board pattern background
```

---

## 12. Settings DocType — ARKAN Settings

Same fields as TAVIRA Settings, plus:

| Field | Type | Default |
|-------|------|---------|
| `brand_name` | Data | ARKAN |
| `logo_url` | Attach Image | (logo-header.png) |
| `favicon_url` | Attach Image | (favicon.ico) |
| `primary_color` | Color | #00F0FF |
| `secondary_color` | Color | #0A0F1C |
| `accent_color` | Color | #8B5CF6 |
| `enable_splash_screen` | Check | 1 |
| `enable_neural_grid` | Check | 1 |
| `enable_particles` | Check | 1 |
| `enable_sounds` | Check | 0 |
| `enable_search_overlay` | Check | 1 |
| `default_dark_mode` | Check | 1 |
| `enable_matrix_rain` | Check | 0 |
| `enable_glitch_effects` | Check | 1 |
| `enable_cursor_effects` | Check | 1 |
| `splash_duration` | Int | 2800 |
| `splash_logo_url` | Attach Image | |
| `custom_css` | Code | |
| `custom_js` | Code | |

---

## 13. Build & Install Commands

```bash
# Create the app
cd frappe-bench
bench new-app arkan_theme

# After creating all files:
# Compile SCSS
npx sass apps/arkan_theme/arkan_theme/public/scss/arkan.scss \
  apps/arkan_theme/arkan_theme/public/css/arkan.css \
  --no-source-map --style=compressed

# Build
bench build --app arkan_theme

# Install on site
bench --site dev.localhost install-app arkan_theme

# Clear cache
bench --site dev.localhost clear-cache
```

---

## 14. Critical Implementation Notes

1. **Every `tavira` reference** in code must become `arkan` — variable names, CSS classes, JS namespaces (`window.arkan = window.arkan || {}`), session keys, etc.

2. **The theme is DARK-FIRST** — the default state is dark. The `_darkmode.scss` file should actually contain LIGHT mode overrides (when user toggles to light).

3. **Performance**: All canvas animations must use `requestAnimationFrame`, respect `prefers-reduced-motion`, and have kill switches via ARKAN Settings.

4. **RTL Support**: Full RTL support in `_rtl.scss` (Arabic company).

5. **No conflicts with other themes**: Use `arkan-` prefix for ALL CSS classes, `arkan.` namespace for ALL JS objects.

6. **The neural grid JS** should be the hero feature — a beautiful, interactive, performant neural network visualization that replaces TAVIRA's skyline.

7. **Sounds**: Tech-themed — soft beeps, digital clicks, subtle synth tones (short, <100ms). All optional via settings.

8. **Minigame**: Replace TAVIRA's game with a simple "Neural Network Training" game — connect nodes to complete patterns, or a simple Snake game on a circuit board grid.

9. **Seasons**: 
   - Winter: Digital snowflakes (geometric hexagons falling)
   - Spring: Green data particles
   - Summer: Warm orange glowing nodes
   - Autumn: Red/amber circuit traces
   - Ramadan: Crescent + star particles in gold

10. **The brand-pattern.svg** should tile seamlessly and be used as a subtle background texture throughout the app.

---

## 15. Summary — Key Differences from TAVIRA

| Aspect | TAVIRA | ARKAN |
|--------|--------|-------|
| Industry | Luxury Real Estate | AI & Technology Solutions |
| Mood | Warm, opulent, traditional | Cool, futuristic, cyber |
| Primary BG | Navy `#1D2939` | Deep Black `#0A0F1C` |
| Accent 1 | Gold `#DDA46F` | Electric Cyan `#00F0FF` |
| Accent 2 | Cream `#FFF1E7` | Neon Purple `#8B5CF6` |
| Text | Dark on light | Light on dark |
| Font | Rubik + Poppins | Space Grotesk + Inter |
| Logo | Stylized T with diamond | Neural A in angle brackets |
| Hero BG | Dubai Skyline | Neural Network Grid |
| Splash | Gold T drawing | Neural network forming |
| Pattern | Arabesque geometric | Circuit board traces |
| Cursor | Elegant trail | Tech reticle/crosshair |
| Default mode | Light (dark optional) | Dark (light optional) |
| Borders | Gold accents | Cyan/Purple gradients |
| Glow style | Warm gold glow | Cool neon glow |
| Sound theme | Luxury chimes | Tech beeps/synth |
