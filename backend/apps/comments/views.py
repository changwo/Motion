from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.comments.models import Comment
from apps.comments.serializers import CommentSerializer
from apps.posts.models import Post
from apps.posts.serializers import PostSerializer
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

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user.userprofile, post=Post.objects.get(id=self.kwargs['post_id']))

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(userProfile=self.request.user.userprofile, post=Post.objects.get(id=self.kwargs['post_id']))
        updated_post = Post.objects.get(id=self.kwargs['post_id'])
        self.serializer_class = PostSerializer
        return Response(self.get_serializer(updated_post).data, status=status.HTTP_201_CREATED)
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     target_post = self.get_object()
    #     target_post.comments.add(serializer)
    #     updated_post = Post.objects.get(id=self.kwargs['post_id'])
    #     return Response(self.get_serializer(updated_post).data)
