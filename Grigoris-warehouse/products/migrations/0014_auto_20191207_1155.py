# Generated by Django 2.2.4 on 2019-12-07 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0013_productvendor_taxes_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvendor',
            name='added_value',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Επιπλεον Αξια'),
        ),
    ]
