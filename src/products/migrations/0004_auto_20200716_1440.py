# Generated by Django 3.0.8 on 2020-07-16 11:40

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0003_product_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='client',
            field=models.ManyToManyField(blank=True, default=None, to=settings.AUTH_USER_MODEL),
        ),
    ]
