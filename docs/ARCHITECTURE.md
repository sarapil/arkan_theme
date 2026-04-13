# ARKAN Theme — Architecture
# ثيم أركان — الهيكلية

> Modern Glassmorphism Theme with Dark Mode and RTL Support

## Overview — نظرة عامة

ARKAN Theme provides a premium visual experience for Frappe applications:
- **Glassmorphism design** — Frosted glass effect with backdrop blur
- **Dark mode** — Automatic or manual dark/light toggle
- **RTL support** — Full Arabic/RTL layout support
- **3D effects** — GSAP-powered animations and transitions
- **Neural grid** — Animated background on login page
- **Brand customization** — Custom logos, colors, and typography

---

## File Structure — هيكل الملفات

```
arkan_theme/
├── public/
│   ├── css/
│   │   ├── arkan.css                 # Main compiled CSS
│   │   └── arkan_theme-variables.css # CSS custom properties
│   ├── scss/
│   │   ├── _variables.scss           # SCSS variables
│   │   ├── _mixins.scss              # Reusable mixins
│   │   ├── _base.scss                # Base styles
│   │   ├── _components.scss          # Component styles
│   │   ├── _dark-mode.scss           # Dark mode overrides
│   │   └── arkan.scss                # Main entry point
│   ├── js/
│   │   ├── arkan_theme.bundle.js     # Main JS bundle
│   │   ├── arkan_login.js            # Login page enhancements
│   │   ├── arkan_neural_grid.js      # Neural network animation
│   │   └── vendor/
│   │       └── gsap.min.js           # GSAP animation library
│   └── images/
│       ├── logo-login.png            # Login page logo
│       ├── logo-header.png           # Sidebar logo
│       └── favicon.ico               # Browser favicon
└── arkan_theme/
    └── doctype/
        └── arkan_settings/           # Settings DocType
```

---

## CSS Variables Reference — مرجع متغيرات CSS

All variables use the `--at-` prefix (ARKAN Theme).

### Color Palette — لوحة الألوان

```css
:root {
  /* Primary Brand Colors */
  --at-primary: #1E40AF;          /* Main brand color (blue) */
  --at-primary-light: #1E40AF22;  /* Light variant (with alpha) */
  --at-primary-dark: #1E40AFDD;   /* Dark variant */
  
  /* Secondary & Accent */
  --at-secondary: #64748B;        /* Secondary color (slate) */
  --at-accent: #1E40AF;           /* Accent for highlights */
  
  /* Semantic Colors */
  --at-success: #10B981;          /* Success/positive (emerald) */
  --at-warning: #F59E0B;          /* Warning/caution (amber) */
  --at-danger: #EF4444;           /* Error/danger (red) */
  --at-info: #3B82F6;             /* Information (blue) */
  
  /* Surface Colors */
  --at-bg: #FFFFFF;               /* Main background */
  --at-bg-subtle: #F8FAFC;        /* Subtle/secondary background */
  --at-text: #1E293B;             /* Main text color */
  --at-text-muted: #64748B;       /* Muted/secondary text */
  --at-border: #E2E8F0;           /* Border color */
}
```

### Dark Mode — الوضع الداكن

```css
[data-theme="dark"] {
  --at-bg: #0F172A;               /* Dark background (slate-900) */
  --at-bg-subtle: #1E293B;        /* Dark secondary (slate-800) */
  --at-text: #F1F5F9;             /* Light text (slate-100) */
  --at-text-muted: #94A3B8;       /* Muted light text (slate-400) */
  --at-border: #334155;           /* Dark border (slate-700) */
  
  /* Shadows adjusted for dark mode */
  --at-shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --at-shadow-md: 0 4px 6px rgba(0,0,0,0.4);
  --at-shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
}
```

### Spacing Scale — مقياس التباعد

```css
:root {
  --at-space-xs: 0.25rem;   /* 4px */
  --at-space-sm: 0.5rem;    /* 8px */
  --at-space-md: 1rem;      /* 16px */
  --at-space-lg: 1.5rem;    /* 24px */
  --at-space-xl: 2rem;      /* 32px */
}
```

