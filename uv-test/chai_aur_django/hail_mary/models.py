from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


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
    # realtionships

    # for admin panel
    def __str__(self):
        return self.name


# Relationships


class Destination(models.Model):
    star_system = models.CharField(max_length=100)
    distance = models.FloatField()
    time_for_trip = models.FloatField()
    space_craft = models.OneToOneField(
        SpaceCraft, on_delete=models.CASCADE, related_name="destination"
    )

    def __str__(self):
        return self.star_system


class Engineers(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    specification = models.CharField(max_length=100)
    space_crafts = models.ManyToManyField(SpaceCraft, related_name="engineers")

    def __str__(self):
        return self.name


class CrewMember(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    # many to one using FK-> many crewmembers to one spacecraft
    space_craft = models.ForeignKey(
        SpaceCraft, on_delete=models.CASCADE, related_name="crew_members"
    )

    def __str__(self):
        return self.name


# name will be used from parent table to call relation e.g. spacecraft.crew_members.all()
