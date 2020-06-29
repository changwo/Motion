from rest_framework import serializers

from apps.postimages.models import PostImage


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['post', 'image', 'created']
