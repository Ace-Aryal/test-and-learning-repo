from django.urls import path
from . import views

urlpatterns = [
    path("", views.friendship, name="friendship"),
    # path("which/", views.friendship, name="which star"),
    path("spacecrafts/", views.get_spacecrafts, name="Spacecrafs"),
    path("spacecrafts/<int:craft_id>/", views.get_craft_by_id, name="craft-details"),
]
