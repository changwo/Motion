from django.urls import path
from rest_framework import serializers

from apps.posts.views import ListCreatePostsView, RetrieveUpdateDestroyPostView, ListSpecificUserPostsView, \
    ListPostsUserLikesView, ToggleLikePostVew, ListAllUserFriendsPosts

urlpatterns = [
    path('', ListCreatePostsView.as_view()),
    path('<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('user/<int:user_id>/', ListSpecificUserPostsView.as_view()),
    path('toggle-like/<int:post_id>/', ToggleLikePostVew.as_view()),
    path('likes/', ListPostsUserLikesView.as_view()),
    path('friends/', ListAllUserFriendsPosts.as_view()),
]
