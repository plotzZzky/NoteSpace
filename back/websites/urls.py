from rest_framework.routers import DefaultRouter

from . import views

website_router = DefaultRouter()
website_router.register(r'', views.WebsiteView, basename='websites')
