from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



USER_CHOICES= [
    ('donator', 'Donator'),
    ('orphanage', 'Orphanage'),
    ('admin','Admin'),
    ]

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.') 

        return self.create_user(email, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=100,default="Phone")
    namee = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    user_login = models.CharField(max_length=60,choices = USER_CHOICES,default="Orphanage")
    is_staff = models.BooleanField(default=False)
    is_approve = models.BooleanField(default=False)
    address = models.CharField(default="Address",max_length=1024,)
    zip_code = models.CharField(default="ZIP / Postal code",max_length=20,)
    city = models.CharField(default="City",max_length=1024,)
    state = models.CharField(default="State",max_length=300,) 
    country = models.CharField(default="Country",max_length=300,)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = [ 'phone','namee','user_login','address','zip_code','city','state','country' ]

    def get_short_name(self):
        return self.namee
    
    def __str__(self):
        return self.email
    


