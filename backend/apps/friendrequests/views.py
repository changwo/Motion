from django.contrib.auth import get_user_model
from django.core.mail import send_mail, EmailMessage
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
    """

    -----------------------------------------------------------------------------------------------------------------
    Create a friend request by placing the user_id of the target user you wish to send a friend request to in the URL
    The request body can be empty.
    -----------------------------------------------------------------------------------------------------------------

    """
    lookup_url_kwarg = 'user_id'
    queryset = User
    serializer_class = FriendRequestSerializer
    permission_classes = [CannotFriendRequestSelf]

    def create(self, request, *args, **kwargs):
        receiver = self.get_object()
        requester = self.request.user
        request_instance = FriendRequest(requester=requester, receiver=receiver)
        send_mail(
            f'Someone sent you a friend request!',
            'Hey {receiver},\n{requester} sent you a friend request, login and accept or reject their friend request!'.format(
                receiver=receiver.first_name if len(receiver.first_name) else receiver.username,
                requester=requester.first_name if len(requester.first_name) else requester.username),
            'students@propulsionacademy.com',
            [receiver.email],
            fail_silently=False,
        )
        try:
            request_instance.save()
            return Response(self.get_serializer(instance=request_instance).data)
        except IntegrityError:
            return Response({"detail": "This friend request already exists"}, status=400)


class AcceptOrRejectFriendRequestView(RetrieveUpdateDestroyAPIView):
    """
    -----------------------------------------------------------------------------------------------------------------
    Method Patch:
    Create a friend request by placing the user_id of the target user you wish to send a friend request to in the URL
    The request body can be empty.
    -----------------------------------------------------------------------------------------------------------------

    """
    lookup_url_kwarg = 'requester_id'
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest
    # permission_classes = [IsReceiverOrRequesterOrAdmin]
    http_method_names = ['get', 'patch', 'delete']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        users_received_requests = request.user.received.all()
        target_request = []
        for request_instance in users_received_requests:
            if request_instance.requester.id == kwargs['requester_id']:
                target_request.append(request_instance)
        serializer = self.get_serializer(target_request[0], data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if target_request[0].status == 'A':
            email = EmailMessage()
            email.subject = f'{target_request[0].receiver.first_name} accepted your friend request!'
            email.body = f'Hey {target_request[0].requester.first_name},\n{target_request[0].receiver.first_name} {target_request[0].receiver.last_name} accepted you friend request, login and say hi!  '
            email.to = [target_request[0].requester.email]
            email.send(fail_silently=False)
        return Response(serializer.data)


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
