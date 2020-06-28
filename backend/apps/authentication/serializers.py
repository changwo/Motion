from rest_framework import serializers

from apps.authentication.models import RegistrationProfile
from apps.users.serializers import UserSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    class Meta:
        model = RegistrationProfile
        fields = ['user', 'email']


# class CheckValidationCodeSerializer(serializers.ModelSerializer):
#     user = UserSerializer(required=False, read_only=True)
#
#     class Meta:
#         model = RegistrationProfile
#         fields = ['code']