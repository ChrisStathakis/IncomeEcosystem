# Generated by Django 2.2.4 on 2020-01-17 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0018_auto_20200114_0759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='level',
            field=models.PositiveIntegerField(editable=False),
        ),
        migrations.AlterField(
            model_name='category',
            name='lft',
            field=models.PositiveIntegerField(editable=False),
        ),
        migrations.AlterField(
            model_name='category',
            name='rght',
            field=models.PositiveIntegerField(editable=False),
        ),
    ]
