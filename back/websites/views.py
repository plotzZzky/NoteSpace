from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from .models import WebsiteModel
from .serializer import WebSiteSerializer


class WebsiteView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = WebsiteModel.objects.all()
    serializer_class = WebSiteSerializer
    http_method_names = ['get', 'post', 'delete']

    def list(self, request, *args, **kwargs):
        query = WebsiteModel.objects.filter(user=request.user)
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            title = request.data.get('title', 'Novo site').title()
            url = request.data['url']
            color = request.data.get('color', '#FFFFFF')
            user = request.user
            WebsiteModel.objects.create(user=user, title=title, url=url, color=color)
            return Response({"text": "Site criado"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError):
            return Response({"text": "Formulario incorreto"}, status=status.HTTP_400_BAD_REQUEST)
