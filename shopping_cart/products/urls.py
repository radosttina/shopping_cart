from rest_framework import routers
from .api import ProductViewSet, UpdateCardAPI, CartProductViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')
router.register('api/cart/products', CartProductViewSet, 'cart_products')


urlpatterns = router.urls
urlpatterns.append(path('api/cart/update', UpdateCardAPI.as_view(), name='cart'))