from rest_framework import serializers
from .. import models


class ApartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Apartments
        fields = ('id' ,'title', 'price', 'location', 'lat', 'lng', 'image', 'date_created')