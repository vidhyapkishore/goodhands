# Generated by Django 4.1.3 on 2023-04-13 00:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orphanage', '0015_alter_message_donor_alter_message_needs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='needs',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orphanage.needs'),
        ),
    ]
