from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartProductSerializer(serializers.Serializer):
    product_id = serializers.CharField()

    def validate(self, data):
       return data
