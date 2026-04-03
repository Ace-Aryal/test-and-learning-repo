from django.contrib import admin
from api.models import User, Rating, Sale, Restaurant

# Register your models here.
admin.site.register((User, Rating, Sale, Restaurant))
