# Day 3 – Variables & Data Types (JavaScript)

---

## 1. Variables in JavaScript

Variables are used to **store data values** that can be used and modified in a program.

JavaScript provides three ways to declare variables:

* `var`
* `let`
* `const`

---

## 2. `var` vs `let` vs `const` (IMPORTANT)

### `var`

* Old way of declaring variables
* **Function scoped**
* Can be re-declared and updated
* Hoisted with `undefined`

```js
var x = 10;
var x = 20; // allowed
```

⚠️ Not recommended in modern JavaScript due to unexpected bugs.

---

### `let`

* Modern way of declaring variables
* **Block scoped**
* Can be updated but not re-declared in the same scope

```js
let age = 20;
age = 21; // allowed
```

---

### `const`

* Used for values that should **not change**
* **Block scoped**
* Must be initialized at declaration
* Cannot be re-declared or updated

```js
const pi = 3.14;
// pi = 3.15 ❌ error
```

---

### Best Practice

* Use `const` by default
* Use `let` when the value needs to change
* Avoid `var`

---

## 3. Naming Conventions & Best Practices

### Valid Variable Names

```js
let userName = "Jebin";
let totalMarks = 95;
```

### Invalid Variable Names

```js
let 1name = "abc";    // cannot start with number
let user-name = "x"; // hyphen not allowed
```

### Naming Rules

* Use **camelCase**
* Variable names should be meaningful
* Avoid single-letter names (except loops)

```js
let isLoggedIn = true; // good
let x = true;        // bad (unclear)
```

---

## 4. Primitive Data Types

JavaScript has **primitive data types**, which store simple values.

### String

Used for text.

```js
let name = "Jebin";
```

---

### Number

Used for numbers (integers and decimals).

```js
let age = 20;
let price = 99.99;
```

---

### Boolean

Represents true or false.

```js
let isActive = true;
```

---

### Null

Represents an **intentional empty value**.

```js
let data = null;
```

---

### Undefined

A variable declared but not assigned a value.

```js
let result;
```

---

## 5. `typeof` Operator

The `typeof` operator is used to check the **data type** of a value.

```js
typeof "Hello"   // "string"
typeof 10        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" (JavaScript bug)
```


