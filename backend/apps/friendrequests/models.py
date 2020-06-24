from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.

class FriendRequest(models.Model):
    User = get_user_model()

    class Meta:
        unique_together = ['receiver', 'requester']

    def __str__(self):
        return f'Request ID: {self.id}Receiver: {self.receiver.username} Requester: {self.requester.username}'

    receiver = models.ForeignKey(on_delete=models.CASCADE, to=User, null=True, blank=True,
                                 related_name='received')
    requester = models.ForeignKey(on_delete=models.CASCADE, to=User, null=True, blank=True, related_name='requested')

    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    FRIEND_REQUEST_OPTIONS = [
        ('P', 'PENDING'),
        ('A', 'ACCEPTED'),
        ('R', 'REJECTED')
    ]

    status = models.CharField(choices=FRIEND_REQUEST_OPTIONS, max_length=2, default='P')


