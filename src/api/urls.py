from django.urls import path

from api import api
from . import views


urlpatterns = [
    path('users/', api.users, name='users'),
    path('maps/', api.maps, name='maps'),
    path('sources/<pk>/', api.sources, name='sources')
]
