from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.comments.models import Comment


# from apps.userprofiles.serializers import UserProfileSerializer
from apps.users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='userProfile.user', required=False)

    class Meta:
        model = Comment
        fields = ['id','content', 'post', 'created', 'user']
