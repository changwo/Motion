from django.contrib import admin

# Register your models here.
from apps.postimages.models import PostImage

admin.site.register(PostImage)