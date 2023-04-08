

from django.urls import path
from rest_framework.authtoken import views as v

from . import views


urlpatterns = [
    path('login/', v.obtain_auth_token),
    path('register/', views.register_user),
]
