# Generated by Django 2.2.4 on 2019-11-09 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendors', '0013_auto_20190921_1907'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vendor',
            options={'ordering': ['title']},
        ),
        migrations.AddField(
            model_name='note',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]
