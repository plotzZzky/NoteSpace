from django.http.response import JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from .models import SitesModel
from .serialize import serialize_website


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_sites(request):
    try:
        query = SitesModel.objects.filter(user=request.user)
    except ObjectDoesNotExist:
        query = {}
    data = [serialize_website(item) for item in query]
    return JsonResponse({"sites": data}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_site(request):
    try:
        title = request.data.get('title', 'Novo site').title()
        url = request.data['url']
        color = request.data.get('color', '#FFFFFF')
        user = request.user
        note = SitesModel(user=user, title=title, url=url, color=color)
        note.save()
        return JsonResponse({"text": "Site criado"}, status=200)
    except (KeyError, ValueError):
        return JsonResponse({"text": "Formulario incorreto"}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_site(request):
    try:
        site_id = request.data['id']
        query = SitesModel.objects.get(pk=site_id)
        query.delete()
        return JsonResponse({"text": "Site deletado"}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({"text": "Site não encontrado"}, status=400)
