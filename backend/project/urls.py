"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import views as jwt_views

# /backend/api/social/posts/
from apps.users.permissions import ReadOnly

urlpatterns = [
    path('admin/', admin.site.urls),
    # Posts Urls...
    path('backend/api/social/posts/', include('apps.posts.urls')),
    # Comments Urls...
    path('backend/api/social/comments/', include('apps.comments.urls')),
    # Users Url...
    path('backend/api/', include('apps.users.urls')),
    # UserProfiles Url...
    path('backend/api/userprofiles/', include('apps.userprofiles.urls')),
    # FriendRequests Urls..
    path('backend/api/social/', include('apps.friendrequests.urls')),
    # Auth Urls...
    path('backend/api/auth/', include('apps.authentication.urls')),
    # API Docs Urls ...
    path('api/docs/', include_docs_urls(title='Motion API', public=True, permission_classes=[])),
]
# Images Urls..
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)