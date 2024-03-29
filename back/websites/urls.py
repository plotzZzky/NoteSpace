from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_all_sites, name='get_all_sites'),
    path('new/', views.create_site, name='create_site'),
    path('del/', views.delete_site, name='delete_site'),
]
