from django.http.response import JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from .models import ContactsModel
from .serialize import serialize_contact


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_contacts(request):
    try:
        query = ContactsModel.objects.filter(user=request.user)
    except ObjectDoesNotExist:
        query = {}
    data = [serialize_contact(item) for item in query]
    return JsonResponse({"contacts": data}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_contact(request):
    try:
        firstname = request.data['firstname']
        lastname = request.data.get('lastname', '')
        telephone = request.data.get('telephone', '')
        email = request.data['email']
        social = request.data.get('social', '')
        color = request.data.get('color', '#FFFFFF')
        user = request.user
        note = ContactsModel(user=user, firstname=firstname, lastname=lastname, telephone=telephone, email=email,
                             social=social, color=color)
        note.save()
        return JsonResponse({"text": "Contato criado"}, status=200)
    except (KeyError, ValueError):
        return JsonResponse({"text": "Formulario incorreto"}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_contact(request):
    try:
        contact_id = request.data['id']
        query = ContactsModel.objects.get(pk=contact_id)
        query.delete()
        return JsonResponse({"text": "Contato deletado"}, status=200)
    except (ObjectDoesNotExist, ValueError, KeyError):
        return JsonResponse({"text": "Contato não encontrado"}, status=400)
