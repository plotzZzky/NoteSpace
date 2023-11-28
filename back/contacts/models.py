from django.db import models

from django.contrib.auth.models import User


class ContactsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255, null=True, blank=True)
    telephone = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=512)
    social = models.CharField(max_length=512, null=True, blank=True)
    color = models.CharField(max_length=255)

    objects = models.Manager()
