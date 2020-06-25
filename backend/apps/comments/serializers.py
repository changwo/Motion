from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.comments.models import Comment
# from apps.userprofiles.serializers import UserProfileSerializer


class CommentSerializer(serializers.ModelSerializer):
    # user = UserProfileSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'post', 'user', 'created']
