from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from apps.authentication.views import CreateValidationCode, CreateUserView, CreateValidationCodeForPasswordReset, \
    ResetPasswordView

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    path('registration/', CreateValidationCode.as_view(), name='get_validation_code'),
    path('registration/validation/', CreateUserView.as_view(), name='register_user'),
    path('password-reset/', CreateValidationCodeForPasswordReset.as_view(),
         name='get_validation_code_for_password_reset'),
    path('password-reset/validation/', ResetPasswordView.as_view(), name='reset_password'),
]
