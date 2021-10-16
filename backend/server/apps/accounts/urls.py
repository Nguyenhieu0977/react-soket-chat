from django.conf.urls import url, include
from django.urls import include, path
from . import views
from .views import UserProfileListView, userProfileDetailView, userProfileUnitAPIView, SignupView, UnitParentAPIView, userProfileAPIView
# from .views import UserViewSet

# from rest_framework import routers
from rest_framework.routers import DefaultRouter


accounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
    path('api/v1/register', SignupView.as_view()),
    path("api/v1/profiles/", UserProfileListView.as_view(),name="profiles"),
    path("api/v1/profile/<int:pk>/", userProfileDetailView.as_view(),name="profile"),
    url(r'^api/v1/profiles/(?P<unit_id>[0-9]+)/$', userProfileUnitAPIView.as_view(), name='profile_unit'),
    url(r'^api/v1/profile_user/(?P<user>[0-9]+)/$', userProfileAPIView.as_view(), name='profile_user'),
    url(r'^api/v1/unit/(?P<unit_parent>[0-9]+)/$', UnitParentAPIView.as_view(), name='unit_parent'),
]

router = DefaultRouter()
router.register("room", views.RoomViewSet, basename="room")
router.register("unit", views.UnitViewSet, basename="unit")
room_urlpatterns = [
    url("api/v1/", include(router.urls)),
    
    # url(r'^api/v1/room/(?P<startTime>[0-9]{4}-[0-9]{2}-[0-9]{2})/$', room_all.as_view(), name='room_all'),
    # url(r'^api/v1/room/add/$', add_room.as_view(), name='add_room'),
    # url(r'^api/v1/room/(?P<eventType>High)/$', roomHighAll.as_view(), name='roomHighAll'),
    # url(r'^api/v1/room/(?P<startTime>[0-9]{4}-[0-9]{2}-[0-9]{2})/(?P<event_time>[0-9]{2}:[0-9]{2}:[0-9]{2})/$', DeleteEvent.as_view(),name='DeleteEvent'),
    # url(r'^api/v1/room/(?P<pk>[0-9]+)/$',room_detail.as_view(), name='room_detail'),
    
]

