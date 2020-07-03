from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.comments.models import Comment

# from apps.userprofiles.serializers import UserProfileSerializer
from apps.users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='userProfile.user', required=False, read_only=True)
    is_from_logged_in_user = serializers.SerializerMethodField()

    def get_is_from_logged_in_user(self, comment):
        return self.context.get('request').user == comment.userProfile.user

    class Meta:
        model = Comment
        fields = ['id', 'content', 'post', 'created', 'user', 'is_from_logged_in_user']
