# ARKAN Theme — Scenarios & Impact Matrix
# ثيم أركان

> DocType/API/Page scenarios with business impact assessment.

## Core Scenarios

### 1. Theme Application on Login
| Aspect | Detail |
|--------|--------|
| **Trigger** | User logs in / page loads |
| **Flow** | CSS bundle loaded → theme variables applied → brand colors active |
| **DocTypes** | Arkan Settings |
| **Impact** | HIGH — visual identity |

### 2. Theme Customization
| Aspect | Detail |
|--------|--------|
| **Trigger** | Admin changes settings |
| **Flow** | Arkan Settings → CSS variables updated → rebuild assets |
| **DocTypes** | Arkan Settings |
| **Impact** | MEDIUM — admin configuration |

### 3. RTL/LTR Layout Switching
| Aspect | Detail |
|--------|--------|
| **Trigger** | Language change |
| **Flow** | Theme detects language → applies RTL/LTR stylesheet |
| **Impact** | HIGH — Arabic support |


---

## Impact Legend
- **HIGH** — Core functionality, blocks usage if broken
- **MEDIUM** — Important but has workarounds
- **LOW** — Nice-to-have, minimal disruption if unavailable
