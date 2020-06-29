from django.contrib.auth import get_user_model

# Create your views here.
from django.core.mail import send_mail
from django.db.models import Q
from rest_framework import generics
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, \
    RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.userprofiles.models import UserProfile
from apps.users.permissions import CannotFollowSelf, ReadOnly

from apps.users.serializers import UserSerializer

User = get_user_model()


class GetAndUpdateLoggedInUserProfile(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def get_object(self):
        return self.request.user


class ToggleFollowUserView(CreateAPIView):
    permission_classes = [CannotFollowSelf]
    queryset = UserProfile
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'

    def post(self, request, *args, **kwargs):
        receiver = self.get_object()
        requester = self.request.user
        follow_relation = requester in receiver.followers.all()
        if follow_relation:
            receiver.followers.remove(requester)
        else:
            receiver.followers.add(requester)
            send_mail(
                f'You got a new follower!',
                'Hey {receiver},\n{requester} started following you, login and check out his/her profile!'.format(
                    receiver=receiver.user.first_name if len(receiver.user.first_name) else receiver.user.username,
                    requester=requester.first_name if len(requester.first_name) else requester.username),
                'students@propulsionacademy.com',
                [receiver.user.email],
                fail_silently=False,
            )
        updated_user = User.objects.get(id=self.kwargs['user_id'])
        return Response(self.get_serializer(updated_user).data)


# Lists all Users in database
class ListUsersView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = User.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListSpecificUserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'
    queryset = User


# List the profiles of the people Logged in User is following
class ListFollowingView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        total_profiles = []
        for user_entry in request.user.following.all():
            total_profiles.append(user_entry.user)
        serializer = self.get_serializer(total_profiles, many=True)
        return Response(serializer.data)


# List the profiles of the people who follow logged-in user
class ListFollowersView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.get(user=request.user.id)
        serializer = self.get_serializer(queryset.followers, many=True)
        return Response(serializer.data)


class SearchUsersByFirstLastUsername(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        keyword = self.kwargs['search_string']
        return User.objects.filter(Q(first_name__icontains=keyword) | Q(
            last_name__icontains=keyword) | Q(username__icontains=keyword))
