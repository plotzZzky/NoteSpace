from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import SitesModel


class SitesTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.data = {
            "title": "title",
            "url": "url",
            "color": "color"
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_sites_status(self):
        response = self.client.get("/sites/")
        self.assertEqual(response.status_code, 200)

    def test_get_sites(self):
        response = self.client.get("/sites/")
        self.assertEqual(response.json(), {'sites': []})

    def test_create_site_status(self):
        response = self.client.post("/sites/new/", self.data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_site(self):
        self.client.post("/sites/new/", self.data, format='json')
        site = SitesModel.objects.get(title="Title")  # type:ignore
        self.assertEqual(site.title, "Title")

    def test_delete_note_status(self):
        site = SitesModel(
                    title=self.data["title"],
                    url=self.data["url"],
                    color=self.data["color"],
                    user=self.user
                    )
        site.save()
        response = self.client.get(f"/sites/delete/id={site.id}/")  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_delete_note(self):
        site = SitesModel(
                    title=self.data["title"],
                    url=self.data["url"],
                    color=self.data["color"],
                    user=self.user
                    )
        site.save()
        self.client.get(f"/sites/delete/id={site.id}/")  # type:ignore
        try:
            response = SitesModel.objects.get(pk=site.id)  # type:ignore
        except SitesModel.DoesNotExist:  # type:ignore
            response = False
        self.assertEqual(response, False)
