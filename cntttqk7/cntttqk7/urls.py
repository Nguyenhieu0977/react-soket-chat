# backend/server/server/urls.py
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
  
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from apps.accounts.urls import accounts_urlpatterns, room_urlpatterns
from apps.chat.urls import chat_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_urlpatterns # add URLs for authentication
urlpatterns += room_urlpatterns # add URLs for authentication
urlpatterns += chat_urlpatterns