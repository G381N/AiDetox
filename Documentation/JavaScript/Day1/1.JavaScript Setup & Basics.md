# Day 3 – JavaScript Setup & Basics

## 1. What is JavaScript?

JavaScript is a **programming language used to make websites interactive**.

* **HTML** → structure (what is on the page)
* **CSS** → styling (how it looks)
* **JavaScript** → behavior (how it works)

Examples:

* Button clicks
* Form validation
* Showing/hiding elements
* Calculations on a webpage

Without JavaScript, websites are mostly **static**.

---

## 2. Where Does JavaScript Run?

JavaScript runs **inside the browser**.

* Browsers like Chrome, Edge, and Firefox have JavaScript engines
* When a webpage loads, the browser reads and executes JavaScript

For beginners:

> JavaScript runs in the browser and controls webpage behavior.

---

## 3. Script Tag Placement (Head vs Body)

JavaScript is added to HTML using the `<script>` tag.

### Script inside `<head>`

```html
<head>
  <script>
    console.log("Hello");
  </script>
</head>
```

**Problem:**

* JavaScript may run before HTML loads
* Can cause errors when accessing HTML elements

---

### Script inside `<body>` (Recommended)

```html
<body>
  <h1>Hello World</h1>

  <script>
    console.log("Hello from JavaScript");
  </script>
</body>
```

**Advantage:**

* HTML loads first
* JavaScript runs after the page is ready

**Best practice (for now):**
Place the `<script>` tag just before `</body>`.

---

## 4. Using the Browser Console

The browser console is used to:

* Test JavaScript code
* Debug errors
* View output

### How to open the console:

* Right click → Inspect → Console
  OR
* Press `F12` → Console tab

### `console.log()`

```js
console.log("JavaScript is working");
```

This prints messages to the console and is used for:

* Checking values
* Debugging logic
* Learning JavaScript

---

## 5. Comments in JavaScript

Comments are used to **explain code** and are ignored by the browser.

### Single-line Comment

```js
// This is a single-line comment
console.log("Hello");
```

### Multi-line Comment

```js
/*
  This is a
  multi-line comment
*/
console.log("Hello");
```

Comments are important for:

* Readability
* Exams
* Team collaboration
* Debugging

---

