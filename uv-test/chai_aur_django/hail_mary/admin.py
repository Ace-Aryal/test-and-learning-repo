from django.contrib import admin
from .models import SpaceCraft, CrewMember, Destination, Engineers


# class CrewMemberReviewInline(admin.TabularInline):
#     model = CrewMember
#     extra = 2


# class SpaceCraftAdmin(admin.ModelAdmin):
#     list_display = ("name", "age")
#     inlines = [CrewMemberReviewInline]


# Register your models here.
admin.site.register([SpaceCraft, Destination, Engineers, CrewMember])
# admin.site.register(CrewMember, SpaceCraftAdmin)
