import datetime
from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
import json

from .models import NotesModel


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_all_notes(request):
    try:
        query = NotesModel.objects.filter(user=request.user)  # type:ignore
    except NotesModel.DoesNotExist:  # type:ignore
        query = {}
    data = [serialize(item) for item in query]
    return JsonResponse({"notes": data})


def serialize(item):
    note_id = item.id
    title = item.title
    text = item.text
    date = item.date
    color = item.color
    item_dict = {'id': note_id, 'title': title, 'text': text, 'date': date, "color": color}
    return item_dict


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_note(request):
    try:
        file = json.loads(request.body)
        title = file['title'].title()
        text = file['text'].capitalize()
        date = datetime.date.today()
        color = file['color']
        user = request.user
        note = NotesModel(user=user, title=title, text=text, date=date, color=color)
        note.save()
        return JsonResponse({"text": "Nota criada", "status": "200"})
    except KeyError:
        return JsonResponse({"text": "Formulario incorreto", "status": "406"})


def delete_note(request, note_id):
    try:
        query = NotesModel.objects.get(pk=note_id)  # type:ignore
        query.delete()
        return JsonResponse({"text": "Nota deletada", "status": "200"})
    except NotesModel.DoesNotExist:  # type:ignore
        return JsonResponse({"text": "Nota não encontrada", "status": "404"})
