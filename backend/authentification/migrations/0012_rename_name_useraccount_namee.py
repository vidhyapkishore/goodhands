# Generated by Django 4.1.3 on 2023-03-22 06:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0011_rename_posts_gallery_rename_need_donations_needs_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='name',
            new_name='namee',
        ),
    ]
