from django.contrib.auth import get_user_model
from rest_framework import serializers

# from apps.likes.serializers import LikeSerializer
from apps.posts.models import Post
from apps.users.serializers import UserSerializer

User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # people_who_liked = LikeSerializer(many=True)
    amount_of_likes = serializers.SerializerMethodField()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    class Meta:
        model = Post
        fields = ['amount_of_likes', 'id', 'content', 'created', 'user']


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content']
