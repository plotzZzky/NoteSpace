from django.contrib import admin
from django.urls import path, include

from contacts.urls import contacts_router
from notes.urls import notes_routers
from websites.urls import website_router
from users.urls import user_router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(user_router.urls)),
    path("", include(notes_routers.urls)),
    path("", include(website_router.urls)),
    path("", include(contacts_router.urls)),
]
