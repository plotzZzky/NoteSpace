from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
import json

from .models import SitesModel


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_all_sites(request):
    try:
        query = SitesModel.objects.filter(user=request.user)  # type:ignore
    except SitesModel.DoesNotExist:  # type:ignore
        query = {}
    data = [serialize(item) for item in query]
    return JsonResponse({"sites": data})


def serialize(item):
    site_id = item.id
    title = item.title
    url = item.url
    color = item.color
    item_dict = {'id': site_id, 'title': title, 'url': url, 'color': color}
    return item_dict


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_site(request):
    try:
        file = json.loads(request.body)
        title = file['title'].title()
        url = file['url']
        color = file['color']
        user = request.user
        note = SitesModel(user=user, title=title, url=url, color=color)
        note.save()
        return JsonResponse({"text": "Site criado", "status": "200"})
    except KeyError:
        return JsonResponse({"text": "Formulario incorreto", "status": "406"})


def delete_site(request, site_id):
    try:
        query = SitesModel.objects.get(pk=site_id)  # type:ignore
        query.delete()
        return JsonResponse({"text": "Site deletado", "status": "200"})
    except SitesModel.DoesNotExist:  # type:ignore
        return JsonResponse({"text": "Site não encontrado", "status": "404"})
