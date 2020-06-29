from django.db import models

# Create your models here.
from apps.posts.models import Post


class PostImage(models.Model):
    post = models.ForeignKey(to=Post, blank=True, null=True, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)


    def __str__(self):
        return f'Image ID: {self.id}'