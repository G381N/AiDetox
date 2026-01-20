# README

## Vue 2 Dashboard with BootstrapVue

A complete admin dashboard built with Vue 2 and BootstrapVue, demonstrating component-based architecture, props/events flow, and modern UI patterns.

---

## Features

✅ **Responsive Navigation Bar**
- Dark-themed navbar with brand and navigation items
- User dropdown menu
- Mobile-responsive toggle

✅ **Dashboard Statistics**
- 4 interactive stat cards (Total Users, Orders, Pending, Revenue)
- Color-coded with Bootstrap variants
- Reusable StatsCard component

✅ **User Management**
- Interactive table with sortable columns
- Status badges (Active/Inactive)
- Empty state handling
- 5 sample users included

✅ **Add User Modal**
- Form with validation
- Name, Email, and Role fields
- Add users dynamically to table
- Clean form reset on submit

✅ **Reusable Components**
- `StatsCard.vue` - Statistics display widget
- `BaseButton.vue` - Consistent button component
- `UserTable.vue` - Data table with custom rendering
- `AddUserModal.vue` - Form modal dialog

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Navigate to project directory:**
   ```bash
   cd c:\Users\gebin\OneDrive\Desktop\AiDetox\VueDashboard\dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run serve
   ```

4. **Open in browser:**
   ```
   http://localhost:8080
   ```

---

## Project Structure

```
dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StatsCard.vue       # Reusable stats widget
│   │   ├── BaseButton.vue      # Reusable button
│   │   ├── UserTable.vue       # User data table
│   │   └── AddUserModal.vue    # Add user form modal
│   ├── App.vue                 # Root component
│   └── main.js                 # App entry point
├── Documentation/
│   ├── BootstrapVue-Guide.md   # Complete BootstrapVue reference
│   ├── Vue2-Fundamentals.md    # Vue 2 basics
│   └── Project-Setup.md        # Setup and structure guide
├── package.json
└── webpack.config.js
```

---

## Scripts

```bash
# Start development server (with hot reload)
npm run serve

# Build for production
npm run build
```

---

## Learning Resources

### Documentation Files

All concepts are thoroughly documented in the `Documentation/` folder:

1. **BootstrapVue-Guide.md**
   - Complete component reference
   - DOM rendering examples
   - Props and usage patterns

2. **Vue2-Fundamentals.md**
   - Vue basics (data binding, directives, lifecycle)
   - Component concepts
   - Best practices

3. **Project-Setup.md**
   - File structure explanation
   - Build process details
   - Troubleshooting guide

---

## Code Features

### No Shorthands
This project uses explicit Vue syntax for learning clarity:
- `v-bind:prop` instead of `:prop`
- `v-on:event` instead of `@event`

### Extensive Comments
Every component includes:
- Props flow documentation
- Event flow documentation
- Detailed inline comments
- DOM transformation explanations

### Descriptive Naming
Variables and props use clear, descriptive names:
- `titleProp` (not just `title`)
- `usersProp` (not just `users`)
- `handleUserAdded` (not just `userAdded`)

---

## Component Overview

### StatsCard
**Purpose:** Display dashboard statistics

**Props:**
- `titleProp` (String) - Card title
- `valueProp` (String/Number) - Stat value
- `iconProp` (String) - Icon class
- `variantProp` (String) - Color variant

**Example:**
```vue
<StatsCard
  v-bind:title-prop="'Total Users'"
  v-bind:value-prop="1245"
  v-bind:variant-prop="'primary'"
></StatsCard>
```

---

### BaseButton
**Purpose:** Reusable button with consistent styling

**Props:**
- `textProp` (String) - Button text
- `variantProp` (String) - Bootstrap variant
- `sizeProp` (String) - Button size
- `disabledProp` (Boolean) - Disabled state

**Events:**
- `button-clicked` - Emitted on click with event data

**Example:**
```vue
<BaseButton
  v-bind:text-prop="'Add User'"
  v-bind:variant-prop="'primary'"
  v-on:button-clicked="handleClick"
></BaseButton>
```

