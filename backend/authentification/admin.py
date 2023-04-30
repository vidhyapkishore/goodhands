from django.contrib import admin
from .models import UserAccount
# ,donations,gallery,orphanages,needs,message,annualReport
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','email','is_approve','user_login')
    list_display_links = ('id','email','is_approve')
    search_fields=('state','city','country')
    list_per_page = 25

admin.site.register(UserAccount, UserAdmin)

# admin.site.register(UserAccount)
# admin.site.register(donations)
# admin.site.register(gallery)
# admin.site.register(orphanages)
# admin.site.register(needs)
# admin.site.register(message)
# admin.site.register(annualReport)