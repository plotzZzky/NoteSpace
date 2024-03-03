from rest_framework.routers import DefaultRouter

from . import views

user_router = DefaultRouter()
user_router.register(r'login', views.LoginView, basename='login')
user_router.register(r'register', views.RegisterView, basename='register')
user_router.register(r'recovery', views.RecoveryPassword, basename='recovery')
user_router.register(r'question', views.ReceiverYourQuestion, basename='question')
user_router.register(r'update', views.UpdateUserView, basename='update')
