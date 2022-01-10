from django.db import models

# Create your models here.


class Apartments(models.Model):
    title = models.CharField(max_length=500, db_index=True)
    price = models.IntegerField()
    location = models.CharField(max_length=200)
    lat = models.DecimalField(max_digits=20, decimal_places=15)
    lng = models.DecimalField(max_digits=20, decimal_places=15)
    image = models.ImageField(upload_to='uploads/apartments/% Y/% m/% d/', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('date_created', )
        verbose_name = 'Apartment'
        verbose_name_plural = 'Apartments'

    def __str__(self):
        return self.title