from .models import Product
from rest_framework import viewsets, permissions, generics, filters
from rest_framework.response import Response
from .serializers import ProductSerializer, CartProductSerializer
from django.core import serializers
from django.shortcuts import render, get_object_or_404


class ProductViewSet(viewsets.ModelViewSet):
    """Handles the product list.
    Permission: Everybody can read the list, only the admin can change it.

    """
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['description', 'name', 'provider']

    def get_queryset(self):
        return Product.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]


class CartProductViewSet(viewsets.ModelViewSet):
    """Handles the products in the user's shopping cart. Only the current user can see and modify it.

    """
    serializer_class = ProductSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.cart_products.all()


class UpdateCardAPI(generics.GenericAPIView):
    """Handles adding and removing products from the user's shopping cart.
    
    """
    serializer_class = CartProductSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        selected_product = get_object_or_404(
            Product, id=serializer.validated_data['product_id'])
        request.user.cart_products.add(selected_product)

        updated_products = ProductSerializer(
            request.user.cart_products.all(),  many=True)

        return Response(updated_products.data)

    def delete(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        selected_product = get_object_or_404(
            Product, id=serializer.validated_data['product_id'])
        request.user.cart_products.remove(selected_product)

        updated_products = ProductSerializer(
            request.user.cart_products.all(),  many=True)

        return Response(updated_products.data)
