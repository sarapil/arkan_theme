# API Reference — مرجع الواجهة البرمجية

## Overview — نظرة عامة

ARKAN Theme is primarily a **CSS/JavaScript theme** with minimal backend API. Most interaction is through CSS variables and JavaScript utilities.

---

## CSS Variables API — متغيرات CSS

Use CSS custom properties anywhere in your stylesheets:

```css
.my-component {
  background: var(--at-bg);
  color: var(--at-text);
  border: 1px solid var(--at-border);
  border-radius: var(--at-radius-md);
  padding: var(--at-space-md);
  box-shadow: var(--at-shadow-sm);
}
```

### Color Variables

| Variable          | Light Mode | Dark Mode | Usage             |
| ----------------- | ---------- | --------- | ----------------- |
| `--at-primary`    | `#1E40AF`  | `#1E40AF` | Brand primary     |
| `--at-secondary`  | `#64748B`  | `#64748B` | Secondary accents |
| `--at-success`    | `#10B981`  | `#10B981` | Success states    |
| `--at-warning`    | `#F59E0B`  | `#F59E0B` | Warnings          |
| `--at-danger`     | `#EF4444`  | `#EF4444` | Errors            |
| `--at-info`       | `#3B82F6`  | `#3B82F6` | Information       |
| `--at-bg`         | `#FFFFFF`  | `#0F172A` | Main background   |
| `--at-bg-subtle`  | `#F8FAFC`  | `#1E293B` | Subtle background |
| `--at-text`       | `#1E293B`  | `#F1F5F9` | Main text         |
| `--at-text-muted` | `#64748B`  | `#94A3B8` | Muted text        |
| `--at-border`     | `#E2E8F0`  | `#334155` | Borders           |

### Spacing Variables

| Variable        | Value     | Pixels |
| --------------- | --------- | ------ |
| `--at-space-xs` | `0.25rem` | 4px    |
| `--at-space-sm` | `0.5rem`  | 8px    |
| `--at-space-md` | `1rem`    | 16px   |
| `--at-space-lg` | `1.5rem`  | 24px   |
| `--at-space-xl` | `2rem`    | 32px   |

### Border Radius Variables

| Variable         | Value      | Usage           |
| ---------------- | ---------- | --------------- |
| `--at-radius-sm` | `0.375rem` | Buttons, inputs |
| `--at-radius-md` | `0.5rem`   | Cards           |
| `--at-radius-lg` | `0.75rem`  | Modals          |
| `--at-radius-xl` | `1rem`     | Large cards     |

### Shadow Variables

| Variable         | Value                         | Usage            |
| ---------------- | ----------------------------- | ---------------- |
| `--at-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`  | Subtle elevation |
| `--at-shadow-md` | `0 4px 6px rgba(0,0,0,0.07)`  | Cards            |
| `--at-shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals           |

---

## JavaScript API — واجهة JavaScript

### Theme Toggle

```javascript
// Toggle dark mode
arkanTheme.toggleDarkMode();

// Check current mode
if (arkanTheme.isDarkMode()) {
  // In dark mode
}

// Set specific mode
arkanTheme.setMode("dark"); // 'light' | 'dark' | 'auto'

// Get current mode
const mode = arkanTheme.getMode();
```

### Event Listeners

```javascript
// Listen for theme changes
document.addEventListener("arkan:theme-change", (e) => {
  console.log("Theme changed to:", e.detail.mode);
});
```

### GSAP Animations

```javascript
// GSAP is globally available
gsap.from(".my-cards", {
  opacity: 0,
  y: 30,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
});
```

---

## Utility Classes — فئات CSS المساعدة

```html
<!-- Glassmorphism effect -->
<div class="at-glass">Content with frosted glass</div>

<!-- Text utilities -->
<p class="at-text-muted">Muted text</p>
<p class="at-text-primary">Primary colored text</p>

<!-- Background utilities -->
<div class="at-bg-subtle">Subtle background</div>
<div class="at-bg-primary">Primary background</div>
```

---

## DocType Settings — إعدادات النوع

### ARKAN Settings Fields

| Field                | Type         | Description            |
| -------------------- | ------------ | ---------------------- |
| `dark_mode`          | Select       | light/dark/auto        |
| `primary_color`      | Color        | Override primary color |
| `logo_login`         | Attach Image | Login page logo        |
| `logo_sidebar`       | Attach Image | Sidebar logo           |
| `favicon`            | Attach Image | Browser favicon        |
| `custom_css`         | Code         | Additional CSS         |
| `enable_neural_grid` | Check        | Login animation        |

### Python API

```python
# Get theme settings
settings = frappe.get_cached_doc("ARKAN Settings")

# Check dark mode
is_dark = settings.dark_mode == "dark"

# Get custom color
primary = settings.primary_color or "#1E40AF"
```

---

## CAPS Capabilities — صلاحيات CAPS

| Capability            | Description           |
| --------------------- | --------------------- |
| `AT_manage_theme`     | Access ARKAN Settings |
| `AT_customize_colors` | Change colors         |
| `AT_manage_assets`    | Upload logos          |

- API key + secret in Authorization header
- OAuth 2.0 Bearer token

## Endpoints — نقاط النهاية

<!-- Document each API endpoint here -->

### Example: List Records

```bash
curl -X POST 'https://site.example.com/api/method/arkan_theme.api.v1.records.get_list' \
  -H 'Authorization: token api_key:api_secret' \
  -H 'Content-Type: application/json' \
  -d '{"page": 1, "page_size": 20}'
```

## Rate Limiting — تحديد المعدل

- Standard APIs: 100 requests/minute
- Heavy APIs: 10 requests/minute
- Guest APIs: 5 requests/minute

## Error Codes — رموز الخطأ

| Code                | HTTP | Description (EN)         | الوصف (AR)        |
| ------------------- | ---- | ------------------------ | ----------------- |
| `VALIDATION_ERROR`  | 400  | Invalid input            | مدخل غير صالح     |
| `PERMISSION_DENIED` | 403  | Insufficient permissions | صلاحيات غير كافية |
| `NOT_FOUND`         | 404  | Resource not found       | المورد غير موجود  |
| `RATE_LIMITED`      | 429  | Too many requests        | طلبات كثيرة جداً  |
| `INTERNAL_ERROR`    | 500  | Server error             | خطأ في الخادم     |
