from django.db import models
from django.contrib.auth.models import AbstractUser

# Restrurant
# Customer / User
# Rating


class Restaurant(models.Model):
    class TypeChoices(models.TextChoices):
        # IN ->Stored in databse, Indian -> Human readable form
        INDIAN = "IN", "Indian"
        CHINESE = "CH", "Chinese"
        ITALIAN = "IT", "Italian"
        NEPALI = "NP", "Nepali"

    id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=100)
    restaurant_type = models.CharField(
        choices=TypeChoices, max_length=5, default=TypeChoices.NEPALI
    )
    website = models.URLField(default="", blank=True)
    date_opened = models.DateField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


class User(AbstractUser):
    pass


class Rating(models.Model):
    id = models.UUIDField(primary_key=True)
    rating = models.PositiveSmallIntegerField()
    user = models.ForeignKey(to=User, related_name="ratings", on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        to=Restaurant, related_name="ratings", on_delete=models.CASCADE
    )
    review = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.restaurant.name} : {self.rating} from {self.user.username} "


class Sale(models.Model):
    restaurant = models.ForeignKey(
        to=Restaurant, related_name="sales", on_delete=models.SET_NULL, null=True
    )
    income = models.DecimalField(max_digits=10, decimal_places=2)
    datetime = models.DateTimeField(auto_now=True)
