from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from .models import ContactModel
from .serializer import ContactSerializer


class ContactView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ContactModel.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['get', 'post', 'delete']

    def list(self, request, *args, **kwargs):
        query = ContactModel.objects.filter(user=request.user)
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            firstname = request.data['firstname']
            lastname = request.data.get('lastname', '')
            telephone = request.data.get('telephone', '')
            email = request.data['email']
            social = request.data.get('social', '')
            color = request.data.get('color', '#FFFFFF')
            user = request.user
            ContactModel.objects.create(user=user, firstname=firstname, lastname=lastname, telephone=telephone,
                                        email=email, social=social, color=color)
            return Response({"text": "Contato criado"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError):
            return Response({"text": "Formulario incorreto"}, status=status.HTTP_400_BAD_REQUEST)
