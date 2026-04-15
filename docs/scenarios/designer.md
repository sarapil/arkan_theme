# Designer — Usage Scenarios

# سيناريوهات المصمم

## Role Overview

- **Title**: UI/UX Designer / مصمم واجهات المستخدم
- **Primary Access**: Customize theme colors, typography, and branding
- **Device**: Desktop
- **CAPS Capabilities**: AT_customize_colors, AT_manage_assets

---

## Daily Scenarios (يومي)

### DS-001: Adjust Brand Colors

- **Goal**: Customize the primary color scheme to match client branding
- **Pre-conditions**: Access to ARKAN Settings
- **Steps**:
  1. Navigate to Settings → ARKAN Settings
  2. In the "Colors" section, adjust:
     - Primary Color (main brand color)
     - Secondary Color (accent elements)
     - Success/Warning/Danger colors if needed
  3. Click "Preview Theme" to see changes
  4. Click "Save" to apply
- **Screen**: ARKAN Settings form
- **Breakpoints**: Desktop ✅ / Tablet ✅ / Mobile ⚠️
- **Error scenarios**: Invalid color hex code → validation error

### DS-002: Toggle Dark Mode

- **Goal**: Switch between light/dark/auto modes
- **Pre-conditions**: Theme is active
- **Steps**:
  1. Go to ARKAN Settings
  2. In "Appearance" section, set Dark Mode to:
     - Light: Always light theme
     - Dark: Always dark theme
     - Auto: Follow system preference
  3. Save settings
- **Screen**: ARKAN Settings form
- **Breakpoints**: All devices ✅
- **Error scenarios**: None

### DS-003: Upload Brand Logos

- **Goal**: Replace default logos with client branding
- **Pre-conditions**: Logo files ready (PNG/SVG, appropriate sizes)
- **Steps**:
  1. Go to ARKAN Settings
  2. In "Branding" section, upload:
     - Login Logo (displayed on login page)
     - Sidebar Logo (displayed in navigation)
     - Favicon (browser tab icon)
  3. Save and refresh to see changes
- **Screen**: ARKAN Settings form
- **Breakpoints**: Desktop ✅
- **Error scenarios**: Invalid image format, file too large

---

## Weekly Scenarios (أسبوعي)

### WS-001: Override App-Specific Branding

- **Goal**: Give a specific app different branding from the global theme
- **Pre-conditions**: Multiple apps need different visual identities
- **Steps**:
  1. Go to ARKAN Settings
  2. Scroll to "App Media Overrides" table
  3. Add a row:
     - Target App: Select the app (e.g., "vertex")
     - Custom Logo URL: Path to custom logo
     - Custom Color: App-specific primary color
  4. Save settings
  5. Navigate to the app to verify
- **Screen**: ARKAN Settings form (child table)
- **Breakpoints**: Desktop ✅
- **Error scenarios**: Invalid app name, broken image URL

### WS-002: Add Custom CSS

- **Goal**: Apply custom styling not covered by settings
- **Pre-conditions**: CSS knowledge required
- **Steps**:
  1. Go to ARKAN Settings
  2. Scroll to "Advanced" section
  3. In "Custom CSS" field, add rules:
     ```css
     .navbar-brand {
       filter: brightness(1.1);
     }
     .page-container {
       max-width: 1400px;
     }
     ```
  4. Save and verify changes
- **Screen**: ARKAN Settings form (code field)
- **Breakpoints**: Desktop ✅
- **Error scenarios**: Invalid CSS syntax (no validation)

---

## Monthly Scenarios (شهري)

### MS-001: Export Theme Configuration

- **Goal**: Backup or share theme settings
- **Pre-conditions**: Theme fully configured
- **Steps**:
  1. Go to ARKAN Settings
  2. Click "Export Settings" button
  3. Download JSON file with all settings
  4. Store for backup or share with team
- **Screen**: ARKAN Settings actions
- **Breakpoints**: Desktop ✅
- **Error scenarios**: None

### MS-002: Import Theme Configuration

- **Goal**: Apply previously exported theme settings
- **Pre-conditions**: Have valid theme JSON file
- **Steps**:
  1. Go to ARKAN Settings
  2. Click "Import Settings" button
  3. Select JSON file
  4. Preview changes
  5. Confirm to apply
- **Screen**: ARKAN Settings actions
- **Breakpoints**: Desktop ✅
- **Error scenarios**: Invalid JSON format, incompatible version

---

## Exception Scenarios (استثنائي)

### ES-001: Reset Theme to Default

- **Goal**: Undo all customizations and restore defaults
- **Pre-conditions**: Theme is heavily customized
- **Steps**:
  1. Go to ARKAN Settings
  2. Click "Reset to Default" button
  3. Confirm the action
  4. All settings return to factory defaults
- **Screen**: ARKAN Settings actions
- **Breakpoints**: Desktop ✅
- **Error scenarios**: No undo available after reset

### ES-002: Debug CSS Issues

- **Goal**: Troubleshoot custom CSS not applying
- **Pre-conditions**: Custom CSS added but not working
- **Steps**:
  1. Open browser DevTools (F12)
  2. Check if custom CSS is in `<style>` tags
  3. Check for CSS specificity conflicts
  4. Add `!important` if needed (not recommended)
  5. Clear browser cache if old styles cached
  6. Check Custom CSS field for syntax errors
- **Screen**: Browser DevTools
- **Breakpoints**: Desktop ✅
- **Error scenarios**: CSS syntax error preventing load
