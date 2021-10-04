from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Calendar(models.Model):
    subject=models.CharField(max_length=1000)
    event = ((0, "Ưu tiên cao"), (1, "Ưu tiên Trung bình"), (2, "Ưu tiên thấp"))
    eventType = models.IntegerField(choices=event, default=2)
    startTime=models.DateField()
    endTime=models.TimeField()
    description=models.CharField(max_length=1000)
    user_room = models.ManyToManyField(User, related_name='user_room_set')
    user_control = models.ManyToManyField(User, related_name='user_control_set')
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('startTime', 'endTime',)


    def __str__(self):
        return self.subject