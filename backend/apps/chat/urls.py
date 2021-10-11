from django.conf.urls import url, include
from . import views

# from rest_framework import routers
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("chat_group", views.ChatGroupViewSet, basename="chat_group")
router.register("chat_message", views.ChatMessageViewSet, basename="chat_message")
# router.register("chat_message_group", views.ChatMessageGroupViewSet, basename="chat_message_group")
# router.register("chat_message_group/(?P<chat_group>.+)/$", views.ChatMessageGroupViewSet, basename="chat_message_group")
chat_urlpatterns = [
    url("api/v1/", include(router.urls))
]

