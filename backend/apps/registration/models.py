from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Registration(models.Model):
    code = models.IntegerField(blank=True, null=True)
    used = models.BooleanField(blank=True, null=True)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='registration')

    def __str__(self):
        return f'Registration ID {self.pk}: {self.user.username}'
