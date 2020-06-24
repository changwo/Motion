from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.shortcuts import render

# Create your views here.

from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.friendrequests.models import FriendRequest
from apps.friendrequests.permissions import CannotFriendRequestSelf, IsReceiverOrRequesterOrAdmin
from apps.friendrequests.serializers import FriendRequestSerializer
from apps.users.permissions import ReadOnly
from apps.users.serializers import UserSerializer

User = get_user_model()


class ListAllFriendRequestsView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = FriendRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = FriendRequest.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateFriendRequestView(CreateAPIView):
    lookup_url_kwarg = 'user_id'
    queryset = User
    serializer_class = FriendRequestSerializer
    permission_classes = [CannotFriendRequestSelf]

    def create(self, request, *args, **kwargs):
        receiver = self.get_object()
        requester = self.request.user
        request_instance = FriendRequest(requester=requester, receiver=receiver)
        try:
            request_instance.save()
            return Response(self.get_serializer(instance=request_instance).data)
        except IntegrityError:
            return Response({"detail": "This friend request already exists"}, status=400)


class AcceptOrRejectFriendRequestView(RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'friend_request_id'
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest
    permission_classes = [IsReceiverOrRequesterOrAdmin]


class ListAllUserFriends(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        total_friends = []
        for request_entry in list(request.user.received.all()) + list(request.user.requested.all()):
            if request_entry.requester != request.user and request_entry.status == 'A':
                total_friends.append(request_entry.requester)
            if request_entry.receiver != request.user and request_entry.status == 'A':
                total_friends.append(request_entry.receiver)
        serializer = self.get_serializer(total_friends, many=True)
        return Response(serializer.data)
