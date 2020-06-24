from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.userprofiles.models import UserProfile
from apps.userprofiles.serializers import UserProfileSerializer
from apps.users.permissions import ReadOnly


class ListUserProfilesView(ListAPIView):
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = UserProfileSerializer

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
