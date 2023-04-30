from django.db import models
from django.utils.timezone import now
from authentification.models import UserAccount
from django.core.validators import MinValueValidator
from django.utils import timezone
from authentification.models import UserAccount
from django.db.models.signals import post_save
from django.dispatch import receiver

class needs(models.Model):
    orphanage = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=60, default='Need')
    raised = models.IntegerField(null=True, default=0)
    goal = models.IntegerField(null=True, default=0)
    description = models.TextField(max_length=2000, null=True, default="Description")

class donations(models.Model):
    donator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, limit_choices_to={'user_login': 'donator'})
    needs = models.ForeignKey(needs, on_delete=models.CASCADE)
    donated = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    date = models.DateTimeField(default=timezone.now)  # Add 'date' field with auto_now_add=True



class gallery(models.Model): 
    orphanage=models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title=models.CharField(max_length=60, default='Post')  
    pic = models.ImageField(upload_to="img/gallery", null=True,default="img/place")
    created_at = models.DateTimeField( default=timezone.now)

class message(models.Model):
    orphanage=models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    donor=models.ForeignKey(donations, on_delete=models.CASCADE, limit_choices_to={'user_login': 'donator'} )
    message=models.CharField(max_length=1024, default='Thank You for your love and support !!!')  
    needs=models.ForeignKey(needs, on_delete=models.CASCADE)
    is_send = models.BooleanField(default=False)

class annualReport(models.Model):
    orphanage=models.ForeignKey(UserAccount, on_delete=models.CASCADE,  limit_choices_to={'user_login': 'orphanage'})
    file = models.FileField(upload_to='uploads/')
    year = models.IntegerField(validators=[MinValueValidator(2023)])



class mealDonation(models.Model):
    donator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, limit_choices_to={'user_login': 'donator'})
    date_of_booking = models.DateField()
    orphanage_id = models.PositiveIntegerField()

    class Meta:
        unique_together = ("orphanage_id", "date_of_booking")


class Meal(models.Model):
    orphanage_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE, limit_choices_to={'user_login': 'orphanage'})
    day_meal_price = models.DecimalField(max_digits=6, decimal_places=2)
