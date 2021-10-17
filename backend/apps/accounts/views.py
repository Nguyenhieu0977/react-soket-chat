from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.permissions import IsAuthenticated
from .models import userProfile
from .permissions import IsOwnerProfileOrReadOnly
from .serializers import userProfileSerializer, UserCreateSerializer, UnitSerializer, RoomSerializer
from rest_framework.views import APIView
# Create your views here.
from .models import Room, Unit
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions

class SignupView(APIView):
    queryset=userProfile.objects.all()
    serializer_class=userProfileSerializer
    # permission_classes = (permissions.AllowAny, )
    permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        email=data['email']
        password = data['password']
        re_password  = data['re_password']
        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username đã tồn tại' })
                if User.objects.filter(email=email).exists():
                    return Response({ 'error': 'Email đã tồn tại' })
                else:
                    if len(password) < 1:
                        return Response({ 'error': 'Chưa nhập mật khẩu' })
                    else:
                        user = User.objects.create_user(username=username, email=email, password=password)
                        user = User.objects.get(id=user.id)
                        # print(user)
                        userProfile.objects.create(user=user)
                        
                        return Response({ 'success': 'Tài khoản được tạo thành công' })
            else:
                return Response({ 'error': 'Mật khẩu nhập không khớp' })
        except:
                return Response({ 'error': 'Các thông tin tạo tài khoản không đúng' })

class UserProfileListView(ListCreateAPIView):
    queryset=userProfile.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=userProfile.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticated]
    # permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]
    
class userProfileUnitAPIView(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    
    def get(self,request, unit_id, format=None):
        userProfiles=userProfile.objects.all()
        userProfileUnit=userProfiles.filter(unit_id=unit_id)
        serializer=userProfileSerializer(userProfileUnit,many=True)
        return Response(serializer.data)

class userProfileAPIView(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    
    def get(self,request, user, format=None):

        try:
            user = self.request.user
            
            userProfile.objects.filter(user=user)
            # userProfile.save(user=user, first_name=first_name, last_name=last_name, phone=phone, city=city, groups=groups, image=image, unit_id=unit_id)

            user_profile = userProfile.objects.get(user=user)
            serializer = userProfileSerializer(user_profile)
            return Response(serializer.data)
        except:
            return Response({ 'error': 'Something went wrong when updating profile' })


class userProfileUpdate(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username
            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']
            image = data['image']
            unit_id=data['unit_id']
            groups =data['groups']
            print(data)
            userProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city, groups=groups, image=image, unit_id=unit_id)
            # userProfile.save(user=user, first_name=first_name, last_name=last_name, phone=phone, city=city, groups=groups, image=image, unit_id=unit_id)

            user_profile = userProfile.objects.get(user=user)
            user_profile = userProfileSerializer(user_profile)
            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({ 'error': 'Something went wrong when updating profile' })

    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    def perform_create(self, serializer):
        serializer.save()

class UnitViewSet(viewsets.ModelViewSet):
    # queryset = Unit.objects.all()
    queryset = Unit.objects.filter(unit_parent__isnull=True)
    serializer_class = UnitSerializer

    def perform_create(self, serializer):
        serializer.save()

class UnitParentAPIView(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    
    def get(self,request, unit_parent, format=None):
        unitParent=Unit.objects.all()
        unitParent=unitParent.filter(unit_parent=unit_parent)
        serializer=UnitSerializer(unitParent,many=True)
        return Response(serializer.data)

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def perform_create(self, serializer):
        serializer.save()

    # def get_queryset(self):
    #     return self.queryset.filter(user_room=self.request.user)

# class RoomHighAll(APIView):
#     def get(self,request,eventType,format=None):
#         rooms=Room.objects.all().order_by('startTime','eventType')
#         high_rooms=rooms.filter(eventType=eventType)[:5]
#         serializer=RoomSerializer(high_rooms,many=True)
#         return Response(serializer.data)


# class room_all(APIView):
#     def get(self,request,startTime,format=None):
#         rooms=Room.objects.all().filter(startTime=startTime)
#         serializer=RoomSerializer(rooms,many=True)
#         return Response(serializer.data)

# class room_delete(APIView):
#      def delete(self, request,startTime):

#         room=Event.objects.filter(startTime=startTime)
#         result=room.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# class room_detail(generics.RetrieveUpdateDestroyAPIView):
#     queryset=Room.objects.all()
#     serializer_class=RoomSerializer

