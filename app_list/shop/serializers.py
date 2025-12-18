from rest_framework import serializers
from .models import Product

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'out_price', 'sale_price', 'image', 'category')