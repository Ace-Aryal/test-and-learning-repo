# scoping works just like JS but it doesnt have block level scoping
👉 **Yes — correct.**
In Python, **`if`, `for`, and `while` do NOT create a new scope.**

But let’s make this *precise*, because this concept causes a lot of subtle bugs.

---

# 🧠 The rule

👉 Python has **function-level scoping**, not block-level scoping

So:

| Construct        | New scope? |
| ---------------- | ---------- |
| `if`             | ❌ No       |
| `for`            | ❌ No       |
| `while`          | ❌ No       |
| `function (def)` | ✅ Yes      |
| `class`          | ✅ Yes      |

---

# 📌 Example (if statement)

```python
x = 10

if True:
    y = 20

print(y)
```

👉 Output:

```
20
```

✔ `y` is accessible outside
✔ No block scope

---

# 🔁 Example (loop)

```python
for i in range(3):
    pass

print(i)
```

👉 Output:

```
2
```

✔ Loop variable **leaks outside**

---

# ⚠️ This is VERY different from JS

### JS (block scoped)

```ts
if (true) {
  let x = 10;
}
console.log(x); // ❌ error
```

### Python

```python
if True:
    x = 10

print(x)  # ✅ works
```

---

# 🚨 Important nuance (don’t miss this)

Even though blocks don’t create scope…

👉 **Functions DO**

---

## Example

```python
x = 10

def test():
    x = 20  # new local variable

test()
print(x)
```

👉 Output:

```
10
```

✔ Function created a new scope

---

# ⚡ Another subtle case (very important)

## Variables inside `if` may not exist

```python
if False:
    x = 10

print(x)  # ❌ NameError
```

👉 Because the block didn’t run

---

# 🧩 Mental model

👉 Python scope is based on:

* **functions**, not curly braces or indentation

---

# 🔥 One-liner to remember

👉 **Indentation ≠ scope in Python**

---

# 🚀 Final takeaway

* `if`, `for`, `while` → NO new scope
* variables inside them → **exist outside**
* only functions/classes create scope

---

If you want next, I can show:

* `nonlocal` (this is where things get tricky)
* or real-world bugs caused by loop scoping (very interview-relevant)
