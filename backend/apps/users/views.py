from django.contrib.auth import get_user_model

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.userprofiles.models import UserProfile
from apps.users.permissions import CannotFollowSelf, ReadOnly

from apps.users.serializers import UserSerializer

User = get_user_model()


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
        updated_user = User.objects.get(id=self.kwargs['user_id'])
        return Response(self.get_serializer(updated_user).data)


class ListUsersView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = User.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


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
