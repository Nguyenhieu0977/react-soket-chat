from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from .models import ChatGroup, ChatMessage
from .serializers import ChatGroupSerializer, ChatMessageSerializer
from rest_framework import viewsets


class ChatGroupViewSet(viewsets.ModelViewSet):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer



class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = ChatMessage.objects.all()
        chat_group = self.request.query_params.get('chat_group')
        # chat_group = self.kwargs['chat_group']
        if chat_group is not None:
            queryset = queryset.filter(chat_group=chat_group)
        return queryset

    # def get_queryset(self):
    #     return self.queryset.filter(created_by=self.request.user)

# class ChatMessageGroupViewSet(viewsets.ModelViewSet):
    
#     serializer_class = ChatMessageSerializer

#     def get_queryset(self):
#         queryset = ChatMessage.objects.all()
#         chat_group = self.request.query_params.get('chat_group')
#         # chat_group = self.kwargs['chat_group']
#         if chat_group is not None:
#             queryset = queryset.filter(chat_group=chat_group)
#         return queryset
