# Generated by Django 2.2.4 on 2019-09-17 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_auto_20190913_2031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=240, unique=True),
        ),
    ]
