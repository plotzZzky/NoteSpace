from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
import json
import datetime

from .models import NotesModel


class NotesTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.new_note = {
            "title": "Teste",
            "text": "Teste de nota!",
            "color": "#111"
        }

    def create_new_note(self):
        note = NotesModel.objects.create(   # type:ignore
            title=self.new_note['title'],
            text=self.new_note['text'],
            color=self.new_note['color'],
            user=self.user,
            date=datetime.date.today()
        )
        return note

    # Get all notes
    def test_get_all_notes_status(self):
        response = self.client.get('/notes/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_notes_status_no_login_error(self):
        self.client.credentials()
        response = self.client.get('/notes/')
        self.assertEqual(response.status_code, 401)

    def test_get_all_notes_check_json(self):
        response = self.client.get('/notes/')
        result = json.loads(response.content)
        r = True if "notes" in result else False
        self.assertTrue(r)

    # Create note
    def test_create_note(self):
        response = self.client.post('/notes/new/', self.new_note)
        self.assertEqual(response.status_code, 200)
        note = NotesModel.objects.get(title=self.new_note['title'])  # type:ignore
        self.assertIsNotNone(note)

    def test_create_note_no_title(self):
        data = self.new_note
        del data['title']
        response = self.client.post('/notes/new/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_note_no_text_error(self):
        data = self.new_note
        del data['text']
        response = self.client.post('/notes/new/', data)
        self.assertEqual(response.status_code, 400)

    def test_create_note_no_color(self):
        data = self.new_note
        del data['color']
        response = self.client.post('/notes/new/', data)
        self.assertEqual(response.status_code, 200)

    def test_delete_note(self):
        note = self.create_new_note()
        data = {'id': note.id}
        response = self.client.delete('/notes/del/', data)
        self.assertEqual(response.status_code, 200)
        try:
            result = NotesModel.objects.get(pk=note.id)  # type:ignore
        except NotesModel.DoesNotExist:  # type:ignore
            result = None
        self.assertIsNone(result)

    def test_delete_note_not_id_error(self):
        data = {}
        response = self.client.delete('/notes/del/', data)
        self.assertEqual(response.status_code, 400)

    def test_delete_note_id_error(self):
        data = {'id': 99999}
        response = self.client.delete('/notes/del/', data)
        self.assertEqual(response.status_code, 400)

