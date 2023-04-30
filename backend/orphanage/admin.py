from django.contrib import admin
from .models import donations,gallery,needs,message,annualReport,mealDonation,Meal
# Register your models here.
admin.site.register(mealDonation)
admin.site.register(Meal)
admin.site.register(donations)
admin.site.register(gallery)
admin.site.register(needs)
admin.site.register(message)
admin.site.register(annualReport)