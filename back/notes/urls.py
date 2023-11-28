from django.urls import path

from . import views


urlpatterns = [
    path('', views.get_all_notes, name='get_all_notes'),
    path('new/', views.create_note, name='create_note'),
    path('del/', views.delete_note, name='delete_note'),
]

