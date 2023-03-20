# Generated by Django 2.2.4 on 2019-12-14 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_product_margin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=20, verbose_name='Τιμή Πώλησης'),
        ),
        migrations.AlterField(
            model_name='productvendor',
            name='sku',
            field=models.CharField(blank=True, max_length=150, verbose_name='Κωδικος Τιμολογιου'),
        ),
    ]
