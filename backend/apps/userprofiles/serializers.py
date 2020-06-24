from rest_framework import serializers

from apps.userprofiles.models import UserProfile
#from apps.users.serializers import UserSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = []


class CreateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['followers']
