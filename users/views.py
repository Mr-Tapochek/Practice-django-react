from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Пользователь успешно зарегистрирован'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserLoginAPI(APIView):
    def post(self, request, format=None):

        login = request.data.get('login')
        password = request.data.get('password')

        user = authenticate(username=login, password=password)

        if user is not None:

            return Response(status=HTTP_200_OK)
        else:
            return Response({"message": "Неверный логин или пароль"}, status=HTTP_401_UNAUTHORIZED)        