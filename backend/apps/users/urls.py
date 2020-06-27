from django.urls import path

from apps.posts.views import ListPostsUserLikesView, ListFollowingPostsView
from apps.users.views import ListUsersView, ToggleFollowUserView, ListFollowingView, ListFollowersView, \
    SearchUsersByFirstLastUsername, ListSpecificUserView, GetAndUpdateLoggedInUserProfile

urlpatterns = [
    path('users/me/', GetAndUpdateLoggedInUserProfile.as_view(), name='Get or Update logged-in user profile'),
    path('users/', ListUsersView.as_view(), name='List All Users'),
    path('users/<int:user_id>/', ListSpecificUserView.as_view(), name='List Specific User'),
    path('users/search=<str:search_string>/', SearchUsersByFirstLastUsername.as_view(),
         name='Search for a specific User by first/last/username'),
    path('social/followers/toggle-follow/<int:user_id>/', ToggleFollowUserView.as_view(),
         name='Follow or Unfollow a User'),
    path('social/posts/likes/', ListPostsUserLikesView.as_view(), name='List Liked Posts'),
    path('social/posts/following/', ListFollowingPostsView.as_view(), name='List Posts From Following'),
    path('social/followers/following/', ListFollowingView.as_view(), name='List All Following'),
    path('social/followers/followers/', ListFollowersView.as_view(), name='List All Followers'),
]
