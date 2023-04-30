from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,CreateAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .models import needs, donations, gallery, message, mealDonation, Meal
from .serializers import  MessageSerializer,NeedsSerializer,MessagesSerializer,DonationsSerializer,MealViewDonationSerializer, NeedSerializer, DonationSerializer, MealSerializer, GallerySerializer, UserSerializer, MealDonationSerializer
from datetime import datetime, timezone, timedelta, date
from django.utils import timezone
from django.db.models import F
from authentification.models import UserAccount
from rest_framework.exceptions import ValidationError
from rest_framework.generics import UpdateAPIView
from django.db.models import Sum



class MealListCreateView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, orphanage_id):
        meals = Meal.objects.filter(orphanage_id=orphanage_id)
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, orphanage_id):
        try:
            meal = Meal.objects.get(orphanage_id=orphanage_id)
        except Meal.DoesNotExist:
            return Response ({"error": "Meal not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MealSerializer(meal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MealDonationCreateView(CreateAPIView):
    
    authentication_classes = []
    permission_classes = []



    queryset = mealDonation.objects.all()
    serializer_class = MealDonationSerializer

class MealDonationListView(ListAPIView):
    
    authentication_classes = []
    permission_classes = []

    def get(self, request, orphanage_id):
        meal = mealDonation.objects.filter(orphanage_id=orphanage_id)
        serializer = MealViewDonationSerializer(meal, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrphanageView(ListAPIView):
    queryset = UserAccount.objects.filter(is_approve=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = UserSerializer


class OrphanageDetailView(RetrieveAPIView):
    queryset = UserAccount.objects.filter(is_approve=True)
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )

class NeedListAPIView(APIView): 
    authentication_classes = []
    permission_classes = []

    def get(self, request, orphanage_id):
        need = needs.objects.filter(orphanage=orphanage_id)
        serializer = NeedSerializer(need, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class NeedsCreateView(CreateAPIView):
    queryset = needs.objects.all()
    serializer_class = NeedSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class NeedsPatchView(UpdateAPIView):
    queryset = needs.objects.all()
    serializer_class = NeedsSerializer
    authentication_classes = []
    permission_classes = []
    
    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Check if partial update is allowed
        
        # Retrieve and validate the ID from the URL
        id = kwargs.get('need_id')  # 'pk' is the default parameter name for the primary key in Django REST framework
        if id is None:
            raise serializers.ValidationError("ID not found in URL")
        
        # Get the object associated with the ID
        try:
            instance = needs.objects.get(id=id)
        except needs.DoesNotExist:
            raise serializers.ValidationError("Object not found for the given ID")
        
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



    
class GalleryListAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, orphanage_id):
        galler = gallery.objects.filter(orphanage=orphanage_id)
        serializer = GallerySerializer(galler, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DonationListView(ListAPIView):
    queryset = donations.objects.all()
    serializer_class = DonationSerializer
    permission_classes = (permissions.AllowAny, )

class DonationListAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, need_id):
        donate = donations.objects.filter(donator__id=need_id)
        serializer = DonationSerializer(donate, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DonationsCreateView(CreateAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = donations.objects.all()
    serializer_class = DonationsSerializer

class DonatorListAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, need_id):
        donate = donations.objects.filter(needs__orphanage__id=need_id)
        serializer = DonationSerializer(donate, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DonationDateListAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, need_id):
        current_time = timezone.now()
        # Filter donations for the week
        weekly_donations = donations.objects.filter(needs__orphanage__id=need_id,
                                                    date__gte=current_time - timezone.timedelta(days=7))
        # Filter donations for the month
        monthly_donations = donations.objects.filter(needs__orphanage__id=need_id,
                                                     date__gte=current_time - timezone.timedelta(days=30))
        # Get total donation amount
        total_donation = donations.objects.filter(needs__orphanage__id=need_id).aggregate(Sum('donated'))['donated__sum']

        # Serialize the filtered donations
        weekly_serializer = DonationSerializer(weekly_donations, many=True)
        monthly_serializer = DonationSerializer(monthly_donations, many=True)

        # Return the serialized data
        return Response({
            'weekly_donations': weekly_serializer.data,
            'monthly_donations': monthly_serializer.data,
            'total_donation': total_donation
        }, status=status.HTTP_200_OK)

class MessageListAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, donor_id):
        donate = message.objects.filter(donor__donator__id=donor_id)
        serializer = MessageSerializer(donate, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MessageCreateAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
