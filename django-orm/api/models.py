from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.db.models.functions import Lower


# Restrurant
# Customer / User
# Rating
def name_must_be_capitalized(value):
    if not value:
        raise ValidationError("Empty value is not allowed for name")
    if not (value[0].upper() == value[0]):
        raise ValidationError("Restaurant name must be capitalized")


class Restaurant(models.Model):
    class Meta:
        # default orderin unless overwritten in query
        ordering = [Lower("name")]

    class TypeChoices(models.TextChoices):
        # IN ->Stored in databse, Indian -> Human readable form
        INDIAN = "IN", "Indian"
        CHINESE = "CH", "Chinese"
        ITALIAN = "IT", "Italian"
        NEPALI = "NP", "Nepali"

    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=100, validators=[name_must_be_capitalized])
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
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    # these validators will run automatically for generic views and viewsets but need to call serializer.is_valid in api views (FBV and CBV)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    user = models.ForeignKey(to=User, related_name="ratings", on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        to=Restaurant,
        related_name="ratings",
        on_delete=models.CASCADE,
    )
    review = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.restaurant.name} : {self.rating} from {self.user.username} "


class Sale(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    restaurant = models.ForeignKey(
        to=Restaurant,
        related_name="sales",
        on_delete=models.SET_NULL,
        null=True,
    )
    income = models.DecimalField(max_digits=10, decimal_places=2)
    datetime = models.DateTimeField(auto_now=True)
