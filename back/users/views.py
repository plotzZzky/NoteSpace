from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import json


@api_view(['POST'])
@csrf_exempt
def register_user(request):
    file = json.loads(request.body)
    password = file['password1']
    pwd = file['password2']
    username = file['username']
    email = file['email']
    if valid_user(password, pwd, username, email):
        user = User(username=username, email=email, password=password)
        user.set_password(password)
        user.save()
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            token = Token.objects.create(user=user)  # type:ignore
            return JsonResponse({"token": token.key}, status=200)
    else:
        return HttpResponse('Error', status=405)


def valid_user(password, pwd, username, email):
    if password != pwd or len(password) < 5:
        return False
    if len(username) < 3:
        return False
    if '@' not in email:
        return False
    return True