# Fetch API Basics

## What is an API? (Real Meaning)

**API = Application Programming Interface**

In simple terms:

> An API is a **contract** that allows your frontend to talk to a backend.

### Real user flow

1. User opens a web page
2. Frontend needs data (users, jobs, products)
3. Frontend sends a request to an API
4. Backend responds with data (usually JSON)
5. Frontend displays the data

---

### Real-world analogy

Think of an API like a **restaurant waiter**:

* You (frontend) → place an order
* Waiter (API) → takes the request
* Kitchen (backend) → prepares data
* Waiter → brings back the response

You never talk directly to the kitchen.

---

## REST API Concepts (Theory Only)

REST APIs follow **standard actions** using HTTP methods.

### Common HTTP Methods

| Method      | Meaning       | Real Use Case             |
| ----------- | ------------- | ------------------------- |
| GET         | Fetch data    | Get users, jobs, products |
| POST        | Send new data | Signup, create job        |
| PUT / PATCH | Update data   | Edit profile              |
| DELETE      | Remove data   | Delete account            |

For now, we focus on **GET only**.

---

## fetch() — What it actually does

`fetch()` is a browser function that:

* Sends an HTTP request
* Returns a **Promise**
* Resolves to an **HTTP Response object**

### Important rule

> `fetch()` does **NOT** return data directly
> It returns a **Response object**

---

## fetch() syntax (REAL FLOW)

### Basic fetch request

```js
const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

// STEP 1: Send HTTP request to backend
const httpResponseFromUsersApi = await fetch(usersApiUrl);
```

At this point:

* Data is NOT usable yet
* You only have an HTTP response

---

## Handling the response (CRITICAL PART)

### Step 1: `response.ok` — check if request succeeded

```js
if (!httpResponseFromUsersApi.ok) {
  throw new Error("Failed to fetch users from API");
}
```

Why this is needed:

* `fetch()` does NOT throw errors for HTTP failures
* 404, 500 → still resolve the Promise
* You must manually check `ok`

---

### Step 2: `response.json()` — convert JSON text to JavaScript

```js
const usersArrayAfterJsonParsing =
  await httpResponseFromUsersApi.json();
```

What this does:

* Reads JSON text from the response body
* Internally runs `JSON.parse()`
* Returns JavaScript data (array/object)

---

## Full fetch example (clean + readable)

```js
const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

async function fetchUsersFromApi() {
  try {
    // Send HTTP request
    const httpResponseFromUsersApi = await fetch(usersApiUrl);

    // Check if response is successful
    if (!httpResponseFromUsersApi.ok) {
      throw new Error("Users API returned an error");
    }

    // Convert JSON text into JavaScript data
    const usersArrayAfterJsonParsing =
      await httpResponseFromUsersApi.json();

    // Use the data
    console.log(usersArrayAfterJsonParsing);

  } catch (error) {
    console.error("Error while fetching users:", error.message);
  }
}

fetchUsersFromApi();
```

---

## Error handling with fetch (REALISTIC)

### What can go wrong

* No internet connection
* Server is down
* API returns 500
* API URL is wrong

### Proper error handling pattern

```js
try {
  const httpResponse = await fetch(apiUrl);

  if (!httpResponse.ok) {
    throw new Error("API request failed");
  }

  const parsedData = await httpResponse.json();
  console.log(parsedData);

} catch (error) {
  console.error("Something went wrong:", error.message);
}
```

---

## Important mental model (LOCK THIS IN)

```text
fetch(url)
  ↓
HTTP Response object
  ↓
response.ok (check success)
  ↓
response.json() (parse JSON text)
  ↓
JavaScript array / object
```

---

## Key rules to remember

1. `fetch()` returns a **Response object**
2. `response.ok` must be checked manually
3. `response.json()` converts JSON text to JavaScript
4. `response.json()` is a **method**, not magic
5. Always wrap fetch in `try...catch`

---

## Common beginner mistakes (avoid these)

❌ Assuming `fetch()` gives data directly
❌ Forgetting to check `response.ok`
❌ Calling `.json()` on the wrong variable
❌ Using unclear variable names like `res`, `data`

---

## Naming convention example (recommended)

```js
const httpResponseFromUsersApi = await fetch(usersApiUrl);
const usersDataAfterJsonParsing =
  await httpResponseFromUsersApi.json();
```

Readable > short. Always.


