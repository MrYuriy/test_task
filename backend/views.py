from django.shortcuts import render
from rest_framework import viewsets

from .api import serializers
from . import models


def index(request):
    return render(request, "../build/index.html")

class ApartmentsView(viewsets.ModelViewSet):
    serializer_class = serializers.ApartmentsSerializer
    queryset = models.Apartments.objects.all()