---

### UserTable
**Purpose:** Display users in a sortable table

**Props:**
- `usersProp` (Array) - Array of user objects

**Features:**
- Sortable columns
- Status badges with color coding
- Empty state message

**Example:**
```vue
<UserTable
  v-bind:users-prop="usersList"
></UserTable>
```

---

### AddUserModal
**Purpose:** Modal form for adding new users

**Props:**
- `showModalProp` (Boolean) - Controls visibility

**Events:**
- `user-added` - Emitted with new user data
- `modal-closed` - Emitted when modal closes

**Example:**
```vue
<AddUserModal
  v-bind:show-modal-prop="showModal"
  v-on:user-added="handleUserAdded"
  v-on:modal-closed="handleModalClosed"
></AddUserModal>
```

---

## Data Flow Examples

### Props Flow (Parent → Child)
```
App.vue
  data: { stats: { totalUsers: 1245 } }
      ↓ v-bind:value-prop
StatsCard.vue
  props: { valueProp: Number }
      ↓ {{ valueProp }}
DOM: <h2>1245</h2>
```

### Event Flow (Child → Parent)
```
User clicks "Add User" button
      ↓
BaseButton emits 'button-clicked'
      ↑
App.vue catches event
      ↓
showModal = true
      ↓
Modal becomes visible
```

---

## Technologies Used

- **Vue 2.7.14** - Progressive JavaScript framework
- **BootstrapVue 2.23.1** - Bootstrap 4 components for Vue
- **Bootstrap 4.6.2** - CSS framework
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Customization

### Changing Colors
Modify Bootstrap variants in components:
```vue
<!-- Change from primary (blue) to success (green) -->
<StatsCard v-bind:variant-prop="'success'"></StatsCard>
```

### Adding New Stats
In App.vue, add to `dashboardStatsData`:
```javascript
dashboardStatsData: {
  newStat: {
    title: 'New Metric',
    value: 100,
    icon: 'fas fa-icon'
  }
}
```

Then add card in template:
```vue
<StatsCard
  v-bind:title-prop="dashboardStatsData.newStat.title"
  v-bind:value-prop="dashboardStatsData.newStat.value"
></StatsCard>
```

---

## Troubleshooting

### Port Already in Use
Change port in webpack.config.js:
```javascript
devServer: {
  port: 8081
}
```

### Dependencies Not Found
```bash
npm install
```

### Changes Not Showing
Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

---

## Next Steps

1. **Explore the code** - Read through component files
2. **Read documentation** - Check Documentation/ folder
3. **Make changes** - Modify colors, text, add features
4. **Experiment** - Create new components

---

## Concepts Covered

### BootstrapVue
✅ Component registration  
✅ Grid system (container, row, col)  
✅ Navigation (navbar, nav-item, dropdown)  
✅ Cards (header, body, footer, variants)  
✅ Forms (input, select, textarea, group)  
✅ Tables (fields, items, slots, sorting)  
✅ Modals (v-model, show/hide, events)  
✅ Buttons (variants, sizes)  
✅ Badges (status indicators)  

### Vue 2
✅ Component structure (template, script, style)  
✅ Props (parent → child data flow)  
✅ Events (child → parent communication)  
✅ v-bind (attribute binding)  
✅ v-on (event handling)  
✅ v-model (two-way binding)  
✅ v-for (list rendering)  
✅ v-if/v-show (conditional rendering)  
✅ Computed properties  
✅ Methods  
✅ Slots (content distribution)  
✅ Component registration  
✅ Lifecycle hooks  

---

## License

MIT License - Feel free to use this project for learning purposes.

---

## Author

Created as a learning project for Day 8 - Vue 2 + BootstrapVue Dashboard UI

---

## Support

For questions or issues:
1. Check the Documentation/ folder
2. Review inline code comments
3. Consult official Vue 2 and BootstrapVue documentation

---

Happy Learning! 🚀
