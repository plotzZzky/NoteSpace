from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import IntegrityError

from .token import create_new_token
from .models import Profile
from .serializer import UserSerializer
from .validate import (valid_user, validate_password, validate_username, validate_email, validate_question,
                       validate_answer)


class RegisterView(ModelViewSet):
    """ View de Registro de novos usuarios """
    serializer_class = UserSerializer
    queryset = []
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            pwd = request.data['pwd']
            username = request.data['username']
            email = request.data['email']
            question = request.data['question']
            answer = request.data['answer']

            if valid_user(password, pwd, username, email):
                user = User.objects.create(username=username, email=email)
                user.set_password(password)
                user.save()
                authenticate(username=username, password=password)
                token = create_new_token(user)
                answer_hashed = make_password(answer)  # salva a respota ja protegida por hash
                Profile.objects.create(user=user, question=question, answer=answer_hashed)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            else:
                raise ValueError()
        except (AttributeError, KeyError, ValueError):
            return Response({"msg": "Informações incorretas!"}, status=status.HTTP_401_UNAUTHORIZED)
        except IntegrityError as error:
            if 'auth_user_username_key' in str(error):
                field = 'Nome de usuario'
            else:
                field = 'O e-mail'
            msg = f"{field} já existe e não pode ser cadastrado!"
            return Response({"msg": msg}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ModelViewSet):
    """ View de login """
    serializer_class = UserSerializer
    queryset = []
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            username = request.data['username']

            user = authenticate(username=username, password=password)
            if user:
                token = create_new_token(user)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Login incorreto!"}, status=status.HTTP_401_UNAUTHORIZED)
        except (KeyError, ValueError):
            return Response({"error": "Login incorreto"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = []
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        """ Atualiza as informações do usario """
        try:
            user = request.user
            password = request.data.get('password', "")
            pwd = request.data.get('pwd', "")
            username = request.data.get('username', "")
            email = request.data.get('email', "")
            question = request.data.get('question', None)
            answer = request.data.get('answer', None)

            if validate_username(username):
                user.username = username
            if validate_email(email):
                user.email = email
            if validate_question(question):
                user.profile.question = question
            new_answer = validate_answer(answer)
            if new_answer:
                user.profile.answer = new_answer
            if password == pwd:
                if validate_password(password, pwd):
                    user.set_password(password)
            else:
                user.save()
                user.profile.save()
                msg = {"msg": "As senhas não são iguais, mas os demais dados foram atualizados!"}
                return Response(msg, status=status.HTTP_200_OK)
            user.save()
            user.profile.save()
            return Response({"msg": "Dados atualizados!"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"msg": "Não foi possivel atualizar!"}, status=status.HTTP_400_BAD_REQUEST)


class RecoveryPassword(ModelViewSet):
    """ Recuperação de senhas do usuario """
    queryset = []
    serializer_class = UserSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            username = request.data['username']
            answer = request.data['answer']
            password = request.data['password']
            pwd = request.data['pwd']
            user = User.objects.get(username=username)
            if check_password(answer, user.profile.answer):
                if validate_password(password, pwd):
                    user.set_password(password)
                    user.save()
                    return Response({"msg": "Senha atualizada!"}, status=200)
                else:
                    msg = "As senhas precisam ser iguais, no minimo uma letra, numero e 8 digitos!"
                    return Response({"erro": msg}, status=400)
            else:
                raise ValueError()
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"error": "Resposta incorreta!"}, status=400)


class ReceiverYourQuestion(ModelViewSet):
    """ Envia a question do usuario para o front para fazer a recuperação de senha """
    serializer_class = UserSerializer
    queryset = []
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            username = request.data['username']
            user = User.objects.get(username=username)
            question = user.profile.question
            return Response({"question": question}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response({"error": "Usuario não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
