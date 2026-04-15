# Developer — Usage Scenarios

# سيناريوهات المطور

## Role Overview

- **Title**: Frappe App Developer / مطور تطبيقات Frappe
- **Primary Access**: Use CSS variables, integrate theme components
- **Device**: Desktop (IDE)

---

## Daily Scenarios (يومي)

### DS-001: Use Theme CSS Variables

- **Goal**: Apply consistent styling using ARKAN Theme variables
- **Pre-conditions**: arkan_theme is installed
- **Steps**:
  1. In your app's SCSS/CSS file:

     ```css
     .my-component {
       background: var(--at-bg-subtle);
       color: var(--at-text);
       border: 1px solid var(--at-border);
       border-radius: var(--at-radius-md);
       padding: var(--at-space-md);
       box-shadow: var(--at-shadow-sm);
     }

     .my-button {
       background: var(--at-primary);
       color: white;
       border-radius: var(--at-radius-sm);
       padding: var(--at-space-sm) var(--at-space-md);
     }
     ```

  2. Styles automatically adapt to dark mode

- **Screen**: N/A (code-level)
- **Error scenarios**: Variable not defined (check spelling, prefix)

### DS-002: Apply Glassmorphism Effect

- **Goal**: Add frosted glass effect to a component
- **Pre-conditions**: arkan_theme is installed
- **Steps**:
  1. Add glass class or apply styles:
     ```css
     .my-card {
       background: rgba(255, 255, 255, 0.1);
       backdrop-filter: blur(10px);
       -webkit-backdrop-filter: blur(10px);
       border: 1px solid rgba(255, 255, 255, 0.2);
       box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
     }
     ```
  2. Or use the `.at-glass` utility class:
     ```html
     <div class="at-glass">...</div>
     ```
- **Screen**: Visual component
- **Error scenarios**: `backdrop-filter` not supported (older browsers)

### DS-003: Ensure Dark Mode Compatibility

- **Goal**: Make component work in both light and dark modes
- **Pre-conditions**: Component uses custom styles
- **Steps**:
  1. Use CSS variables for all colors:

     ```css
     /* ✅ Correct */
     .my-element {
       background: var(--at-bg);
       color: var(--at-text);
     }

     /* ❌ Avoid hardcoded colors */
     .my-element {
       background: white;
       color: #333;
     }
     ```

  2. Test in both modes:
     - Toggle dark mode in ARKAN Settings
     - Or use browser DevTools to toggle `[data-theme="dark"]`

- **Screen**: Visual testing
- **Error scenarios**: Hardcoded colors not adaptive

---

## Weekly Scenarios (أسبوعي)

### WS-001: Add GSAP Animations

- **Goal**: Add smooth animations to custom components
- **Pre-conditions**: GSAP is loaded (arkan_theme includes it)
- **Steps**:
  1. Create animation in JavaScript:

     ```javascript
     frappe.require(["/assets/arkan_theme/js/vendor/gsap.min.js"], () => {
       // Entrance animation
       gsap.from(".my-cards", {
         opacity: 0,
         y: 30,
         duration: 0.5,
         stagger: 0.1,
         ease: "power2.out",
       });

       // Hover animation
       document.querySelectorAll(".my-card").forEach((card) => {
         card.addEventListener("mouseenter", () => {
           gsap.to(card, { scale: 1.02, duration: 0.2 });
         });
         card.addEventListener("mouseleave", () => {
           gsap.to(card, { scale: 1, duration: 0.2 });
         });
       });
     });
     ```

- **Screen**: Animated components
- **Error scenarios**: GSAP not loaded, animation conflict

### WS-002: Implement RTL Support

- **Goal**: Ensure component works in RTL (Arabic) layouts
- **Pre-conditions**: Component uses custom positioning
- **Steps**:
  1. Use CSS Logical Properties:

     ```css
     /* ✅ Correct - works in both LTR and RTL */
     .my-sidebar {
       margin-inline-start: var(--at-space-md);
       padding-inline-end: var(--at-space-sm);
       border-inline-start: 2px solid var(--at-primary);
       text-align: start;
     }

     /* ❌ Avoid physical properties */
     .my-sidebar {
       margin-left: 16px;
       padding-right: 8px;
       border-left: 2px solid blue;
       text-align: left;
     }
     ```

  2. Test with Arabic language:
     - Change user language to Arabic
     - Or add `dir="rtl"` to `<html>`

- **Screen**: RTL testing
- **Error scenarios**: Physical properties causing mirroring issues

---

## Monthly Scenarios (شهري)

### MS-001: Create Custom Theme Variant

- **Goal**: Create a new color scheme for a specific deployment
- **Pre-conditions**: Need different branding for a client
- **Steps**:
  1. Create override CSS file in your app:

     ```css
     /* my_app/public/css/theme-override.css */
     :root {
       --at-primary: #8b5cf6; /* Purple instead of blue */
       --at-primary-light: #8b5cf622;
       --at-accent: #f59e0b; /* Amber accent */
     }

     [data-theme="dark"] {
       --at-bg: #1a1a2e; /* Custom dark background */
     }
     ```

  2. Include in your app's hooks.py:
     ```python
     app_include_css = ["/assets/my_app/css/theme-override.css"]
     ```
  3. CSS loads after arkan_theme, overriding variables

- **Screen**: Full app with new colors
- **Error scenarios**: Specificity issues, load order problems

### MS-002: Debug Theme Conflicts

- **Goal**: Troubleshoot styling conflicts between apps
- **Pre-conditions**: Multiple apps with custom CSS
- **Steps**:
  1. Open DevTools → Elements panel
  2. Select the problematic element
  3. Check "Computed" styles to see final values
  4. Check "Styles" panel for rule source
  5. Identify conflicting selectors
  6. Increase specificity or use CSS variables
  7. Avoid `!important` unless absolutely necessary
- **Screen**: Browser DevTools
- **Error scenarios**: Deep specificity conflicts

---

## Exception Scenarios (استثنائي)

### ES-001: Theme Not Loading

- **Goal**: Fix theme CSS not applying
- **Pre-conditions**: Fresh install or upgrade
- **Steps**:
  1. Check if arkan_theme is in `installed_apps`:
     ```bash
     bench --site dev.localhost list-apps
     ```
  2. Rebuild assets:
     ```bash
     bench build --app arkan_theme
     ```
  3. Clear cache:
     ```bash
     bench --site dev.localhost clear-cache
     ```
  4. Check browser console for 404 errors
  5. Verify hooks.py `app_include_css` paths
- **Screen**: Terminal + Browser
- **Error scenarios**: Build errors, missing files

### ES-002: Dark Mode Toggle Not Working

- **Goal**: Fix dark mode not switching
- **Pre-conditions**: Toggle has no effect
- **Steps**:
  1. Check if `data-theme` attribute changes on `<html>`:
     ```javascript
     console.log(document.documentElement.dataset.theme);
     ```
  2. Check localStorage:
     ```javascript
     console.log(localStorage.getItem("arkan_theme_mode"));
     ```
  3. Check ARKAN Settings → Dark Mode value
  4. Clear localStorage and reload
  5. Check for JavaScript errors blocking theme toggle
- **Screen**: Browser DevTools Console
- **Error scenarios**: JS error, localStorage blocked
