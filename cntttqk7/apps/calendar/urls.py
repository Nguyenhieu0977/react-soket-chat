from django.conf.urls import *
from .views import event_all,event_Detail,add_event,EventHighAll,DeleteEvent
from rest_framework.urlpatterns import format_suffix_patterns
# app_name="music"


event_urlpatterns=[
    url(r'^api/v1/event/(?P<event_date>[0-9]{4}-[0-9]{2}-[0-9]{2})/$', event_all.as_view(), name='event_all'),
    url(r'^api/v1/event/add/$', add_event.as_view(), name='add_event'),
    url(r'^api/v1/event/(?P<preference>High)/$', EventHighAll.as_view(), name='EventHighAll'),
    url(r'^api/v1/event/(?P<event_date>[0-9]{4}-[0-9]{2}-[0-9]{2})/(?P<event_time>[0-9]{2}:[0-9]{2}:[0-9]{2})/$', DeleteEvent.as_view(),name='DeleteEvent'),
    #url(r'^(?P<album_id>[0-9]+)/$',detail, name='detail'),
    url(r'^api/v1/event/(?P<pk>[0-9]+)/$',event_Detail.as_view(), name='Album_Detail'),
    #url(r'^(?P<album_id>[0-9]+)/favourite$', favourite, name='favourite'),
]
# urlpatterns=format_suffix_patterns(urlpatterns)