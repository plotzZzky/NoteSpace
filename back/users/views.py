from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .validate import valid_user


@api_view(['POST'])
@csrf_exempt
def register_user(request):
    try:
        password = request.data['password']
        pwd = request.data['pwd']
        username = request.data['username']
        email = request.data['email']
        if valid_user(password, pwd, username, email):
            user = User(username=username, email=email, password=password)
            user.set_password(password)
            user.save()
            user = authenticate(username=username, password=password)
            token = Token.objects.create(user=user)  # type:ignore
            return JsonResponse({"token": token.key}, status=200)
        else:
            raise ValueError()
    except (AttributeError, KeyError, ValueError):
        return JsonResponse({"error": "Informações incorretas!"}, status=401)

