Here’s a **clean, practical guide to basic file handling in Python** — no fluff, just what you actually need.

---

# 🧠 Core Idea

> File handling = **open → read/write → close**

Python gives you a clean way to do this safely.

---

# 📂 1. Opening a file

```python
f = open("file.txt", "r")
```

### Modes (important)

| Mode  | Meaning                            |
| ----- | ---------------------------------- |
| `"r"` | Read (error if file doesn’t exist) |
| `"w"` | Write (overwrites file)            |
| `"a"` | Append (adds to end)               |
| `"x"` | Create (fails if exists)           |

---

# ✅ Best Practice (ALWAYS use this)

```python
with open("file.txt", "r") as f:
    content = f.read()
```

👉 Why?

* Automatically closes file
* Cleaner + safer

---

# 📖 2. Reading files

### Read entire file

```python
content = f.read()
```

---

### Read line by line

```python
for line in f:
    print(line)
```

---

### Read all lines as list

```python
lines = f.readlines()
```

👉 Output:

```python
["line1\n", "line2\n"]
```

---

# ✍️ 3. Writing files

### Overwrite

```python
with open("file.txt", "w") as f:
    f.write("Hello")
```

⚠️ Deletes old content

---

### Append

```python
with open("file.txt", "a") as f:
    f.write("\nNew line")
```

---

# 🔄 4. Reading + Writing

```python
with open("file.txt", "r+") as f:
    content = f.read()
    f.write("More data")
```

---

# 🧠 Important Concepts

## 🔹 File pointer (cursor)

After reading:

```python
f.read()
f.read()   # ❌ empty
```

👉 Because pointer is at the end

---

### Reset pointer

```python
f.seek(0)
```

---

## 🔹 File exists check

```python
import os

os.path.exists("file.txt")
```

---

# ⚡ Common mistakes

### ❌ Forgetting `with`

```python
f = open("file.txt")
# file may not close properly
```

---

### ❌ Using wrong mode

```python
open("file.txt", "w")  # deletes content accidentally
```

---

# 🧠 Real-world backend relevance (important for you)

You’ll use file handling for:

* Logs
* Config files
* Uploads (images, PDFs)
* Temporary data storage

---

# 🔥 Mental Model

Think:

```text
file = stream of data
```

* You read/write sequentially
* Pointer moves forward

---

# 🔥 Quick challenge

What will this output?

```python
with open("test.txt", "w") as f:
    f.write("Hello")

with open("test.txt", "r") as f:
    print(f.read())
    print(f.read())
```

---

If you want next:
👉 I can connect this to **how Django handles file uploads (media, static, S3)** — that’s where this becomes real backend skill.
