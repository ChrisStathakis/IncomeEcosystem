# Generated by Django 2.2.4 on 2019-09-13 17:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20190913_1925'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvendor',
            name='vendor',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='vendors.Vendor', verbose_name='Προμηθευτης'),
        ),
    ]