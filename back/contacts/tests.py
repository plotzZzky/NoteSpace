from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import ContactModel


class ContactsTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.new_contact = {
            "firstname": "Name",
            "lastname": "Lastname",
            "telephone": "telephone",
            "email": "email",
            "social": "social",
            "color": "color"
        }

    def create_new_contact(self):
        contact = ContactModel.objects.create(
            user=self.user,
            firstname=self.new_contact['firstname'],
            lastname=self.new_contact['lastname'],
            telephone=self.new_contact['telephone'],
            email=self.new_contact['email'],
            social=self.new_contact['social'],
            color=self.new_contact['color'],
        )
        return contact

    # Get all notes
    def test_get_all_contacts_status(self):
        response = self.client.get('/contacts/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_contacts_status_no_login_error(self):
        self.client.credentials()
        response = self.client.get('/contacts/')
        self.assertEqual(response.status_code, 401)

    def test_get_all_contacts_check_json(self):
        response = self.client.get('/contacts/')
        self.assertEqual(response['Content-Type'], 'application/json')

    # Create note
    def test_create_contact(self):
        response = self.client.post('/contacts/', self.new_contact)
        self.assertEqual(response.status_code, 200)
        contact = ContactModel.objects.get(firstname=self.new_contact['firstname'])
        self.assertIsNotNone(contact)

    def test_create_contacts_no_firstname_error(self):
        data = self.new_contact
        del data['firstname']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 400)

    def test_create_contacts_no_lastname(self):
        data = self.new_contact
        del data['lastname']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_contacts_no_telephone(self):
        data = self.new_contact
        del data['telephone']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_contacts_no_email_error(self):
        data = self.new_contact
        del data['email']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 400)

    def test_create_contacts_no_social(self):
        data = self.new_contact
        del data['social']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_contacts_no_color(self):
        data = self.new_contact
        del data['color']
        response = self.client.post('/contacts/', data)
        self.assertEqual(response.status_code, 200)

    def test_delete_contacts(self):
        note = self.create_new_contact()
        response = self.client.delete(f'/contacts/{note.id}/')
        self.assertEqual(response.status_code, 204)
        try:
            result = ContactModel.objects.get(pk=note.id)
        except ContactModel.DoesNotExist:  # type:ignore
            result = None
        self.assertIsNone(result)

    def test_delete_contacts_id_error(self):
        response = self.client.delete(f'/contacts/{9999}/')
        self.assertEqual(response.status_code, 404)
