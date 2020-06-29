from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from django.db.models import Q

# Create your views here.
from rest_framework import status, generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.authentication.models import get_or_none
from apps.posts.models import Post
from apps.posts.permissions import IsPosterOrAdminOrReadOnly
from apps.posts.serializers import PostSerializer
from apps.users.permissions import ReadOnly

User = get_user_model()


class ListCreatePostsView(ListCreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer

    def get_all_friends_emails(self, obj):
        total_friends_emails = []
        for request_entry in list(obj.received.all()) + list(obj.requested.all()):
            if request_entry.requester != obj and request_entry.status == 'A':
                total_friends_emails.append(request_entry.requester.email)
            if request_entry.receiver != obj and request_entry.status == 'A':
                total_friends_emails.append(request_entry.receiver.email)
        return total_friends_emails

    def list(self, request, *args, **kwargs):
        queryset = Post.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        friends_emails_list = self.get_all_friends_emails(request.user)
        email = EmailMessage()
        email.subject = 'A Friend made a new Post!'
        email.body = '{requester} just made a new post, be the first to like comment or share!'.format(
            requester=request.user.first_name if len(request.user.first_name) else request.user.username)
        email.to = friends_emails_list
        shared_post = get_or_none(Post, id=self.request.data.get("shared"))
        serializer.save(user=self.request.user, shared=shared_post)
        email.send(fail_silently=False)
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
