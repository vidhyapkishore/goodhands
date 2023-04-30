# Generated by Django 4.1.7 on 2023-03-21 15:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0009_alter_donations_need'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donations',
            name='donator',
            field=models.ForeignKey(limit_choices_to={'user_login': 'donator'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]