from django.urls import path

from apps.comments.views import ListAllCommentsView, CreateOrGetPostCommentsView, RetrieveUpdateDestroyCommentView

urlpatterns = [
    path('', ListAllCommentsView.as_view()),
    path('<int:post_id>/', CreateOrGetPostCommentsView.as_view()),
    path('comment/<int:comment_id>/', RetrieveUpdateDestroyCommentView.as_view()),
]