from django.urls import path

from apps.friendrequests.views import ListAllFriendRequestsView, CreateFriendRequestView, \
    AcceptOrRejectFriendRequestView, ListAllUserFriends

urlpatterns = [
    path('friends/', ListAllUserFriends.as_view()),
    path('friends/requests/', ListAllFriendRequestsView.as_view()),
    path('friends/request/<int:user_id>/', CreateFriendRequestView.as_view()),
    path('friends/requests/<int:requester_id>/', AcceptOrRejectFriendRequestView.as_view()),
]