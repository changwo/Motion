from django.contrib.auth import get_user_model
from django.forms import model_to_dict
from rest_framework import serializers
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.authentication.models import RegistrationProfile
from apps.userprofiles.models import UserProfile
from apps.users.serializers import UserSerializer

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationProfile
        fields = ['email']


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attr):
#         print(attr)
#         data = super().validate(attr)
#         token = self.get_token(self.user)
#         user = model_to_dict(self.user)
#         del user['password']
#         del user['last_login']
#         del user['is_superuser']
#         del user['is_staff']
#         del user['is_active']
#         del user['date_joined']
#         del user['user_permissions']
#         del user['groups']
#         data['user'] = str(user)
#
#         return data

class MyTokenObtainPairSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
    def validate(self, attr):
        data = super().validate(attr)
        data['user_id'] = str(self.user.id)

        return data
