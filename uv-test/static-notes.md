Good—this is exactly what you need now: **quick-reference + repeatable patterns**.
Not theory, just **“what do I type when I get stuck”**.

---

# 🌐 1. URLs & Routing (Cheat Sheet)

## 🧩 Project-level `urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]
```

### Key Points

* `include()` → delegates routing to an app
* Keep this file **clean and minimal**

---

## 📦 App-level `urls.py` (you create this manually)

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users),
    path('<int:id>/', views.get_user),
]
```

---

## 🧠 Mental Model

```text
/api/users/ → project urls → users.urls → views.get_users
```

---

## ⚠️ Common Mistakes

* Forgetting to create `urls.py` inside app
* Forgetting to import `include`
* Not adding app routes to project `urls.py`

---

# 🔗 2. include() (Core Concept)

## Syntax

```python
path('api/users/', include('users.urls'))
```

## What it does

* Sends all `/api/users/*` requests to `users` app

---

## 🧠 Think Like This

👉 “Anything starting with `/api/users` → let the users app handle it”

---

## Advanced (namespacing - optional for later)

```python
include(('users.urls', 'users'), namespace='users')
```

Skip this for now.

---

# 🎨 3. Static Files (Minimal for YOU)

Since you're using React → you’ll barely touch this.

## Basic Setup

### In `settings.py`

```python
STATIC_URL = '/static/'
```

---

### In template (just for knowledge)

```html
{% load static %}
<img src="{% static 'images/logo.png' %}" />
```

---

## 🧠 Your Reality (important)

* React handles frontend assets
* Django static is mostly irrelevant for you

👉 Just remember:

> “Django can serve static, but I won’t rely on it”

---

# ⚙️ 4. Common Django Commands (Daily Use)

## 🔥 Core Commands

```bash
python manage.py runserver
```

Start server

---

```bash
python manage.py startapp users
```

Create app

---

```bash
python manage.py makemigrations
```

Create migration files

---

```bash
python manage.py migrate
```

Apply to database

---

```bash
python manage.py createsuperuser
```

Create admin login

---

```bash
python manage.py shell
```

Interactive Python shell

---

## 🧪 Useful Debug Commands

```bash
python manage.py showmigrations
```

```bash
python manage.py sqlmigrate app_name 0001
```

---

# ⚡ 5. Typical Workflow (Real Dev Flow)

Whenever you build something:

```text
1. Create app
2. Add to INSTALLED_APPS
3. Create model
4. makemigrations
5. migrate
6. Register in admin
7. Create urls.py in app
8. Connect with include()
9. Add views
```

👉 This loop = 80% of Django work

---

# 🧠 6. Useful Tips (These save HOURS)

## 🔹 Tip 1: Always check INSTALLED_APPS

If something “doesn’t work” → this is often the reason.

---

## 🔹 Tip 2: Migration Discipline

* After changing models → ALWAYS:

```bash
makemigrations
migrate
```

---

## 🔹 Tip 3: Keep URLs clean

Bad:

```python
path('users/get-all-users-list-data/', ...)
```

Good:

```python
path('', ...)
```

Let base path handle meaning.

---

## 🔹 Tip 4: One App = One Responsibility

Don’t dump everything into one app.

---

## 🔹 Tip 5: Debug with Admin Panel

* Check if data is saving correctly
* Inspect models quickly

---

## 🔹 Tip 6: Use Shell for Testing

```bash
python manage.py shell
```

Test queries quickly:

```python
User.objects.all()
```

---

## 🔹 Tip 7: Read Errors Carefully

Django errors are actually helpful
👉 90% of beginners ignore them

---

## 🔹 Tip 8: Don’t Memorize — Recognize Patterns

You’ll forget syntax. That’s fine.

What matters:
👉 “I know where to write it and why”

---

# 🧭 Final Reality Check

Right now you’re doing:

* learning setup once
* expecting confidence

Instead do:
👉 **Repeat setup 5–10 times**

After that:

* URLs → automatic
* include → obvious
* migrations → instinct

---

If you want next step:
👉 I can give you a **DRF cheat sheet (serializers, views, routers)** in the same style** (this is where real backend starts)**
