# Generated by Django 3.0.8 on 2020-07-17 14:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0006_auto_20200716_1501'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='client',
            field=models.ManyToManyField(blank=True, default=None, related_name='cart_products', to=settings.AUTH_USER_MODEL),
        ),
    ]
