from django.urls import path
from rest_framework import serializers

from apps.posts.views import ListCreatePostsView, RetrieveUpdateDestroyPostView, ListSpecificUserPostsView, \
    ListPostsUserLikesView, ToggleLikePostVew, ListAllUserFriendsPosts, SearchPostsByContentAndUser, \
    GetLoggedInUserPosts

urlpatterns = [
    path('', ListCreatePostsView.as_view()),
    path('me/', GetLoggedInUserPosts.as_view()),
    path('<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('user/<int:user_id>/', ListSpecificUserPostsView.as_view()),
    path('toggle-like/<int:post_id>/', ToggleLikePostVew.as_view()),
    path('likes/', ListPostsUserLikesView.as_view()),
    path('friends/', ListAllUserFriendsPosts.as_view()),
    path('search=<str:search_string>/', SearchPostsByContentAndUser.as_view()),
]
