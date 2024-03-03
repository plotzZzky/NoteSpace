from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
import datetime

from .models import NotesModel
from .serializer import NoteSerializer


class NoteView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = NotesModel.objects.all()
    serializer_class = NoteSerializer

    def list(self, request, *args, **kwargs):
        query = NotesModel.objects.filter(user=request.user)
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            title = request.data.get('title', 'Nova Nota').title()
            text = request.data['text'].capitalize()
            date = datetime.date.today()
            color = request.data.get('color', '#FFFFFF')
            user = request.user
            NotesModel.objects.create(user=user, title=title, text=text, date=date, color=color)
            return Response({"text": "Nota criada"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError):
            return Response({"text": "Formulario incorreto"}, status=status.HTTP_400_BAD_REQUEST)

