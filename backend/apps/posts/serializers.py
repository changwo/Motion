from django.contrib.auth import get_user_model
from django.http import HttpResponseBadRequest
from rest_framework import serializers

from apps.authentication.models import get_or_none
from apps.postimages.models import PostImage
from apps.postimages.serializers import PostImageSerializer
from apps.posts.models import Post
from apps.users.serializers import UserSerializer

User = get_user_model()


class SharedSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)
    amount_of_likes = serializers.SerializerMethodField()
    amount_of_comments = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_images(self, post):
        request = self.context.get('request')
        old_post_images = PostImage.objects.filter(post=post)
        images = PostImageSerializer(data=old_post_images, many=True)
        images.is_valid()
        return [request.build_absolute_uri(image['image']) for image in images.data]


    def get_amount_of_likes(self, obj):
        return obj.likes.count()

    def get_amount_of_comments(self, obj):
        return obj.comments.count()

    class Meta:
        model = Post
        exclude = []
    def get_fields(self):
        fields = super(SharedSerializer, self).get_fields()
        fields['shared'] = SharedSerializer()
        return fields

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)
    shared = SharedSerializer(required=False, read_only=True)
    amount_of_likes = serializers.SerializerMethodField()
    amount_of_comments = serializers.SerializerMethodField()
    amount_of_shares = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_amount_of_shares(self, obj):
        return obj.shared_by.all().count()

    def get_amount_of_likes(self, obj):
        return len(obj.likes.all())

    def get_amount_of_comments(self, obj):
        return obj.comments.count()

    def get_images(self, post):
        """
        Function handling the upload of multiple images to a post.
        Creating new PostImages if images are passed in request, else just returning the old image list.
        """

        # Get image list from request
        request_images = self.context['request'].data.getlist('images')
        # Get the request object
        request = self.context.get('request')
        # If no images in request, do nothing and return old image list
        old_post_images = PostImage.objects.filter(post=post)
        # PostImage.objects.get(post=post)

        if not request_images:
            images = PostImageSerializer(data=old_post_images, many=True)
            images.is_valid()
            # request.build_absolute_uri returns the absolute URL of the object
            return [request.build_absolute_uri(image['image']) for image in images.data]

        # If images in request, first delete old images (if there were any)
        if old_post_images:
            for image in old_post_images.all():
                image.delete()

        # Create new PostImages and return url list
        url_list = []
        for image in request_images:
            img_data = {
                'post': post.pk,
                'image': image
            }
            new_image = PostImageSerializer(data=img_data)
            new_image.is_valid(raise_exception=True)
            new_image.save()
            url_list.append(request.build_absolute_uri(new_image.data['image']))
        return url_list

    class Meta:
        model = Post
        fields = ['amount_of_likes', 'amount_of_shares', 'images', 'id', 'content', 'created', 'user', 'images',
                  'amount_of_comments',
                  'shared']
