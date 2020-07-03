from rest_framework.permissions import BasePermission


class IsCommenterOrAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.userProfile.user == request.user or request.user.is_staff
