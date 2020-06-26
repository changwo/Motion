from django.contrib.auth import get_user_model
from rest_framework import serializers

# from apps.likes.serializers import LikeSerializer
from rest_framework.fields import SerializerMethodField

from apps.comments.serializers import CommentSerializer
from apps.posts.models import Post
from apps.users.serializers import UserSerializer

User = get_user_model()


class SharedSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)
    comments = CommentSerializer(required=False, read_only=True, many=True)
    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    class Meta:
        model = Post
        exclude = []


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)
    shared = SharedSerializer(required=False, read_only=True)
    amount_of_likes = serializers.SerializerMethodField()
    comments = CommentSerializer(required=False, read_only=True, many=True)

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    class Meta:
        model = Post
        fields = ['amount_of_likes', 'id', 'content', 'created', 'user', 'comments', 'shared']

