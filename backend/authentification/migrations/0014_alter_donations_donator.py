# Generated by Django 4.1.3 on 2023-03-22 07:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0013_alter_orphanages_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donations',
            name='donator',
            field=models.ForeignKey(limit_choices_to={'user_login': 'donator'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
