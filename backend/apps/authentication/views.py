from django.contrib.auth import get_user_model
from django.shortcuts import render

# Create your views here.
from rest_framework import status, request
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from apps.authentication.models import RegistrationProfile, code_generator
from apps.authentication.permissions import AllowCreateRegistrationProfile
from apps.authentication.serializers import RegistrationSerializer
from apps.users.permissions import ReadOnly
from apps.users.serializers import CreateUserSerializer, ResetPasswordSerializer


class CreateValidationCode(CreateAPIView):
    # Send a valid email and receive a validation code
    serializer_class = RegistrationSerializer
    permission_classes = [AllowCreateRegistrationProfile]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # send_mail(
        #     'Password Reset code',
        #     'See your account creation code:',
        #     'students@propulsionacademy.com',
        #     [request.data['email']],
        #     fail_silently=False,
        # )
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateUserView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowCreateRegistrationProfile]

    def validate_even(self):
        if self.request.data['password_repeat'] != self.request.data['password']:
            raise ValidationError("passwords do not match!")
        return self.request.data['password_repeat']

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        try:
            target_profile = RegistrationProfile.objects.get(email=request.data['email'])
            if request.data['code'] == target_profile.code:
                serializer.is_valid(raise_exception=True)
                User = get_user_model()
                user = User.objects.create_user(request.data['username'], request.data['email'],
                                                request.data['password'],
                                                first_name=request.data['first_name'],
                                                last_name=request.data['last_name'])
                # user.is_valid(raise_exception=True)
                self.perform_create(user)
                return Response(status=status.HTTP_201_CREATED)
            else:
                serializer.is_valid(raise_exception=True)
                return Response({"detail": "Your validation code didn't match."}, status=status.HTTP_400_BAD_REQUEST)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email isnt valid."}, status=status.HTTP_400_BAD_REQUEST)


# create_user(username, email=None, password=None, **extra_fields)

class CreateValidationCodeForPasswordReset(CreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        try:
            target_profile = RegistrationProfile.objects.get(email=request.data['email'])
            target_profile.code = code_generator()
            target_profile.save()
            # send_mail(
            #     'Password Reset code',
            #     'See your password reset code:',
            #     'students@propulsionacademy.com',
            #     [target_profile.email],
            #     fail_silently=False,
            # )
            return Response(status=status.HTTP_201_CREATED)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email isnt valid."}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(CreateAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = ResetPasswordSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_profile = RegistrationProfile.objects.get(email=request.data['email'])
            if request.data['code'] == target_profile.code:
                request.user.set_password(request.data['password'])
                request.user.save()
                user_data = self.get_serializer(request.user).data
                return Response(user_data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"detail": "Your validation code didn't match."}, status=status.HTTP_400_BAD_REQUEST)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email isnt valid."}, status=status.HTTP_400_BAD_REQUEST)
