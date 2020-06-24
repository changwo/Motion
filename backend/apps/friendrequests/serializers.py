from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.friendrequests.models import FriendRequest
from apps.users.serializers import UserSerializer

User = get_user_model()


class FriendRequestSerializer(serializers.ModelSerializer):
    receiver = UserSerializer()
    requester = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = ['id', 'requester', 'receiver', 'status', 'created']
