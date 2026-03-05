from django.urls import path
from .views import book_demo_api,login_view,pricing_signup,update_policy,MyTokenObtainPairView
from . import views

urlpatterns = [    
    path("book-demo/", book_demo_api, name="book_demo_api"),
    path('api/login/', login_view, name='login_view'),
    path('pricing-signup/', pricing_signup, name='pricing_signup'), 
    path('api/policy/<str:title>/', views.get_policy, name='get_policy'),
    path('api/admin/update-policy/', update_policy, name='update_policy'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/admin/update-policy/', update_policy, name='update_policy'),
]  
