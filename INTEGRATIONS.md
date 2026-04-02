# 🔗 ARKAN Theme — Integrations Guide

> **Domain:** UI Theme & Branding
> **Prefix:** AT

---

## Integration Map

```
ARKAN Theme
  ├── Frappe Core
  ├── frappe_visual
```

---

## Frappe Core

### Connection Type
- **Direction:** Bidirectional
- **Protocol:** Python API / REST
- **Authentication:** Frappe session / API key

### Data Flow
| Source | Target | Trigger | Data |
|--------|--------|---------|------|
| ARKAN Theme | Frappe Core | On submit | Document data |
| Frappe Core | ARKAN Theme | On change | Updated data |

### Configuration
```python
# In AT Settings or site_config.json
# frappe_core_enabled = 1
```

---

## frappe_visual

### Connection Type
- **Direction:** Bidirectional
- **Protocol:** Python API / REST
- **Authentication:** Frappe session / API key

### Data Flow
| Source | Target | Trigger | Data |
|--------|--------|---------|------|
| ARKAN Theme | frappe_visual | On submit | Document data |
| frappe_visual | ARKAN Theme | On change | Updated data |

### Configuration
```python
# In AT Settings or site_config.json
# frappe_visual_enabled = 1
```

---

## API Endpoints

All integration APIs use the standard response format from `arkan_theme.api.response`:

```python
from arkan_theme.api.response import success, error

@frappe.whitelist()
def sync_data():
    return success(data={}, message="Sync completed")
```

---

*Part of ARKAN Theme by Arkan Lab*
