from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import WebsiteModel


class WebsiteTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.new_site = {
            "title": "Teste",
            "url": "www.example.com",
            "color": "#111"
        }

    def create_new_site(self):
        site = WebsiteModel.objects.create(  # type:ignore
            title=self.new_site['title'],
            url=self.new_site['url'],
            color=self.new_site['color'],
            user=self.user
        )
        return site

    # Get all notes
    def test_get_all_sites_status(self):
        response = self.client.get('/sites/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_sites_status_no_login_error(self):
        self.client.credentials()
        response = self.client.get('/sites/')
        self.assertEqual(response.status_code, 401)

    def test_get_all_sites_check_json(self):
        response = self.client.get('/sites/')
        self.assertEqual(response['Content-Type'], 'application/json')

    # Create note
    def test_create_site(self):
        response = self.client.post('/sites/', self.new_site)
        self.assertEqual(response.status_code, 200)
        note = WebsiteModel.objects.get(title=self.new_site['title'])
        self.assertIsNotNone(note)

    def test_create_site_no_title(self):
        data = self.new_site
        del data['title']
        response = self.client.post('/sites/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_site_no_text_error(self):
        data = self.new_site
        del data['url']
        response = self.client.post('/sites/', data)
        self.assertEqual(response.status_code, 400)

    def test_create_site_no_color(self):
        data = self.new_site
        del data['color']
        response = self.client.post('/sites/', data)
        self.assertEqual(response.status_code, 200)

    def test_delete_site(self):
        site = self.create_new_site()
        response = self.client.delete(f'/sites/{site.id}/')
        self.assertEqual(response.status_code, 204)
        try:
            result = WebsiteModel.objects.get(pk=site.id)
        except WebsiteModel.DoesNotExist:  # type:ignore
            result = None
        self.assertIsNone(result)

    def test_delete_site_id_error(self):
        response = self.client.delete(f'/sites/{9999}/')
        self.assertEqual(response.status_code, 404)
