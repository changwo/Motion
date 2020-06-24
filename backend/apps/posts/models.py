from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

User = get_user_model()


class Post(models.Model):
    def __str__(self):
        return f'Post ID: {self.id}'

    content = models.CharField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    user = models.ForeignKey(on_delete=models.SET_NULL, null=True, to=User, related_name='posts')
    likes = models.ManyToManyField(to=User, blank=True, related_name='liked_posts')