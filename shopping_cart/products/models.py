from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Product(models.Model):
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=1000, default="", blank=True)
    provider = models.CharField(max_length=120, null=True, default="")
    client = models.ManyToManyField(User, blank=True, default=None, related_name='cart_products')
    product_image = models.ImageField(blank=True, upload_to='images/', default=settings.MEDIA_ROOT + '/images/placeholder.png')