### Border Radius — انحناء الحواف

```css
:root {
  --at-radius-sm: 0.375rem;  /* 6px - buttons, inputs */
  --at-radius-md: 0.5rem;    /* 8px - cards */
  --at-radius-lg: 0.75rem;   /* 12px - modals */
  --at-radius-xl: 1rem;      /* 16px - large cards */
}
```

### Shadow Scale — مقياس الظل

```css
:root {
  --at-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);   /* Subtle */
  --at-shadow-md: 0 4px 6px rgba(0,0,0,0.07);   /* Cards */
  --at-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);  /* Modals */
}
```

### Typography — الخطوط

```css
:root {
  /* Font Families */
  --at-font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --at-font-family-ar: "IBM Plex Sans Arabic", "Tajawal", sans-serif;
  
  /* Font Sizes (using clamp for responsive) */
  --at-text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --at-text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --at-text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --at-text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --at-text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
}
```

---

## Glassmorphism Effect — التأثير الزجاجي

The signature ARKAN Theme effect:

```css
.at-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .at-glass {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## JavaScript Components — مكونات JavaScript

### Theme Toggle

```javascript
// Toggle dark mode
arkanTheme.toggleDarkMode();

// Check current mode
const isDark = arkanTheme.isDarkMode();

// Set specific mode
arkanTheme.setMode('dark'); // 'light' | 'dark' | 'auto'
```

### Neural Grid (Login Page)

```javascript
// Initialize neural grid animation
arkanNeuralGrid.init({
  container: '#login-page',
  nodeCount: 50,
  connectionDistance: 150,
  speed: 0.5
});
```

### GSAP Animations

```javascript
// Page entrance animation
gsap.from('.page-content', {
  opacity: 0,
  y: 20,
  duration: 0.5,
  ease: 'power2.out'
});
```

---

## RTL Support — دعم RTL

The theme uses CSS Logical Properties for automatic RTL:

```css
/* ✅ Use logical properties */
margin-inline-start: var(--at-space-md);
padding-inline-end: var(--at-space-sm);
text-align: start;

/* ❌ Avoid physical properties */
/* margin-left, padding-right, text-align: left */
```

### RTL Detection

```javascript
const isRTL = document.dir === 'rtl' || 
  document.documentElement.lang === 'ar';
```

---

## DocTypes — أنواع المستندات

### ARKAN Settings

Main configuration DocType for theme customization.

| Field | Type | Description |
|-------|------|-------------|
| `dark_mode` | Select | light/dark/auto |
| `primary_color` | Color | Brand primary color |
| `logo_login` | Attach Image | Login page logo |
| `logo_sidebar` | Attach Image | Sidebar logo |
| `custom_css` | Code | Additional CSS |
| `enable_neural_grid` | Check | Enable login animation |

### AT App Media Override

Child table for per-app branding overrides.

| Field | Type | Description |
|-------|------|-------------|
| `app` | Link | Target app |
| `logo_url` | Data | Custom logo URL |
| `icon_url` | Data | Custom icon URL |
| `color` | Color | Custom brand color |

---

## Integration Points — نقاط التكامل

| Integration | Purpose |
|-------------|---------|
| **Frappe Core** | Desk styling, login page |
| **frappe_visual** | Component enhancement |
| **arkan_help** | Help tooltip styling |
| **CAPS** | Theme management permissions |
| **All Arkan Apps** | Inherit theme styles |

---

## Performance — الأداء

- CSS is compiled from SCSS via esbuild
- JS is bundled and minified
- GSAP is loaded only when animations needed
- Neural grid uses requestAnimationFrame
- Dark mode uses CSS variables (no JS re-rendering)

---

## Browser Support — دعم المتصفحات

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |

**Note:** `backdrop-filter` requires Safari 9+ with prefix.

---

## Changelog

| Version | Changes |
|---------|---------|
| 18.0.0 | 3D effects, GSAP integration |
| 17.0.0 | Neural grid login animation |
| 16.0.0 | Initial v16 compatible release |
