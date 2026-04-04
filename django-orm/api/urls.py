from django.urls import path
from api import views

urlpatterns = [path("restaurants/", views.get_restaurants_view)]
