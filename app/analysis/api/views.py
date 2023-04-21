from rest_framework import generics
from rest_framework import reverse
from rest_framework import filters
from rest_framework.views import APIView
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.reverse import reverse

from vendors.models import Invoice, Vendor, Payment
from incomes.models import Income
from itertools import chain
from operator import attrgetter


class BalanceSheetApiView(APIView):


    def get(self, request, format=None):
        invoices = Invoice.filters_data(request=request, qs=Invoice.objects.all())
        incomes = Income.filters_data(request, Income.objects.all())
        payments = Payment.filters_data(request, Payment.objects.all())

        # totals
        total_income = incomes.aggregate(Sum('value'))['value__sum'] if incomes.exists() else 0
        total_payments = payments.aggregate(Sum('value'))['value__sum'] if payments.exists() else 0
        total_invoices = invoices.aggregate(Sum('value'))['value__sum'] if invoices.exists() else 0
        real_diff = total_income - total_payments
        logistic_diff = total_income - total_invoices
        vendor_diff = total_invoices - total_payments

        # counts
        count_incomes = incomes.count()
        count_payments = payments.count()
        count_invoices = invoices.count()

        # monthly
        monthly_incomes = Income.api_analyze_per_month(incomes)
        monthly_payments = Payment.month_analysis(payments)
        monthy_invoices = Invoice.month_analysis(invoices)


        return Response({
            'totals':{
                'total_income': total_income,
                'total_invoices': total_invoices,
                'total_payments': total_payments,
                'real_diff': real_diff,
                'logistic_diff': logistic_diff,
                'vendor_diff': vendor_diff
            },
            'counts': {
                'count_incomes': count_incomes,
                'count_payments': count_payments,
                'count_invoices': count_invoices
            },
            'monthly': {
                'incomes': monthly_incomes,
                'invoices': monthy_invoices,
                'payments': monthly_payments,
                
            }
        })