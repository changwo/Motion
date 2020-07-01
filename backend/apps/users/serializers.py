from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.authentication.models import RegistrationProfile, get_or_none
from apps.userprofiles.models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    amount_of_posts = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    amount_following = serializers.SerializerMethodField()
    amount_of_friends = serializers.SerializerMethodField()
    amount_of_followers = serializers.SerializerMethodField()
    logged_in_user_sent_fr = serializers.SerializerMethodField()
    logged_in_user_is_friends = serializers.SerializerMethodField()
    logged_in_user_is_rejected = serializers.SerializerMethodField()
    logged_in_user_received_fr = serializers.SerializerMethodField()
    logged_in_user_is_following = serializers.SerializerMethodField()

    def get_amount_of_posts(self, obj):
        return len(obj.posts.all())

    def get_amount_of_likes(self, obj):
        return len(obj.liked_posts.all())

    def get_amount_following(self, obj):
        return len(obj.following.all())

    def get_amount_of_followers(self, obj):
        return UserProfile.objects.get(user=obj.id).followers.count()

    def get_logged_in_user_is_friends(self, obj):
        return self.context['request'].user in self.get_all_friends(obj)

    def get_logged_in_user_is_following(self, obj):
        return self.context['request'].user in UserProfile.objects.get(user=obj.id).followers.all()

    def get_all_friends(self, obj):
        total_friends = []
        for request_entry in list(obj.received.all()) + list(obj.requested.all()):
            if request_entry.requester != obj and request_entry.status == 'A':
                total_friends.append(request_entry.requester)
            if request_entry.receiver != obj and request_entry.status == 'A':
                total_friends.append(request_entry.receiver)
        return total_friends

    def get_all_rejected(self, obj):
        total_rejected = []
        for request_entry in list(obj.received.all()) + list(obj.requested.all()):
            if request_entry.requester != obj and request_entry.status == 'R':
                total_rejected.append(request_entry.requester)
            if request_entry.receiver != obj and request_entry.status == 'R':
                total_rejected.append(request_entry.receiver)
        return total_rejected

    def get_logged_in_user_is_rejected(self, obj):
        return self.context['request'].user in self.get_all_rejected(obj)

    def get_amount_of_friends(self, obj):
        return len(self.get_all_friends(obj))

    def get_logged_in_user_sent_fr(self, obj):
        for request_entry in obj.received.all():
            if request_entry.requester == self.context['request'].user:
                return True
        return False

    def get_logged_in_user_received_fr(self, obj):
        for request_entry in obj.requested.all():
            if request_entry.receiver == self.context['request'].user:
                return True
        return False

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'location',
            'about_me',
            'avatar',
            'banner',
            'amount_of_posts',
            'amount_following',
            'amount_of_followers',
            'amount_of_friends',
            'amount_of_likes',
            'logged_in_user_is_friends',
            'logged_in_user_is_following',
            'logged_in_user_is_rejected',
            'things_user_likes',
            'logged_in_user_received_fr',
            'logged_in_user_sent_fr',
        ]
        extra_kwargs = {
            'email': {'read_only': True},
        }


class CreateUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    code = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'password_repeat',
            'code',
        ]

    def validate(self, data):
        try:
            target_profile = RegistrationProfile.objects.get(email=data.get('email'))
        except RegistrationProfile.DoesNotExist:
            raise serializers.ValidationError({"detail": "Your email is incorrect or does not exist!"})
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"detail": "Your validation code is incorrect!"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "the passwords do not match!"})
        if not len(data.get('first_name')):
            raise serializers.ValidationError({"detail": "First name cannot be empty!"})
        if not len(data.get('username')):
            raise serializers.ValidationError({"detail": "Username cannot be empty!"})
        if not len(data.get('last_name')):
            raise serializers.ValidationError({"detail": "Last name cannot be empty!"})
        return data


class ResetPasswordSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    code = serializers.CharField()

    email = serializers.CharField(write_only=True,
                                  required=True, )

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'password_repeat',
            'code',
        ]

    def validate(self, data):
        if not get_or_none(RegistrationProfile, email=data.get('email')):
            raise serializers.ValidationError({"detail": "Your email is invalid!"})
        if data.get('code') != RegistrationProfile.objects.get(email=data.get('email')).code:
            raise serializers.ValidationError({"detail": "Your validation code is incorrect!"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "the passwords do not match!"})
        return data

