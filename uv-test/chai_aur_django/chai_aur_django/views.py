from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    # return HttpResponse("Earth Erid")
    return render(request, "index.html")


def rocky(request):
    return HttpResponse("Fist my bump. Amaze Amaze Amaze !")


def mission(request):
    return HttpResponse("Grace Rocky Save Starts")
