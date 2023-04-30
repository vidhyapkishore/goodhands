from django.urls import path
from . import views

urlpatterns = [
    # other URL patterns for your app
    path('contact/', views.contact_view, name='contact'),
]
