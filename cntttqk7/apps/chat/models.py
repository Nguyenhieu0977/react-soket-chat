from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatGroup(models.Model):
    chat_group=models.CharField(max_length=1000)
    description=models.CharField(max_length=1000, null=True, blank=True)
    user_group = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('chat_group', 'description',)
        verbose_name_plural = "Nhóm hội thoại"

    def __str__(self):
        return self.chat_group

class ChatMessage(models.Model):

    message=models.CharField(max_length=1000, unique=True, error_messages={'unique':"Nội dung không được trống"})
    files = models.FileField(max_length=1000, null=True, blank=True)
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('message',)
        verbose_name_plural = "Thông tin hội thoại"


    def __str__(self):
        return self.message