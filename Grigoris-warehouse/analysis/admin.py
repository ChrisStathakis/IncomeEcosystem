from django.contrib import admin

from .models import TaxesModifier
# Register your models here.


@admin.register(TaxesModifier)
class TaxesModifier(admin.ModelAdmin):
    pass