from rest_framework.permissions import BasePermission


class CannotFriendRequestSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj != request.user


class IsReceiverOrRequesterOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.requester == request.user or obj.receiver == request.user or request.user.is_staff
