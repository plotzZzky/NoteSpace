from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('core.urls')),
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path("notes/", include("notes.urls")),
    path("sites/", include("websites.urls")),
    path("contacts/", include("contacts.urls")),
]
