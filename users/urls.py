from django.urls import path
from .views import RegisterAPIView, UserLoginAPI

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='Регистрация'),
    path('login/', UserLoginAPI.as_view(), name='Вход')
]