from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as django_filters
from django.http import HttpResponse
from django.db.models import Sum, Avg

from .serializers import Income, IncomeSerializer
from .filters import DateRangeFilter

@api_view(['GET'])
def homepage_view(request, format=None):

    return Response({
        'invoices': reverse('api_incomes:income-list', request=request, format=format), 
        'analysis': reverse('api_incomes:analysis', request=request, format=format)
    })


@api_view(['GET'])
def analysis_api_view(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Token does not exist'}, status=401)
    data = Income.api_filter_data(request)
    total_data = Income.api_analyse_data(data)
    data_per_month = Income.api_analyze_per_month(data)
    
    return Response({
        'total_data': total_data,
        'data_per_month': data_per_month,
    })

class IncomeViewSet(ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    filter_backends = (django_filters.DjangoFilterBackend, )
    filterset_class = DateRangeFilter
    permission_classes = [IsAuthenticated]

