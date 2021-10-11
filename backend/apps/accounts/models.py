from django.db import models
from django.contrib.auth.models import User

import uuid


class userProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    # description=models.TextField(blank=True,null=True)
    # unitid = models.ForeignKey(Unit,on_delete=models.CASCADE)
    username=models.CharField(max_length=30,blank=True, null=True)
    first_name=models.CharField(max_length=30,blank=True, null=True)
    last_name=models.CharField(max_length=30,blank=True, null=True)
    phone = models.CharField(max_length=20, default='',blank=True, null=True)
    groups_choice = ((0, "--Chọn nhóm quyền--"),(1, "Quản trị hệ thống"), (2, "Chủ trì"), (3, "Thành viên"))
    groups = models.IntegerField(choices=groups_choice, default=0)
    city = models.CharField(max_length=20, default='',blank=True, null=True)
    image = models.ImageField (upload_to="media/profiles", blank=True, null=True, default='media/profiles/logo_qk7.png')
    unit_id = models.ForeignKey('Unit', on_delete=models.CASCADE, blank=True, null=True, default=1)
    sort_id = models.IntegerField(default=0)
    # location=models.CharField(max_length=30,blank=True, null=True)
    is_superuser=models.BooleanField(max_length=30,blank=True, null=True, default=False)
    is_staff=models.BooleanField(max_length=30,blank=True, null=True, default=False)
    is_active=models.BooleanField(max_length=30,blank=True, null=True, default=False)
    date_joined=models.DateTimeField(auto_now_add=True)
    updated_on=models.DateTimeField(auto_now=True)
    # is_organizer=models.BooleanField(default=False)
    class Meta:
        unique_together = ('user',)    
        verbose_name_plural = "Thông tin tài khoản"

    # def __str__(self):
    #     return self.user

class Unit(models.Model):
    # unit_code = models.CharField(max_length=255, default='')
    id=models.AutoField(primary_key=True)
    unit_name = models.CharField(max_length=255)
    unit_choice = ((0, "--Chọn phân cấp đơn vị--"),(1, "Đơn vị cấp 1"), (2, "Đơn vị cấp 2"), (3, "Đơn vị cấp 3"))
    unit_level = models.IntegerField(choices=unit_choice, default=1)
    unit_parent = models.ForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.PROTECT)
    Sort_id = models.IntegerField(default=0)

    class Meta:
        unique_together = ('unit_name',)    
        verbose_name_plural = "Đơn vị"

    def __str__(self):   
        # return self.unit_name                        
        full_path = [self.unit_name]                  
        k = self.unit_parent
        while k is not None:
            full_path.append(k.unit_name)
            k = k.unit_parent
        return ' -> '.join(full_path[::-1])



class Room(models.Model):
    Id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Subject=models.CharField(max_length=1000)
    event = ((0, "Ưu tiên cao"), (1, "Ưu tiên Trung bình"), (2, "Ưu tiên thấp"))
    EventType = models.IntegerField(choices=event, default=2)
    Location = models.CharField(max_length=1000, blank=True, null=True)
    StartTime=models.DateTimeField()
    EndTime=models.DateTimeField()
    Description=models.CharField(max_length=1000, blank=True, null=True)
    User_room = models.ManyToManyField(User, related_name='user_room_set')
    User_vip = models.ManyToManyField(User, related_name='user_vip_set')
    User_control = models.ManyToManyField(User, related_name='user_control_set')
    Created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('Subject',)    
        verbose_name_plural = "Phòng họp"
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    # class Meta:
    #     unique_together = ('startTime', 'endTime',)

    # def __str__(self):
    #     return self.subject

    # def __unicode__(self):
    #     return self.subject

# class MyUser(AbstractBaseUser, PermissionsMixin):
#     # user = models.OneToOneField(User, related_name="customer", on_delete=models.CASCADE)
    
#     username = models.CharField(max_length=255, unique=True)
#     email = models.EmailField(max_length=255, unique=True)
#     first_name = models.CharField(max_length=255)
#     last_name = models.CharField(max_length=255)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     rule_choice = ((0, "Quản trị hệ thống"), (1, "Chủ trì"), (2, "Thành viên"))
#     rules = models.IntegerField(choices=rule_choice, default=2)
#     sex_choice = ((0, "Nữ"), (1, "Nam"))
#     age = models.IntegerField(default=0)
#     sex = models.IntegerField(choices=sex_choice, default=1)

    # objects = UserAccountManager()

    # USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['first_name', 'last_name']

    # def get_full_name(self):
    #     return self.first_name

    # def get_short_name(self):
    #     return self.first_name
    
    # def __str__(self):
    #     return self.username
