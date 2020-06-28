from django.contrib import admin

# Register your models here.
from apps.authentication.models import RegistrationProfile

admin.site.register(RegistrationProfile)