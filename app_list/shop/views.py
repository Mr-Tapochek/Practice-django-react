from django.shortcuts import render
from .models import Product
from rest_framework import generics, viewsets
from .serializers import ProductSerializers

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
