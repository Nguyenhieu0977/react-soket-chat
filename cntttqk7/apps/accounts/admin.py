from django.contrib import admin
from .models import Room, userProfile, Unit
from django.contrib.auth.models import User

# Register your models here.
# 


# @admin.register(User)
# class MyUserAdmin(admin.ModelAdmin):
#     def group(self, user):
#         groups = []
#         for group in user.groups.all():
#             groups.append(group.name)
#         return ' '.join(groups)
#     group.short_description = 'Groups'
#     list_display = ("id", "first_name", "last_name", "email", "username", 'group', "is_active")
    


@admin.register(userProfile)
class userProfileAdmin(admin.ModelAdmin):
    # def favourite(self, user):
    #     favourites = []
        # for favourite in user.favourite.all():
        #     favourites.append(favourite.name)
        # return ' '.join(favourites)
    # favourite.short_description = 'Favourites'
    
    list_display = ("id", "user", "first_name", "last_name")
    
@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    # def favourite(self, user):
    #     favourites = []
        # for favourite in user.favourite.all():
        #     favourites.append(favourite.name)
        # return ' '.join(favourites)
    # favourite.short_description = 'Favourites'
    
    list_display = ("id", "unit_name", "unit_parent" )


# @admin.register(Unit)
# class UnitAdmin(admin.ModelAdmin):
#     # def favourite(self, user):
#     #     favourites = []
#         # for favourite in user.favourite.all():
#         #     favourites.append(favourite.name)
#         # return ' '.join(favourites)
#     # favourite.short_description = 'Favourites'
    
#     list_display = ("id", "unit_name", )


# @admin.register(DoIT_CanBo)
# class DoIT_CanBoAdmin(admin.ModelAdmin):
    # def favourite(self, user):
    #     favourites = []
        # for favourite in user.favourite.all():
        #     favourites.append(favourite.name)
        # return ' '.join(favourites)
    # favourite.short_description = 'Favourites'
    
    # list_display = ("Id_DNN", "FirstName", )

    
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    # def favourite(self, user):
    #     favourites = []
        # for favourite in user.favourite.all():
        #     favourites.append(favourite.name)
        # return ' '.join(favourites)
    # favourite.short_description = 'Favourites'
    
    list_display = ("Id", "Subject", "EventType", "Location", "StartTime", "EndTime", "Description",)