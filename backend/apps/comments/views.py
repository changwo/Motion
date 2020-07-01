from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.comments.models import Comment
from apps.comments.serializers import CommentSerializer
from apps.posts.models import Post
from apps.posts.serializers import CreatePostSerializer
from apps.users.permissions import ReadOnly


class ListAllCommentsView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = CommentSerializer

    def list(self, request, *args, **kwargs):
        queryset = Comment.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateOrGetPostCommentsView(ListCreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'post_id'
    queryset = Post

    def list(self, request, *args, **kwargs):
        post = self.get_object()
        queryset = post.comments.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = self.get_object()
        serializer.save(userProfile=self.request.user.userprofile, post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
