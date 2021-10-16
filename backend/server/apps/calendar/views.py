from django.shortcuts import render
from .models import Event,Demo
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.decorators import permission_classes
from .serializers import EventSerializer,DemoSerializer
from django.http import HttpResponse,HttpResponseRedirect
from datetime import date,time
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
from django.utils import dates
from django.utils.decorators import method_decorator


class add_event(generics.ListCreateAPIView):

    # model=Event

    # def get_serializer_class(self):
    #     if self.request.method == 'POST':
    #         return EventSerializer

    # @csrf_exempt

    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)

    #     if not serializer.is_valid():
    #         return Response(
    #             serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     item = Event.objects.create(
    #     description = request.data.get('description', None),
    #     date=request.data.get('date',None),
    #     time=request.data.get('time',None),
    #     preference=request.data.get('preference',None)
    #     )

    #     result = EventSerializer(item)

    #     return Response(result.data, status=status.HTTP_201_CREATED)


class EventHighAll(APIView):
    def get(self,request,preference,format=None):
        events=Event.objects.all().order_by('date','preference')
        high_events=events.filter(preference=preference)[:5]
        serializer=EventSerializer(high_events,many=True)
        return Response(serializer.data)


class event_all(APIView):
    def get(self,request,event_date,format=None):
        events=Event.objects.all().filter(date=event_date)
        serializer=EventSerializer(events,many=True)
        return Response(serializer.data)

class DeleteEvent(APIView):
     def delete(self, request,event_date,event_time):

        event=Event.objects.filter(date=event_date,time=event_time)
        result=event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class event_Detail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Event.objects.all()
    serializer_class=EventSerializer