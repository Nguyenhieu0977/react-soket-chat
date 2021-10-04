from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Room, userProfile, Unit
from rest_framework_recursive.fields import RecursiveField


User = get_user_model()


class userProfileSerializer(serializers.ModelSerializer):
    # user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=userProfile
        fields=('id','first_name', 'last_name', 'phone', 'groups', 'user', 'date_joined', 'image')

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        # mobile_number = serializers.CharField(required=True, allow_blank=False)
        fields = ('id', 'email', 'username', 'groups', 'last_login', 'is_active', 'date_joined')
        # fields='__all__'

class UnitSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    
    class Meta:
        model = Unit
        fields = ("id", "unit_name", "unit_parent", "children")

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("Id", "Subject", "EventType", "Location", "StartTime", "EndTime", "Description", "User_room", "User_control", "User_vip")