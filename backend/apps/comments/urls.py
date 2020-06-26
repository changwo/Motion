from django.urls import path

from apps.comments.views import ListAllCommentsView, CreateOrGetPostCommentsView

urlpatterns = [
    path('', ListAllCommentsView.as_view()),
    path('<int:post_id>/', CreateOrGetPostCommentsView.as_view()),
]