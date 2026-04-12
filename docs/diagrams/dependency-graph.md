# Arkan Theme — Dependency Graph
# أركان ثيم — مخطط التبعيات

```mermaid
graph TD
    frappe["frappe v16"]
    frappe_visual["frappe_visual"]
    arkan_help["arkan_help"]
    arkan_theme["Arkan Theme"]
    frappe --> arkan_theme
    frappe_visual --> arkan_theme
    arkan_help --> arkan_theme
    style arkan_theme fill:#3B82F6,color:#fff
    style frappe fill:#0089FF,color:#fff
```
