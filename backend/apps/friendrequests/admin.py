from django.contrib import admin

# Register your models here.
from apps.friendrequests.models import FriendRequest

admin.site.register(FriendRequest)