from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet


from .serializers import Income, IncomeSerializer


@api_view(['GET'])
def homepage_view(request, format=None):

    return Response({
        'invoices': reverse('api_incomes:income-list', request=request, format=format)
    })


class IncomeViewSet(ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

