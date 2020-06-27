from rest_framework.permissions import BasePermission, SAFE_METHODS


class CannotFollowSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user != request.user


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class OnlyForStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff
