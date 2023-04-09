from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from django.db.models import Sum, Avg

from .serializers import Income, IncomeSerializer


@api_view(['GET'])
def homepage_view(request, format=None):

    return Response({
        'invoices': reverse('api_incomes:income-list', request=request, format=format), 
        'analysis': reverse('api_incomes:analysis', request=request, format=format)
    })


@api_view(['GET'])
def analysis_api_view(request):
    data = Income.filters_data(request, Income.objects.all())
    total_incomes = data.aggregate(Sum('value'))['value__sum'] if data.exists() else 0
    count_incomes = data.count()
    average_incomes = data.aggregate(Avg('value'))['value__avg'] if data.exists() else 0
    return Response({
        'total_incomes': total_incomes,
        'count_incomes': count_incomes,
        'average_incomes': average_incomes
    })

class IncomeViewSet(ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

