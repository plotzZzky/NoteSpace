from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
import json

from .models import ContactsModel


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_all_contacts(request):
    try:
        query = ContactsModel.objects.filter(user=request.user)  # type:ignore
    except ContactsModel.DoesNotExist:  # type:ignore
        query = {}
    data = [serialize(item) for item in query]
    return JsonResponse({"contacts": data})


def serialize(item):
    contact_id = item.id
    firstname = item.firstname
    lastname = item.lastname
    telephone = item.telephone
    email = item.email
    social = item.social
    color = item.color
    item_dict = {
        'id': contact_id, 'firstname': firstname, 'lastname': lastname, 'telephone': telephone,
        'email': email, 'social': social, 'color': color,
    }
    return item_dict


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_contact(request):
    try:
        file = json.loads(request.body)
        firstname = file['firstname']
        lastname = file['lastname']
        telephone = file['telephone']
        email = file['email']
        social = file['social']
        color = file['color']
        user = request.user
        note = ContactsModel(user=user, firstname=firstname, lastname=lastname, telephone=telephone, email=email,
                             social=social, color=color)
        note.save()
        return JsonResponse({"text": "Contato criado", "status": "200"})
    except KeyError:
        return JsonResponse({"text": "Formulario incorreto", "status": "406"})


def delete_contact(request, contact_id):
    try:
        query = ContactsModel.objects.get(pk=contact_id)  # type:ignore
        query.delete()
        return JsonResponse({"text": "Contato deletado", "status": "200"})
    except ContactsModel.DoesNotExist:  # type:ignore
        return JsonResponse({"text": "Contato não encontrado", "status": "404"})
