from rest_framework import filters
from django_filters import rest_framework as django_filters
from ..models import Income


class DateRangeFilter(django_filters.FilterSet):
    date_range = django_filters.DateFromToRangeFilter(field_name='date_expired')

    class Meta:
        model = Income
        fields = ('date_range', )