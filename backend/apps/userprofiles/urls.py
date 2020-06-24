from django.urls import path

from apps.userprofiles.views import ListUserProfilesView

urlpatterns = [
    path('', ListUserProfilesView.as_view()),
]