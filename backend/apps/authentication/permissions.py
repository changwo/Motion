from rest_framework.permissions import BasePermission


class AllowCreateRegistrationProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return True
