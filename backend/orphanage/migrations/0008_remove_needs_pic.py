# Generated by Django 4.1.3 on 2023-04-11 06:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orphanage', '0007_message_needs_delete_orphanages'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='needs',
            name='pic',
        ),
    ]
