from django.contrib import admin
from django.conf import settings
from django.urls import include, path, re_path

from django.views.static import serve

from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers

from api import views, urls

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('api.urls')),
] 