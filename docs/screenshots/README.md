# Screenshots — لقطات الشاشة

> Marketplace-ready images for ARKAN Theme visual presentation.

## Required Screenshots — اللقطات المطلوبة

| #   | File                       | Description (EN)                              | الوصف (AR)                     |
| --- | -------------------------- | --------------------------------------------- | ------------------------------ |
| 01  | `01-light-mode.png`        | Desk in light mode showing sidebar, workspace | الوضع الفاتح مع الشريط الجانبي |
| 02  | `02-dark-mode.png`         | Desk in dark mode showing same view           | الوضع الداكن                   |
| 03  | `03-login-page.png`        | Login page with neural grid animation         | صفحة تسجيل الدخول              |
| 04  | `04-rtl-layout.png`        | Arabic RTL layout demonstration               | تخطيط RTL العربي               |
| 05  | `05-settings.png`          | ARKAN Settings DocType with customization     | نموذج الإعدادات                |
| 06  | `06-glassmorphism.png`     | Cards with glassmorphism effect               | بطاقات بتأثير زجاجي            |
| 07  | `07-mobile-responsive.png` | Mobile responsive view                        | العرض المتجاوب للجوال          |
| 08  | `08-color-comparison.png`  | Side-by-side light/dark comparison            | مقارنة الفاتح/الداكن           |

## Image Guidelines — إرشادات الصور

### Dimensions

- **Minimum**: 1280 × 800 pixels
- **Recommended**: 1920 × 1080 pixels
- **Aspect ratio**: 16:9 preferred, 4:3 acceptable

### Format

- **Preferred**: PNG (lossless, sharp text)
- **Alternative**: WebP (smaller size)
- **Avoid**: JPEG (compression artifacts on UI)

### Content Guidelines

- Show real data (use demo data, not Lorem ipsum)
- Clear, uncluttered interface
- Highlight the feature being demonstrated
- Include both English and Arabic where possible
- Remove any sensitive/personal data

---

## Capture Instructions — تعليمات الالتقاط

### Light Mode Screenshot

```bash
1. Set Dark Mode = "Light" in ARKAN Settings
2. Navigate to main workspace
3. Ensure sidebar is visible
4. Use browser zoom at 100%
5. Capture viewport (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)
```

### Dark Mode Screenshot

```bash
1. Set Dark Mode = "Dark" in ARKAN Settings
2. Same view as light mode
3. Ensure glassmorphism effects are visible
```

### Login Page Screenshot

```bash
1. Log out of the system
2. Wait for neural grid animation to start
3. Capture with animation visible
4. Include brand logo
```

### RTL Screenshot

```bash
1. Switch user language to Arabic
2. Or add ?_lang=ar to URL
3. Show sidebar on right side
4. Capture key workspace
```

### Mobile Screenshot

```bash
1. Use browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 Pro or similar
4. Capture with responsive layout visible
```

---

## Annotation Guidelines — إرشادات التعليقات

For marketing screenshots, add:

- Callout boxes highlighting key features
- Step numbers for tutorials
- Device frames for context (optional)

Tools:

- Figma (recommended)
- Cleanshot X (Mac)
- Greenshot (Windows)

---

## Naming Convention — اصطلاح التسمية

```
##-<feature-name>.png

Examples:
01-light-mode.png
02-dark-mode.png
03-login-page.png
```

---

## Marketplace Requirements — متطلبات السوق

For Frappe Cloud Marketplace:

- Minimum 5 screenshots
- Logo without text (200×200px minimum)
- Demo video link (2-5 minutes) optional but recommended

See `.github/store/arkan_theme.yml` for full listing data.
