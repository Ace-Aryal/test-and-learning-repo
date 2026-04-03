Good question—but asking for a **“full list”** is actually the wrong mental model.

> ❌ Django doesn’t categorize methods as “lazy vs instant” formally
> ✅ It depends on **what the method returns and whether it needs data**

So instead of memorizing a list, I’ll give you a **clean classification that actually scales**.

---

# 🧠 The Real Rule (remember this)

> ✅ **Lazy → returns QuerySet (builds SQL)**
> ❌ **Eager → returns actual value/object (executes SQL)**

---

# ✅ 🟢 LAZY (QuerySet builders)

These **do NOT hit the database**.

### 🔹 Filtering / Query building

```python
filter()
exclude()
all()
none()
```

---

### 🔹 Query modifiers

```python
order_by()
distinct()
reverse()
```

---

### 🔹 Field selection

```python
values()
values_list()
only()
defer()
```

---

### 🔹 Related optimizations

```python
select_related()
prefetch_related()
```

---

### 🔹 Annotation / aggregation (still lazy until evaluated)

```python
annotate()
alias()
```

---

### 🔹 Combining QuerySets

```python
union()
intersection()
difference()
```

---

### 🔹 Slicing (with no step)

```python
qs[:10]
qs[5:20]
```

✔ Still lazy → converted to SQL `LIMIT/OFFSET`

---

# ❌ 🔴 EAGER (executes immediately)

These **hit the database instantly**.

---

### 🔹 Single object fetch

```python
get()
first()
last()
earliest()
latest()
```

---

### 🔹 Aggregation / checks

```python
count()
exists()
aggregate()
```

---

### 🔹 Creation / mutation

```python
create()
get_or_create()
update_or_create()
bulk_create()
```

---

### 🔹 Updates / deletes

```python
update()
delete()
```

---

### 🔹 Evaluation triggers

```python
list(qs)
for obj in qs
bool(qs)
len(qs)
```

---

### 🔹 Special case

```python
qs[::2]   # step slicing
```

❌ Forces evaluation

---

# ⚠️ 🟡 “Looks lazy but isn’t” (common traps)

These are the ones people get wrong:

```python
exists()   # ❌ runs query
count()    # ❌ runs query
first()    # ❌ runs query
```

---

# 🔥 The clean mental model (important)

Instead of memorizing all this, use:

### Ask yourself:

> “Do I still have a QuerySet… or actual data?”

* QuerySet → lazy
* Object / int / bool → already executed

---

# 🧠 Example to test yourself

```python
qs = Restaurant.objects.filter(name="x").order_by("id")[:5]
```

👉 Lazy ✅

```python
qs.first()
```

👉 Executes ❌

---

# 💡 Senior-level insight

Django ORM is designed like:

> 🧱 Build query → chain operations → execute once

That’s why laziness exists:

* performance optimization
* SQL composition

---

# 🚀 If you want to level up

I can give you:

* tricky interview questions (they LOVE `.exists()` vs `.count()`)
* or real-world performance bugs caused by misunderstanding laziness

Just tell me 👍
