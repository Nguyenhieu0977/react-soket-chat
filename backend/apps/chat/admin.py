from django.contrib import admin
from .models import ChatGroup, ChatMessage



@admin.register(ChatGroup)
class ChatAdmin(admin.ModelAdmin):
    
    list_display = ("id", "chat_group", "description")
    
@admin.register(ChatMessage)
class ChatAdmin(admin.ModelAdmin):
    
    list_display = ("id", "message", "files", "chat_group")