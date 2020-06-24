from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.





class UserProfile(models.Model):
    User = get_user_model()
    def __str__(self):
        return f'User ID: {self.user.id}'

    user = models.OneToOneField(on_delete=models.CASCADE, to=User, primary_key=True,
                                related_name='userprofile')
    followers = models.ManyToManyField(to=User, blank=True, related_name='following')



