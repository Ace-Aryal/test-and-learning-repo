from django.db import models
from django.utils import timezone


# Create your models here.
class SpaceCraft(models.Model):
    # enum
    class Pilot(models.TextChoices):
        ROCKY = "RK", "Rocky"
        GRACE = "RG", "Grace"

    name = models.CharField(max_length=64, default="")
    fuel = models.CharField(max_length=100)
    fuel_bays = models.IntegerField()
    finished_date = models.DateTimeField(default=timezone.now())
    pilot = models.CharField(max_length=100, choices=Pilot.choices)

    # media upload
    image = models.ImageField(upload_to="hail_mary/spacecrafts")

    # for admin panel
    def __str__(self):
        return self.name
