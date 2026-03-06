from website.models import DemoRequest,UserLogin
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import PricingSignup
import random
import string
from .models import Policy
from .serializers import PolicySerializer,EmailTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer
from .serializers import PolicySerializer
from . import serializers

@csrf_exempt
def book_demo_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            name = data.get("name")
            contact_number = data.get("contact_number")     
            store_type = data.get("store_type")      
            city = data.get("city")

            if not all([name, contact_number, store_type, city]):
                return JsonResponse({"error": "All fields required"}, status=400)

            DemoRequest.objects.create(
                name=name,
                contact_number=contact_number,
                store_type=store_type,
                city=city,
            )

            return JsonResponse({"message": "Demo request saved successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

# @csrf_exempt
# def user_login(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)

#             email = data.POST.get('email')
#             password = data.POST.get('password')

#             if not all([email, password]):
#                 return JsonResponse({"error": "All fields required"}, status=400)

#             DemoRequest.objects.create(
#                 email=email,
#                 password=password,
#             )

#             return JsonResponse({"message": "Login successfully"}, status=201)

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=400)

#     return JsonResponse({"error": "Only POST allowed"}, status=405)

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserLogin  # assuming you have this model

# Fixed passwords for demo (replace with proper auth in production)
FIXED_USER_PASSWORD = "1234"
ADMIN_EMAIL = "admin@aisetu.com"
ADMIN_PASSWORD = "admin123"

@csrf_exempt  # Disable CSRF for API requests from React
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)

            # --- Admin Login ---
            if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
                # Optional: create an admin login record
                UserLogin.objects.create(email=email, password=password)
                return JsonResponse({
                    "message": "Admin login successful!",
                    "role": "admin",
                    "token": "dummy-admin-token"  # replace with real token if you use JWT
                }, status=200)

            # --- Normal User Login ---
            if password == FIXED_USER_PASSWORD:
                UserLogin.objects.create(email=email, password=password)
                return JsonResponse({
                    "message": "User login successful!",
                    "role": "user",
                    "token": "dummy-user-token"
                }, status=200)

            return JsonResponse({"error": "Incorrect password. Please contact admin."}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)


@api_view(['POST'])
def pricing_signup(request):
    shop_name = request.data.get('shop_name')
    owner_name = request.data.get('owner_name')
    mobile_number = request.data.get('mobile_number')
    referral_code = request.data.get('referral_code')  # code entered by user

    # Generate 6 digit alphanumeric referral code
    generated_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

    total_referrals = 0

    # Check referral code entered by user
    if referral_code:
        try:
            ref_user = PricingSignup.objects.get(referral_code=referral_code)
            ref_user.total_referrals += 1
            ref_user.save()
        except PricingSignup.DoesNotExist:
            pass

    # Save new user
    PricingSignup.objects.create(
        shop_name=shop_name,
        owner_name=owner_name,
        mobile_number=mobile_number,
        referral_code=generated_code,
        total_referrals=total_referrals
    )

    return Response({
        "message": "Signup successful",
        "referral_code": generated_code
    }, status=status.HTTP_201_CREATED)  
    
# Get policy
@api_view(["GET"])
def get_policy(request, title):
    try:
        policy = Policy.objects.get(title=title)
        serializer = PolicySerializer(policy)
        return Response(serializer.data)
    except Policy.DoesNotExist:
        return Response({"error": "Policy not found"}, status=404)

# Admin-only update policy
@api_view(['POST'])
def update_policy(request):
    role = request.data.get("role")   # get role from frontend

    # Only admin can update
    if role != "admin":
        return Response({"error": "Unauthorized"}, status=403)

    title = request.data.get('title')
    content = request.data.get('content')

    if not title or not content:
        return Response({"error": "Title and content required"}, status=400)

    policy, created = Policy.objects.get_or_create(title=title)
    policy.content = content
    policy.save()

    serializer = PolicySerializer(policy)
    return Response(serializer.data)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer