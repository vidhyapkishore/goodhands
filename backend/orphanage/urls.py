from django.urls import path
from .views import OrphanageView,NeedsPatchView,DonationDateListAPIView, OrphanageDetailView,MealListCreateView, DonationsCreateView,MessageCreateAPIView, MealDonationListView, MealDonationCreateView  , MessageListAPIView, DonationListView, NeedListAPIView, GalleryListAPIView, DonatorListAPIView,DonationListAPIView, NeedsCreateView
urlpatterns = [
    path('', OrphanageView.as_view(), name='orphanages'),
    path('<pk>', OrphanageDetailView.as_view(), name='orphanage_detail'),
    path('<str:orphanage_id>/needs/', NeedListAPIView.as_view(), name='needs'),
    path('<str:orphanage_id>/gallery/', GalleryListAPIView.as_view(), name='gallery'),
    path('donation/', DonationListView.as_view(), name='donation'),
    path('needs_create/', NeedsCreateView.as_view(), name='needs_create'),
    path('<str:need_id>/needs_create/', NeedsPatchView.as_view(), name='needs_patch'),
    path('<str:need_id>/donation/',DonatorListAPIView.as_view(), name='donator'),
    path('<str:need_id>/donations/',DonationListAPIView.as_view(), name='donation'),
    path('<str:need_id>/donationdate/',DonationDateListAPIView.as_view(), name='donationn'),
    path('<str:donor_id>/message/',MessageListAPIView.as_view(), name='message'),
    path('donations/',DonationsCreateView.as_view(), name='donations'),
    path('mealdonations/<str:orphanage_id>/', MealDonationListView.as_view(), name='one-day-meal-booking'),
    path('createmealdonations/', MealDonationCreateView.as_view(),),
    path('meals/<str:orphanage_id>/', MealListCreateView.as_view(), name='meal'),
    path('messages/', MessageCreateAPIView.as_view(), name='message-create'),
]
 
 