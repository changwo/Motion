from django.db import models

# Create your models here.
from apps.posts.models import Post
from apps.userprofiles.models import UserProfile


class Comment(models.Model):
    def __str__(self):
        return f'Comment ID: {self.id}'

    content = models.CharField(max_length=1000)
    post = models.ForeignKey(on_delete=models.SET_NULL, null=True, to=Post, related_name='comments')
    user_profile = models.ForeignKey(on_delete=models.SET_NULL, null=True, to=UserProfile, related_name='comments')
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
