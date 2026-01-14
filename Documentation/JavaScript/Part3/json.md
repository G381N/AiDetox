# 1️⃣ JSON DEEP DIVE (PROPERLY)

## What is JSON?

**JSON = JavaScript Object Notation**

But here’s the part juniors miss (and you correctly highlighted it):

> JSON is **NOT JavaScript**
> JSON is **JUST TEXT**

It is a **data exchange format** used by:

* APIs
* Servers
* Databases
* Configuration files

### Why JSON exists (REAL reasons)

* Text travels easily over the internet (HTTP understands text)
* Smaller than XML
* Human-readable
* Language-agnostic (Java, Python, Go, Rust, Node — all can read it)

### Real-world analogy

Think of JSON like a **courier package**:

* Inside → structured data (fields, values)
* Outside → plain text so **any system** can open it

This is why browsers, servers, mobile apps all agree on JSON.

---

## JSON Example (Pure JSON)

```json
{
  "name": "Gebin George",
  "age": 23,
  "isStudent": true
}
```

Rules you **do not break** (ever):

* Keys **must** be in double quotes
* Values:

  * string → `"text"`
  * number → `21`
  * boolean → `true / false`
  * null → `null`
* ❌ No functions
* ❌ No comments

### Where this exact JSON would be used

* API response from backend → `/api/profile`
* Stored in database (MongoDB)
* Sent from frontend → backend during signup
* Stored in `localStorage` or `sessionStorage`

If you break rules → JSON becomes invalid →
API fails → frontend crashes → you get blamed.

---

## JSON vs JavaScript Object (THIS CONFUSES EVERYONE)

### JavaScript Object (lives in memory)

```js
const user = {
  name: "Gebin George",
  age: 23,
  greet: function () {
    console.log("Hello");
  }
};
```

### JSON (pure text)

```json
{
  "name": "Gebin George",
  "age": 23
}
```

### Side-by-side Truth Table

| Feature       | JavaScript Object | JSON          |
| ------------- | ----------------- | ------------- |
| Data type     | Object            | String        |
| Quotes        | Optional keys     | Keys required |
| Functions     | Allowed           | ❌ Not allowed |
| Single quotes | Allowed           | ❌ Not allowed |
| Used in code  | Yes               | No            |
| Used in APIs  | ❌                 | ✅             |

🚨 **Key reality (burn this into memory)**
APIs **never send JavaScript objects**
They send **JSON strings**, which you then convert.

---

## JSON.stringify() — Object ➜ JSON

### What it does

Converts a **JavaScript object** into a **JSON string**

### Use cases (VERY IMPORTANT)

Use `JSON.stringify()` when:

* Sending data to backend (`POST`, `PUT`)
* Storing objects in `localStorage`
* Logging or caching structured data

### Example

```js
const user = {
  name: "Gebin George",
  age: 23,
  city: "Bangalore"
};

const jsonData = JSON.stringify(user);
console.log(jsonData);
```

Output:

```json
{"name":"Gebin George","age":23,"city":"Bangalore"}
```

Check types:

```js
console.log(typeof user);     // object
console.log(typeof jsonData); // string
```

🔥 **Critical understanding**
Once stringified:

* ❌ `jsonData.name` → undefined
* Because JSON is **text**, not an object

### Real-world usage

```js
localStorage.setItem("user", JSON.stringify(user));
```

---

## JSON.parse() — JSON ➜ Object

### What it does

Converts a **JSON string** back into a **JavaScript object**

### Use cases

Use `JSON.parse()` when:

* Reading API response
* Reading from `localStorage`
* Processing backend data

### Example

```js
const jsonText = '{"name":"Gebin George","age":23}';

const userObj = JSON.parse(jsonText);

console.log(userObj.name); // Gebin George
console.log(userObj.age);  // 23
```

### Common rookie mistake

```js
JSON.parse({ name: "test" }); // ❌ ERROR
```

Why?
Because `JSON.parse()` **only accepts strings**, not objects.

### Real-world usage

```js
const savedUser = JSON.parse(localStorage.getItem("user"));
```

---

## Common JSON Data Structures — Array of Objects

### What this structure represents

An **array of objects** is used when the backend needs to send:

* Multiple records (users, jobs, products, posts)
* Each record has multiple related properties

This is the most common structure returned by APIs.

---

### JSON sent by the backend (over the network)

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "leanne@gmail.com",
    "role": "Developer"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "email": "ervin@gmail.com",
    "role": "HR"
  }
]
```

* `[]` → represents a list of records
* `{}` → represents one record
* This data is **JSON text**, not JavaScript yet

---

### JavaScript data after parsing

After this real flow:

```js
const httpResponseFromUsersApi = await fetch(usersApiUrl);
const usersArrayAfterJsonParsing = await httpResponseFromUsersApi.json();
```

The data in memory becomes:

```js
[
  {
    id: 1,
    name: "Leanne Graham",
    email: "leanne@gmail.com",
    role: "Developer"
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "ervin@gmail.com",
    role: "HR"
  }
]
```

This is now a **JavaScript array of objects**.

---

### Accessing data from an array of objects

```js
usersArrayAfterJsonParsing[0].name;   // First user's name
usersArrayAfterJsonParsing[1].email; // Second user's email
```

---

### Looping through an array of objects (common UI use case)

```js
usersArrayAfterJsonParsing.forEach(singleUserObject => {
  console.log(
    singleUserObject.name,
    singleUserObject.email,
    singleUserObject.role
  );
});
```

This pattern is used to render:

* Lists
* Tables
* Cards
* Search results

---

## Handling Nested JSON

### What nested JSON means

Nested JSON is used when:

* One piece of data belongs to another
* Related fields are grouped together

Examples:

* Address inside a user
* Location inside a company
* Settings inside a profile

---

### JSON sent by the backend (nested structure)

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "leanne@gmail.com",
  "address": {
    "city": "Gwenborough",
    "street": "Kulas Light",
    "zipcode": "92998"
  }
}
```

Here, `address` is an object nested inside the user object.

---

### JavaScript object after parsing

```js
{
  id: 1,
  name: "Leanne Graham",
  email: "leanne@gmail.com",
  address: {
    city: "Gwenborough",
    street: "Kulas Light",
    zipcode: "92998"
  }
}
```

---

### Accessing nested data

```js
parsedUserObject.address.city;    // Gwenborough
parsedUserObject.address.street; // Kulas Light
```

---

### Nested JSON inside an array (very common)

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "address": {
      "city": "Gwenborough"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "address": {
      "city": "Wisokyburgh"
    }
  }
]
```

---

### Accessing nested data inside an array

```js
usersArrayAfterJsonParsing[0].address.city; // Gwenborough
usersArrayAfterJsonParsing[1].address.city; // Wisokyburgh
```

---

### Looping with nested data (real-world UI logic)

```js
usersArrayAfterJsonParsing.forEach(singleUserObject => {
  console.log(
    singleUserObject.name,
    singleUserObject.address.city
  );
});
```

---

### Key rules to remember

* `[]` → multiple records
* `{}` → single record
* Arrays → access using index or loop
* Objects → access using dot notation
* Nested objects → chain dot notation
* Clear variable names make data structures easier to understand

---
