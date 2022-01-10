from django.contrib import admin
from . import models


@admin.register(models.Apartments)
class ApartmentsAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'location', 'lat', 'lng', 'image', 'date_created']
    list_filter = ['title', 'price', 'location', 'lat', 'lng', 'date_created']
