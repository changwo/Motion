from django.contrib import admin

# Register your models here.
from apps.userprofiles.models import UserProfile

admin.site.register(UserProfile)