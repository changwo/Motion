from rest_framework import serializers

from apps.authentication.models import RegistrationProfile


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = RegistrationProfile
        fields = ['email']
