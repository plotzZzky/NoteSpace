from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
import datetime

from .models import NotesModel


class NotesTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.data = {
            "title": "new_note",
            "text": "new_text",
            "color": "new_color",
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_notes_status(self):
        response = self.client.get("/notes/")
        self.assertEqual(response.status_code, 200)

    def test_get_notes(self):
        response = self.client.get("/notes/")
        self.assertEqual(response.json(), {'notes': []})

    def test_create_note_status(self):
        response = self.client.post("/notes/new/", self.data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_note(self):
        self.client.post("/notes/new/", self.data, format='json')
        note = NotesModel.objects.get(title="New_Note")  # type:ignore
        self.assertEqual(note.title, "New_Note")

    def test_delete_note_status(self):
        note = NotesModel(
                    title=self.data['title'],
                    text=self.data['text'],
                    color=self.data['color'],
                    date=datetime.date.today(),
                    user=self.user
                    )
        note.save()
        response = self.client.get(f"/notes/delete/id={note.id}/")  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_delete_note(self):
        note = NotesModel(
                    title=self.data['title'],
                    text=self.data['text'],
                    color=self.data['color'],
                    date=datetime.date.today(),
                    user=self.user
                    )
        note.save()
        self.client.get(f"/notes/delete/id={note.id}/")  # type:ignore
        try:
            response = NotesModel.objects.get(pk=note.id)  # type:ignore
        except NotesModel.DoesNotExist:  # type:ignore
            response = False
        self.assertEqual(response, False)
