from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import ContactsModel


class ContactsTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': 'temporary'
        }
        self.data = {
            "firstname": "firstname",
            "lastname": "lastname",
            "telephone": "telephone",
            "email": "email@email.com",
            "social": "@social",
            "color": "color",
        }
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_contacts_status(self):
        response = self.client.get("/contacts/")
        self.assertEqual(response.status_code, 200)

    def test_get_contacts(self):
        response = self.client.get("/contacts/")
        self.assertEqual(response.json(), {'contacts': []})

    def test_create_contact_status(self):
        response = self.client.post("/contacts/new/", self.data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_create_contact(self):
        self.client.post("/contacts/new/", self.data, format='json')
        contact = ContactsModel.objects.get(firstname="firstname")  # type:ignore
        self.assertEqual(contact.firstname, "firstname")

    def test_delete_note_status(self):
        contact = ContactsModel(
                    firstname=self.data["firstname"],
                    lastname=self.data["lastname"],
                    telephone=self.data["telephone"],
                    email=self.data["email"],
                    social=self.data["social"],
                    user=self.user
                    )
        contact.save()
        response = self.client.get(f"/contacts/delete/id={contact.id}/")  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_delete_note(self):
        contact = ContactsModel(
                    firstname=self.data["firstname"],
                    lastname=self.data["lastname"],
                    telephone=self.data["telephone"],
                    email=self.data["email"],
                    social=self.data["social"],
                    user=self.user
                    )
        contact.save()
        self.client.get(f"/contacts/delete/id={contact.id}/")  # type:ignore
        try:
            response = ContactsModel.objects.get(pk=contact.id)  # type:ignore
        except ContactsModel.DoesNotExist:  # type:ignore
            response = False
        self.assertEqual(response, False)
