from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IncomeViewSet, homepage_view,analysis_api_view

router = DefaultRouter()
router.register(r'incomes', IncomeViewSet)

app_name = 'api_incomes'

urlpatterns = [
    path('list/', include(router.urls)),
    path('', homepage_view, name='homepage'),
    path('analysis/', analysis_api_view, name='analysis')
]

