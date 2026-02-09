# MongoEngine Field Options – Quick Reference
 
Below is a **compact reference of all commonly used field options**, what they do, and why you’d use them.
---

## Core Validation Options

### `required=True`
- **What:** Field must be provided
- **Why:** Prevent incomplete documents
- **Use:** email, price, name

---

### `unique=True`
- **What:** Value must be unique in collection
- **Why:** Prevent duplicates at DB level
- **Use:** email, username

---

### `unique_with="field"`
- **What:** Compound uniqueness
- **Why:** Scoped uniqueness
- **Use:** username per company

---

### `default=value`
- **What:** Auto value if not provided
- **Why:** Don’t trust clients
- **Use:** status, timestamps

---

### `choices=[...]`
- **What:** Restricts allowed values
- **Why:** Enforce business rules
- **Use:** role, status

---

### `max_length=50`
- **What:** Max string size
- **Why:** Prevent junk data
- **Use:** names, titles

---

### `min_value=1`
- **What:** Minimum numeric value
- **Why:** Data sanity
- **Use:** ratings, quantity

---

### `max_value=5`
- **What:** Maximum numeric value
- **Why:** Data sanity
- **Use:** ratings

---

### `null=True`
- **What:** Allows null in DB
- **Why:** Rare legacy cases
- **Use:** avoid unless required

> Mongo prefers **missing fields**, not `null`.

---

## Relationship & Structure Options

### `ReferenceField(Model)`
- **What:** Stores ObjectId reference
- **Why:** Reusable, independent data
- **Use:** category, user

---

### `EmbeddedDocument`
- **What:** Nested document
- **Why:** Data belongs to parent only
- **Use:** reviews, addresses

---

### `EmbeddedDocumentField`
- **What:** Embed document inside model
- **Why:** Atomic reads/writes
- **Use:** menu.reviews

---

### `ListField`
- **What:** List of values
- **Why:** Multi-value attributes
- **Use:** tags

---

### `DictField`
- **What:** Flexible key-value data
- **Why:** Unknown or dynamic structure
- **Use:** nutrition info

---

### `ListField(DictField)`
- **What:** List of flexible objects
- **Why:** Variants, options
- **Use:** size/price variants

---

## Database & Collection Control

### `db_alias="menu_db"`
- **What:** Select database connection
- **Why:** Multi-database separation
- **Use:** auth vs business data

---

### `collection="menu"`
- **What:** MongoDB collection name
- **Why:** Control DB layout
- **Use:** clean naming

---

### `indexes=[...]`
- **What:** Creates DB indexes
- **Why:** Fast queries
- **Use:** search, filters

---

### `sparse=True`
- **What:** Index ignores missing fields
- **Why:** Optional unique fields
- **Use:** optional email/phone

---

### `reverse_delete_rule=CASCADE`
- **What:** Auto-delete related docs
- **Why:** Data consistency
- **Use:** parent-child cleanup

---

### `primary_key=True`
- **What:** Custom primary key
- **Why:** Replace ObjectId
- **Use:** external IDs

---

## Rule of Thumb

- **required** → must exist  
- **unique** → must be alone  
- **choices** → must obey rules  
- **default** → don’t trust clients  
- **indexes** → don’t be slow  

Bad modeling = permanent tech debt.

---

## Stack
- Django
- Django REST Framework
- MongoEngine
- MongoDB Atlas
