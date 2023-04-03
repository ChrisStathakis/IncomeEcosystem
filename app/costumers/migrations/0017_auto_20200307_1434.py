# Generated by Django 2.2 on 2020-03-07 12:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costumers', '0016_auto_20200307_1427'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentinvoice',
            name='card_info',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='costumers.MyCard', verbose_name='Στάμπα'),
        ),
        migrations.AlterField(
            model_name='paymentinvoice',
            name='costumer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='costumers.Costumer', verbose_name='Πελάτης'),
        ),
        migrations.AlterField(
            model_name='paymentinvoice',
            name='date',
            field=models.DateField(verbose_name='Ημερομηνία'),
        ),
        migrations.AlterField(
            model_name='paymentinvoice',
            name='payment_info',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='frontend.PaymentMethod', verbose_name='Τρόπος Πληρωμής'),
        ),
        migrations.AlterField(
            model_name='paymentinvoice',
            name='series',
            field=models.CharField(choices=[('a', 'A'), ('b', 'B'), ('c', 'Γ')], max_length=1, verbose_name='Σειρά'),
        ),
        migrations.AlterField(
            model_name='paymentinvoice',
            name='value',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=17, verbose_name='Αξια Προ Εκπτωσεως'),
        ),
    ]