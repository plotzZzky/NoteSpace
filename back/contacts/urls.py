from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_all_contacts, name='get_all_contacts'),
    path('new/', views.create_contact, name='create_contact'),
    path('del/', views.delete_contact, name='delete_contact'),
]
