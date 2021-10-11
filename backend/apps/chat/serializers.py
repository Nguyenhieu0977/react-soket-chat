from rest_framework import serializers
from .models import ChatGroup,ChatMessage

class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=ChatGroup
        fields=('id','chat_group','description','user_group')

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ("id", "message", "files", "chat_group", "created_at", "created_by")





