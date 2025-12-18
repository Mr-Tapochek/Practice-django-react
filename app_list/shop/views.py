from django.shortcuts import render
from .models import Product
from rest_framework import generics
from .serializers import ProductSerializers

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers