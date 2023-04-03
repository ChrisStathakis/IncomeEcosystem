# Generated by Django 2.2 on 2020-03-05 05:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costumers', '0005_auto_20200123_1927'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentInvoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('series', models.CharField(choices=[('a', 'A'), ('b', 'B'), ('c', 'Γ')], max_length=1)),
                ('place', models.CharField(max_length=220)),
                ('date', models.DateField()),
                ('clean_value', models.DecimalField(decimal_places=4, default=0.0, max_digits=17)),
                ('taxes', models.DecimalField(decimal_places=4, default=0.0, max_digits=17)),
                ('value', models.DecimalField(decimal_places=4, default=0.0, max_digits=17)),
                ('taxes_modifier', models.IntegerField(default=24)),
            ],
            options={
                'unique_together': {('number', 'series')},
            },
        ),
        migrations.CreateModel(
            name='InvoiceItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('unit', models.CharField(default='a', max_length=1)),
                ('qty', models.DecimalField(decimal_places=3, default=1, max_digits=17)),
                ('value', models.DecimalField(decimal_places=3, max_digits=17)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='costumers.PaymentInvoice')),
            ],
        ),
        migrations.CreateModel(
            name='CostumerDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eponimia', models.CharField(max_length=240, null=True, verbose_name='Επωνυμια')),
                ('address', models.CharField(blank=True, max_length=240, null=True, verbose_name='Διευθυνση')),
                ('job_description', models.CharField(blank=True, max_length=240, null=True, verbose_name='Επαγγελμα')),
                ('loading_place', models.CharField(blank=True, default='Εδρα μας', max_length=240, null=True, verbose_name='Τοπος Φορτωσης')),
                ('destination', models.CharField(blank=True, default='Εδρα του,', max_length=240, null=True, verbose_name='Προορισμος')),
                ('afm', models.CharField(blank=True, max_length=10, null=True, verbose_name='ΑΦΜ')),
                ('doy', models.CharField(blank=True, default='Σπαρτη', max_length=240, null=True, verbose_name='ΔΟΥ')),
                ('destination_city', models.CharField(blank=True, max_length=240, null=True, verbose_name='Πολη')),
                ('transport', models.CharField(blank=True, max_length=10, null=True, verbose_name='Μεταφορικο Μεσο')),
                ('costumer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='costumers.Costumer')),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='costumers.PaymentInvoice')),
            ],
        ),
    ]