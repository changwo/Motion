from django.contrib.auth import get_user_model
from django.db.models import Q
from django.forms import modelformset_factory
from django.shortcuts import render

# Create your views here.
from rest_framework import status, generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.posts.models import Post
from apps.posts.permissions import IsPosterOrAdminOrReadOnly
from apps.posts.serializers import PostSerializer, SharedSerializer
from apps.users.permissions import ReadOnly

User = get_user_model()


class ListCreatePostsView(ListCreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        queryset = Post.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            shared_post = Post.objects.get(id=self.request.data.get("shared"))
            serializer.save(user=self.request.user, shared=shared_post, images=self.request.data.get('images'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListSpecificUserPostsView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user_obj = User.objects.get(id=user_id)
        return user_obj.posts.all().order_by('-created')


class ListPostsUserLikesView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        queryset = request.user.liked_posts.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListFollowingPostsView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        total_posts = []
        for user_entry in request.user.following.all():
            total_posts.extend(list(user_entry.user.posts.all()))
        total_posts.sort(key=lambda t: t.created, reverse=True)
        serializer = self.get_serializer(total_posts, many=True)
        return Response(serializer.data)


class RetrieveUpdateDestroyPostView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsPosterOrAdminOrReadOnly]
    queryset = Post
    lookup_url_kwarg = 'post_id'
    serializer_class = PostSerializer


class RetrieveMyPosts(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        queryset = request.user.posts.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Likes the post by ID provided in the url, if already liked, the post gets unliked
class ToggleLikePostVew(CreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Post
    serializer_class = PostSerializer
    lookup_url_kwarg = 'post_id'

    def post(self, request, *args, **kwargs):
        receiver = self.get_object()  # We found the post with 'post_id'
        requester = self.request.user
        like_relation = requester in receiver.likes.all()
        if like_relation:
            receiver.likes.remove(requester)
        else:
            receiver.likes.add(requester)
        return Response(self.get_serializer(receiver).data)


class ListAllUserFriendsPosts(ListAPIView):
    www_authenticate_realm = 'posts'
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        total_posts = []
        for request_entry in list(request.user.received.all()) + list(request.user.requested.all()):
            if request_entry.requester != request.user and request_entry.status == 'A':
                total_posts.extend(list(request_entry.requester.posts.all()))
            if request_entry.receiver != request.user and request_entry.status == 'A':
                total_posts.extend(list(request_entry.receiver.posts.all()))
        total_posts.sort(key=lambda t: t.created, reverse=True)
        serializer = self.get_serializer(total_posts, many=True)
        return Response(serializer.data)


class SearchPostsByContentAndUser(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        keyword = self.kwargs['search_string']
        return Post.objects.filter(
            Q(content__icontains=keyword) | Q(user__first_name__icontains=keyword) | Q(
                user__last_name__icontains=keyword) | Q(user__username__icontains=keyword)).order_by('-created')
