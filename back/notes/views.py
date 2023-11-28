import datetime
from django.http.response import JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from .models import NotesModel
from .serialize import serialize_note


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_notes(request):
    try:
        query = NotesModel.objects.filter(user=request.user)
    except ObjectDoesNotExist:
        query = {}
    data = [serialize_note(item) for item in query]
    return JsonResponse({"notes": data}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_note(request):
    try:
        title = request.data.get('title', 'Nova Nota').title()
        text = request.data['text'].capitalize()
        date = datetime.date.today()
        color = request.data.get('color', '#FFFFFF')
        user = request.user
        note = NotesModel(user=user, title=title, text=text, date=date, color=color)
        note.save()
        return JsonResponse({"text": "Nota criada"}, status=200)
    except (KeyError, ValueError):
        return JsonResponse({"text": "Formulario incorreto"}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request):
    try:
        note_id = request.data['id']
        query = NotesModel.objects.get(pk=note_id)
        query.delete()
        return JsonResponse({"text": "Nota deletada"}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({"text": "Nota não encontrada"}, status=400)
