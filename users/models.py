from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import re

def validate_cyrillic(value):
    if not all(char in 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' for char in value):
        raise ValidationError('Only Cyrillic letters are allowed.')

class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, help_text="Обязательно, минимум 3 символа")
    nickname = models.CharField(max_length=50, verbose_name='Никнейм')
    first_name = models.CharField(max_length=150, verbose_name='Имя', validators=[validate_cyrillic])
    last_name = models.CharField(max_length=150, verbose_name='Фамилия', validators=[validate_cyrillic])
    patronymic = models.CharField(max_length=150, blank=True, null=True, verbose_name='Отчество', validators=[validate_cyrillic])
    gender = models.CharField(max_length=10, choices=(('male', 'Мужской'), ('female', 'Женский')), default=None, verbose_name='Пол')
    email = models.EmailField(unique=True, verbose_name='Email')
    phone_number = models.CharField(max_length=15, verbose_name='Телефон')
    
    def __str__(self):
        return self.username