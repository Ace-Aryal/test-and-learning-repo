from django.shortcuts import render
from .models import SpaceCraft
from django.shortcuts import get_object_or_404


# Create your views here.
def friendship(request):
    return render(request, "hail-mary/all_hail_mary.html")


def get_spacecrafts(request):
    spacecrafts = SpaceCraft.objects.all()
    return render(
        request, "hail-mary/all_spacecrafts.html", {"spacecrafts": spacecrafts}
    )


def get_craft_by_id(request, craft_id):
    craft = get_object_or_404(SpaceCraft, pk=craft_id)
    return render(request, "hail-mary/craft-details.html", {"craft": craft})
