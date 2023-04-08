from django.db import models

from django.contrib.auth.models import User


class NotesModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.CharField(max_length=2048)
    date = models.DateField()
    color = models.CharField(max_length=128)
