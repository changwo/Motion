from django.contrib.auth import get_user_model
from django.shortcuts import render

# Create your views here.
from rest_framework import status

from rest_framework.generics import CreateAPIView, UpdateAPIView

from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage
from apps.authentication.models import RegistrationProfile, code_generator
from apps.authentication.permissions import AllowCreateRegistrationProfile
from apps.authentication.serializers import RegistrationSerializer

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
        target_profile = RegistrationProfile.objects.get(email=request.data['email'])
        send_mail(
            'Thanks for registering',
            f'See your account creation code: {target_profile.code}',
            'students@propulsionacademy.com',
            [request.data['email']],
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateUserView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_profile = RegistrationProfile.objects.get(email=request.data['email'])
        User = get_user_model()
        user = User.objects.create_user(request.data['username'], request.data['email'],
                                        request.data['password'],
                                        first_name=request.data['first_name'],
                                        last_name=request.data['last_name'])
        self.perform_create(user)
        target_profile.user = user
        target_profile.save()
        return Response(status=status.HTTP_201_CREATED)


# create_user(username, email=None, password=None, **extra_fields)

class CreateValidationCodeForPasswordReset(CreateAPIView):
    permission_classes = []
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_profile = RegistrationProfile.objects.get(email=request.data['email'])
            target_profile.code = code_generator()
            target_profile.save()
            email = EmailMessage()
            email.subject = 'Your password Reset code'
            email.body = f'See your password reset code:{target_profile.code}'
            email.to = [target_profile.email]
            email.send(fail_silently=False)
            return Response(status=status.HTTP_201_CREATED)
        except RegistrationProfile.DoesNotExist:
            return Response({"detail": "Your email isn't valid."}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(UpdateAPIView):
    permission_classes = []
    serializer_class = ResetPasswordSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        target_profile = RegistrationProfile.objects.get(email=request.data['email'])
        target_profile.user.set_password(request.data['password'])
        target_profile.user.save()
        target_profile.code = code_generator()
        target_profile.save()
        return Response(status=status.HTTP_202_ACCEPTED)

