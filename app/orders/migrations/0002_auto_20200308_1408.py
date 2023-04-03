# Generated by Django 3.0.1 on 2020-03-08 12:08

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='description',
            field=tinymce.models.HTMLField(blank=True, verbose_name='Περιγραφή'),
        ),
    ]