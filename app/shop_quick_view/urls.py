from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from analysis.api.views import BalanceSheetApiView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('costumers/', include('costumers.urls')),
    path('', include('frontend.urls')),
    path('warehouse/', include('vendors.urls')),
    path('products/', include('products.urls')),
    path('tinymce/', include('tinymce.urls')),
    path('payrolls-and-bills/', include('payroll.urls')),
    path('incomes/', include('incomes.urls')),
    path('analysis/', include('analysis.urls')),
    path('generic-expenses/', include('general_expenses.urls')),
    path('notebook/', include('notebook.urls')),


    # tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # api
    path('api/', include('frontend.api.urls')),
    path('api/vendors/', include('vendors.api.urls')),
    path('api/incomes/', include('incomes.api.urls')),
    path('api/balance-sheet/', BalanceSheetApiView.as_view())

]
