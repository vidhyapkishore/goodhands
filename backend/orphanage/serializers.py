from rest_framework import serializers
from authentification.models import UserAccount
from .models import  needs, gallery, donations, message, annualReport, mealDonation, Meal
from django.utils import timezone  # Import the timezone module

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ('orphanage_id', 'day_meal_price')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

class NeedSerializer(serializers.ModelSerializer):
    orphanage = UserSerializer()
    class Meta:
        model = needs
        fields = '__all__'

class NeedsSerializer(serializers.ModelSerializer):
    class Meta:
        model = needs
        fields = '__all__'

class GallerySerializer(serializers.ModelSerializer):
    orphanage = UserSerializer()
    class Meta:
        model = gallery
        fields = '__all__'

class DonationSerializer(serializers.ModelSerializer):    
    donator = UserSerializer()
    needs = NeedSerializer()
    # date = serializers.DateTimeField(default=timezone.now)
    class Meta:
        model = donations
        fields = ('donator', 'needs', 'donated')
        
class DonationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = donations
        fields = ('donator', 'needs', 'donated')  # Include 'date' field


class AnnualReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = annualReport
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    orphanage = UserSerializer()
    donor =DonationSerializer()
    class Meta:
        model = message
        fields = '__all__'

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = '__all__'

class MealDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = mealDonation
        fields = ['donator', 'date_of_booking', 'orphanage_id']

class MealViewDonationSerializer(serializers.ModelSerializer):    
    donator = UserSerializer()
    class Meta:
        model = mealDonation
        fields = ['donator', 'date_of_booking', 'orphanage_id']