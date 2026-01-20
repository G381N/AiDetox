# BootstrapVue Components Used in `App.vue`

Quick setup:

```bash
npm install
npm run serve
```

1) NAVBAR (start here)

- `b-navbar` — root navbar component (we use `toggleable="md"` to collapse under md)
- `b-navbar-brand` — brand/logo area (used: "Admin Dashboard")
- `b-navbar-toggle` — hamburger toggle button (targets the collapse ID)
- `b-collapse` (with `is-nav`) — collapsible container for nav items
- `b-navbar-nav` — container for left/right nav items
- `b-nav-item` — individual nav links (Dashboard, Users, Reports)
- `b-nav-item-dropdown` — user account dropdown
- `b-dropdown-item` — items inside the dropdown (Profile, Settings, Logout)
- `b-dropdown-divider` — divider inside dropdown

Extras (navbar-related components you might also use but are NOT used in this app):
- `b-navbar-text` — inline text in the navbar
- `b-nav-form` — form inside navbar (search box etc.)
- `b-navbar-toggleable` — legacy/full alternative to `toggleable` prop usage


---

2) LAYOUT / GRID (page structure)

- `b-container` — responsive page container
- `b-row` — grid row
- `b-col` — responsive column (we use `cols`, `md`, `lg` props for cards)

---
3) STATS SECTION (cards)

- `StatsCard` — custom component used inside `App.vue` (see `src/components/StatsCard.vue`)
- Internally `StatsCard` uses `b-card` and `b-card-text` to render each stat visually

---
4) USER MANAGEMENT / ACTIONS

- `UserTable` — custom component used in `App.vue` (see `src/components/UserTable.vue`)
- Internally `UserTable` uses `b-table` and `b-badge` for the status column
- `AddUserModal` — custom component included by `App.vue` (see `src/components/AddUserModal.vue`)
- Internally it uses `b-modal`, `b-form`, `b-form-group`, `b-form-input`, `b-form-select`, and buttons

---
5) BUTTONS / INTERACTIONS

- `b-button` — used both directly in `App.vue` and inside child components


---

# Utility Classes (what `mt`, `ml-auto`, `d-flex`, etc. mean)

This project uses Bootstrap utility classes for quick spacing and layout. Short explanations and examples follow.

- `mt-*` — "margin top" utility. `mt-0`..`mt-5` set top margin from 0 to larger values.
- Example: `class="mt-4"` adds a medium-large top margin.
---
- `mb-*` — "margin bottom" utility (same scale as `mt-*`).
- Example: `class="mb-4"` adds bottom spacing between elements.
---
- `ml-auto` / `mr-auto` — auto horizontal margins used to push items. `ml-auto` pushes an element to the right inside a flex container.
- Example: `<b-navbar-nav class="ml-auto">` places nav items on the right.
---
- `d-flex` — display flex. Makes the element a flex container.
- Example: `class="d-flex justify-content-end"` aligns children to the right.
---
- `justify-content-*` — flex alignment along main axis. `justify-content-end` pushes children to the end (right in LTR).
- Common values: `start`, `center`, `end`, `between`, `around`.

- `align-items-*` — vertical alignment inside flex. `align-items-center` centers children vertically.

- `text-muted` — subdued text color for small/secondary text.

- `mb-4`, `mt-4`, `px-3`, `py-2` — shorthand margin/padding utilities (m = margin, p = padding; x = left+right, y = top+bottom).

- `rounded`, `shadow` — quick visual utilities for rounded corners and drop shadows.

Notes:
- Utility classes use a numeric scale (0–5) for size. `0` = 0, `1` = small, `5` = large. Exact spacing depends on Bootstrap's `$spacer` variable.
- Utilities are preferred for small layout tweaks; for complex layouts prefer custom CSS scoped to components.


---

Files to inspect:
- `src/App.vue`
- `src/components/StatsCard.vue`
- `src/components/UserTable.vue`
- `src/components/AddUserModal.vue`

If you want this file shortened, rearranged, or split by section, tell me which format you prefer.