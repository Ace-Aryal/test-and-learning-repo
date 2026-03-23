# Create a virtual environment inside your project folder
python3 -m venv venv

# Activate it (Linux / macOS)
source venv/bin/activate

# Windows
# venv\Scripts\activate

# Now install project packages safely
pip install requests

# 4. Freeze requirements
pip freeze > requirements.txt

# 5. Deactivate when done
deactivate


Exactly—Python handles this the same way as Node.js, but with slightly different files and conventions. Let’s go step by step.

---

# 🧠 1. What NOT to push

* **Do NOT push your virtual environment folder** (`venv/`)

  * It’s like `node_modules/` in Node
  * Large, platform-specific, can break other developers’ environments

```gitignore
venv/
__pycache__/
*.pyc
```

* This keeps your repo clean and lightweight

---

# 🧩 2. What you DO push

* **`requirements.txt`** → like `package.json`

  * Lists all your project-specific dependencies and versions
* Or **`pyproject.toml` + `poetry.lock`** if using Poetry

---

# 🔥 3. How another developer sets it up

Suppose you pushed your repo with `requirements.txt`:

```bash
git clone https://github.com/yourusername/project.git
cd project
```

### Step 1: Create virtual environment

```bash
python3 -m venv venv
```

### Step 2: Activate it

```bash
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
```

### Step 3: Install dependencies

```bash
pip install -r requirements.txt
```

> ✅ This installs **all packages listed in `requirements.txt`** into the local `venv/`, just like `npm install` installs everything into `node_modules/`

---

# ⚡ 4. Optional: Using Poetry (modern workflow)

* You push `pyproject.toml` + `poetry.lock`
* Another dev:

```bash
poetry install
```

* Poetry automatically creates a virtual environment and installs all dependencies
* Works like `pnpm install` in Node

---

# 🧠 5. Mental Node → Python mapping

| Node.js                   | Python                                                |
| ------------------------- | ----------------------------------------------------- |
| `node_modules/`           | `venv/`                                               |
| `package.json`            | `requirements.txt` / `pyproject.toml`                 |
| `package-lock.json`       | `requirements.txt` freeze / `poetry.lock`             |
| `npm install`             | `pip install -r requirements.txt` or `poetry install` |
| `.gitignore node_modules` | `.gitignore venv`                                     |

---

# ✅ 6. Recommended workflow

1. Create project
2. Create venv
3. Activate venv
4. Install dependencies
5. Freeze `requirements.txt`
6. Push repo **without venv/**
7. Other dev clones → creates venv → installs dependencies

---
