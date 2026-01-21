# Bootstrap Vue Components Reference

## Layout Components

### b-container
Responsive container for page content
```vue
<b-container>Content</b-container>
```

### b-row
Grid row - creates horizontal groups of columns
```vue
<b-row>...</b-row>
```

### b-col
Grid column - responsive column sizing
```vue
<b-col cols="12" md="6" lg="3">...</b-col>
```
- `cols` - columns on mobile (out of 12)
- `md` - columns on medium screens
- `lg` - columns on large screens

## Navigation Components

### b-navbar
Top navigation bar
```vue
<b-navbar toggleable="md" type="dark" variant="primary">
```
- `toggleable` - breakpoint for collapsing (sm, md, lg, xl)
- `type` - "light" or "dark"
- `variant` - color scheme (primary, secondary, success, etc.)

### b-navbar-brand
Brand/logo in navbar
```vue
<b-navbar-brand href="#">Brand Name</b-navbar-brand>
```

### b-navbar-toggle
Hamburger menu button for mobile
```vue
<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
```
- `target` - ID of collapse element to toggle

### b-collapse
Collapsible content (used with navbar-toggle)
```vue
<b-collapse id="nav-collapse" is-nav>...</b-collapse>
```
- `is-nav` - optimized for navbar

### b-navbar-nav
Container for nav items
```vue
<b-navbar-nav>...</b-navbar-nav>
```

### b-nav-item
Individual navigation link
```vue
<b-nav-item href="#" active>Dashboard</b-nav-item>
```
- `active` - highlights current page

### b-nav-item-dropdown
Dropdown menu in navbar
```vue
<b-nav-item-dropdown text="Account" right>
```
- `text` - dropdown button text
- `right` - align dropdown to right

### b-dropdown-item
Item inside dropdown menu
```vue
<b-dropdown-item href="#">Profile</b-dropdown-item>
```

### b-dropdown-divider
Divider line in dropdown
```vue
<b-dropdown-divider></b-dropdown-divider>
```

## Form Components

### b-form
Form wrapper
```vue
<b-form @submit.prevent="handleSubmit">...</b-form>
```

### b-form-group
Form field with label
```vue
<b-form-group label="Name:" label-for="input-name">
```

### b-form-input
Text/email input field
```vue
<b-form-input
  id="input-name"
  v-model="name"
  type="text"
  placeholder="Enter name"
  required
></b-form-input>
```
- `type` - text, email, password, number, etc.
- `required` - HTML5 validation

### b-form-select
Dropdown select field
```vue
<b-form-select
  v-model="selected"
  :options="options"
></b-form-select>
```
- `options` - array of {value, text} objects

## Display Components

### b-card
Card container
```vue
<b-card border-variant="primary">
  <template #header>Header</template>
  <b-card-text>Content</b-card-text>
  <template #footer>Footer</template>
</b-card>
```
- `border-variant` - border color

### b-card-text
Card body content
```vue
<b-card-text>Text content</b-card-text>
```

### b-table
Data table
```vue
<b-table
  :fields="fields"
  :items="items"
  striped
  hover
  bordered
></b-table>
```
- `fields` - column definitions
- `items` - data array
- `striped` - alternate row colors
- `hover` - highlight on hover
- `bordered` - add borders

### b-badge
Status badge/label
```vue
<b-badge variant="success">Active</b-badge>
```
- `variant` - color (success, danger, warning, info, etc.)

### b-button
Button component
```vue
<b-button variant="primary" size="md" type="submit">
  Click Me
</b-button>
```
- `variant` - color theme
- `size` - sm, md, lg
- `type` - button, submit, reset

### b-modal
Modal dialog
```vue
<b-modal
  v-model="show"
  title="Modal Title"
  size="md"
  hide-footer
  @hide="handleHide"
>
  Content
</b-modal>
```
- `v-model` - show/hide state
- `size` - sm, md, lg, xl
- `hide-footer` - remove default footer

## Color Variants

All components that support `variant` prop can use:
- `primary` - Blue
- `secondary` - Gray
- `success` - Green
- `danger` - Red
- `warning` - Yellow
- `info` - Light Blue
- `light` - Light Gray
- `dark` - Dark Gray
