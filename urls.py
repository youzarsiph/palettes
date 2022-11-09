""" URL routing """

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from palettes.views import UserViewSet, PaletteViewSet, ColorViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'palettes', PaletteViewSet, basename='palette')
router.register(r'colors', ColorViewSet, basename='color')

urlpatterns = [
    path('', include(router.urls)),
]
