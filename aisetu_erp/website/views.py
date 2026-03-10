from website.models import DemoRequest,UserLogin, ReferralUser
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ContactSubmission, PricingSignup, LandingPageContent, Payment, PricingSignup
from .serializers import LandingPageContentSerializer,JobApplicationSerializer,ReferralUserSerializer
from .utils import generate_invoice
import random
import string
from bson import ObjectId
import base64
import hashlib
import requests
import uuid
from django.conf import settings


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

@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            email = data.POST.get('email')
            password = data.POST.get('password')

            if not all([email, password]):
                return JsonResponse({"error": "All fields required"}, status=400)

            DemoRequest.objects.create(
                email=email,
                password=password,
            )

            return JsonResponse({"message": "Login successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

FIXED_PASSWORD = "1234"

@csrf_exempt  # Disable CSRF for API requests from React
def login_view(request):
    if request.method == "POST":
        try:
            # Handle JSON data from React
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Check fixed password
            if password == FIXED_PASSWORD:
                UserLogin.objects.create(email=email, password=password)
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                return JsonResponse({"error": "Incorrect password. Please contact admin."}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)


@api_view(['POST'])
def pricing_signup(request):

    shop_name = request.data.get('shop_name')
    owner_name = request.data.get('owner_name')
    mobile_number = request.data.get('mobile_number')
    referral_code_input = request.data.get('referral_code')

    # ❌ Prevent duplicate signup
    if PricingSignup.objects.filter(mobile_number=mobile_number).exists():
        return Response({
            "error": "This mobile number already registered"
        }, status=400)

    generated_code = None

    # ✔ Check if user came from referral popup
    referral_user = ReferralUser.objects.filter(
        mobile_number=mobile_number
    ).first()

    if referral_user:
        generated_code = referral_user.referral_code
    else:
        generated_code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6
        ))

    # ✔ Increase referral count
    if referral_code_input:
        try:
            ref_user = PricingSignup.objects.get(referral_code=referral_code_input)
            ref_user.total_referrals += 1
            ref_user.save()
        except PricingSignup.DoesNotExist:
            pass

    signup = PricingSignup.objects.create(
        shop_name=shop_name,
        owner_name=owner_name,
        mobile_number=mobile_number,
        referral_code=generated_code
    )

    return Response({
        "message": "Signup successful",
        "referral_code": generated_code,
        "signup_id": str(signup.id)
    }, status=status.HTTP_201_CREATED)  

# @api_view(['POST'])
# def phonepe_initiate_payment(request):
#     try:
#         data = request.data
#         amount_in_rupees = int(data.get('amount', 0))
#         user_phone = data.get('phone', '9999999999')

#         if amount_in_rupees <= 0:
#             return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

#         amount_in_paise = amount_in_rupees * 100
#         merchant_transaction_id = str(uuid.uuid4())

#         # Save pending transaction to DB
#         transaction = PhonePeTransaction.objects.create(
#             merchant_transaction_id=merchant_transaction_id,
#             amount=amount_in_paise,
#             status='PAYMENT_PENDING',
#             user_phone=user_phone
#         )

#         merchant_id = settings.PHONEPE_MERCHANT_ID
#         salt_key = settings.PHONEPE_SALT_KEY
#         salt_index = settings.PHONEPE_SALT_INDEX
#         env_url = settings.PHONEPE_ENV_URL

#         # Construct PhonePe Payload
#         payload = {
#             "merchantId": merchant_id,
#             "merchantTransactionId": merchant_transaction_id,
#             "merchantUserId": f"USER_{user_phone}",
#             "amount": amount_in_paise,
#             "redirectUrl": "http://localhost:8080/payment-success",
#             "redirectMode": "POST",
#             "callbackUrl": "http://127.0.0.1:8000/api/phonepe/callback/",
#             "mobileNumber": user_phone,
#             "paymentInstrument": {
#                 "type": "PAY_PAGE"
#             }
#         }

#         # Encode Payload to Base64
#         payload_json = json.dumps(payload)
#         base64_payload = base64.b64encode(payload_json.encode('utf-8')).decode('utf-8')

#         # Calculate X-VERIFY Signature
#         # Formula: SHA256(Base64EncodedPayload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
#         string_to_hash = base64_payload + "/pg/v1/pay" + salt_key
#         hash_result = hashlib.sha256(string_to_hash.encode('utf-8')).hexdigest()
#         x_verify = hash_result + "###" + salt_index

#         # Make API Call to PhonePe
#         headers = {
#             "Content-Type": "application/json",
#             "X-VERIFY": x_verify
#         }
#         phonepe_request_data = {
#             "request": base64_payload
#         }

#         endpoint = f"{env_url}/pg/v1/pay"
#         response = requests.post(endpoint, json=phonepe_request_data, headers=headers)
#         response_data = response.json()

#         if response_data.get('success'):
#             payment_url = response_data['data']['instrumentResponse']['redirectInfo']['url']
#             return Response({"payment_url": payment_url, "merchant_transaction_id": merchant_transaction_id}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Failed to initiate payment", "details": response_data}, status=status.HTTP_400_BAD_REQUEST)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @csrf_exempt
# def phonepe_callback(request):
#     if request.method == "POST":
#         try:
#             # PhonePe sends the data in a base64 encoded format inside `response` key
#             data = json.loads(request.body)
#             base64_response = data.get('response')

#             if not base64_response:
#                 return JsonResponse({"error": "No response data"}, status=400)

#             # Decode to verify S2S callback
#             decoded_json = base64.b64decode(base64_response).decode('utf-8')
#             response_data = json.loads(decoded_json)

#             merchant_transaction_id = response_data.get('data', {}).get('merchantTransactionId')
#             phonepe_transaction_id = response_data.get('data', {}).get('transactionId')
#             payment_state = response_data.get('code')  # e.g., 'PAYMENT_SUCCESS'

#             # Verify signature if needed (Server-to-Server)
#             # Checksum formula: SHA256(base64_response + salt_key) + "###" + salt_index
#             received_signature = request.META.get('HTTP_X_VERIFY')
#             string_to_hash = base64_response + settings.PHONEPE_SALT_KEY
#             hash_result = hashlib.sha256(string_to_hash.encode('utf-8')).hexdigest()
#             expected_signature = hash_result + "###" + settings.PHONEPE_SALT_INDEX

#             if received_signature != expected_signature:
#                 return JsonResponse({"error": "Invalid signature"}, status=400)

#             if merchant_transaction_id:
#                 try:
#                     transaction = PhonePeTransaction.objects.get(merchant_transaction_id=merchant_transaction_id)
#                     transaction.phonepe_transaction_id = phonepe_transaction_id
                    
#                     if payment_state == 'PAYMENT_SUCCESS':
#                         transaction.status = 'PAYMENT_SUCCESS'
#                     else:
#                         transaction.status = 'PAYMENT_ERROR'
                        
#                     transaction.save()
#                 except PhonePeTransaction.DoesNotExist:
#                     return JsonResponse({"error": "Transaction not found"}, status=404)

#             return JsonResponse({"message": "Callback received"}, status=200)

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
    
#     return JsonResponse({"error": "Invalid method"}, status=405)

@api_view(['GET'])
def landing_page_content_api(request):
    try:
        content = LandingPageContent.objects.first()
        if not content:
            # Create default content if not exists
            content = LandingPageContent.objects.create()
        serializer = LandingPageContentSerializer(content)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

from django.http import HttpResponse

@csrf_exempt
def submit_contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Save contact form
            contact = ContactSubmission.objects.create(
                name=data.get("name"),
                phone=data.get("phone"),
                email=data.get("email"),
                officeAddress=data.get("officeAddress"),
                message=data.get("message"),
            )

            # Prepare response
            response = {
                "id": str(contact.id),  # Convert ObjectId to string
                "message": "Form submitted successfully!"
            }

            # Return JSON as HttpResponse
            return HttpResponse(
                json.dumps(response),
                content_type="application/json",
                status=201
            )

        except Exception as e:
            response = {"error": str(e)}
            return HttpResponse(
                json.dumps(response),
                content_type="application/json",
                status=500
            )

    response = {"error": "Invalid request"}
    return HttpResponse(
        json.dumps(response),
        content_type="application/json",
        status=400
    )


@api_view(["POST"])
def apply_job(request):

    serializer = JobApplicationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Application submitted successfully"})

    return Response(serializer.errors)

@api_view(['POST'])
def check_referral(request):

    print("Incoming Data:", request.data)

    mobile = request.data.get("mobile_number")

    if not mobile:
        return Response({"error": "Mobile number required"}, status=400)

    # Check if user already signed up
    signup_user = PricingSignup.objects.filter(mobile_number=mobile).first()

    if signup_user:
        return Response({
            "referral_code": signup_user.referral_code,
            "status": "existing_pricing_user"
        })

    # Check referral user
    referral_user, created = ReferralUser.objects.get_or_create(
        mobile_number=mobile
    )

    return Response({
        "referral_code": referral_user.referral_code,
        "status": "new_user" if created else "existing_referral_user"
    })

MERCHANT_ID = "PGTESTPAYUAT"
SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
SALT_INDEX = "1"

@csrf_exempt
def initiate_payment(request):
    print("Request Data:", request.body)

    data = json.loads(request.body)

    print("Parsed data:", data)

    amount = data.get("amount")
    phone = data.get("phone")
    signup_id = data.get("signup_id")

    if not amount or not phone or not signup_id:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    transaction_id = str(uuid.uuid4())

    signup = PricingSignup.objects.get(id=ObjectId(signup_id))

    payment = Payment.objects.create(
        pricing_signup=signup,
        transaction_id=transaction_id,
        amount=amount,
        status="PENDING"
    )
    payload = {
        "merchantId": MERCHANT_ID,
        "merchantTransactionId": transaction_id,
        "merchantUserId": phone,
        "amount": amount * 100,
        "redirectUrl": "http://localhost:5173/payment-success",
        "redirectMode": "POST",
        "callbackUrl": "http://127.0.0.1:8000/payment-callback/",
        "mobileNumber": phone,
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    }

    payload_json = json.dumps(payload)
    payload_base64 = base64.b64encode(payload_json.encode()).decode()

    string = payload_base64 + "/pg/v1/pay" + SALT_KEY
    sha256 = hashlib.sha256(string.encode()).hexdigest()

    checksum = sha256 + "###" + SALT_INDEX

    url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

    headers = {
        "Content-Type": "application/json",
        "X-VERIFY": checksum
    }

    response = requests.post(
        url,
        json={"request": payload_base64},
        headers=headers
    )

    response_data = response.json()

    print("PhonePe Response:", response_data)

    if response_data.get("success"):
        payment_url = response_data["data"]["instrumentResponse"]["redirectInfo"]["url"]
        return JsonResponse({"payment_url": payment_url})
    else:
        return JsonResponse({
            "error": "PhonePe API error",
            "details": response_data
        }, status=400)

@csrf_exempt
def payment_callback(request):

    data = json.loads(request.body)

    transaction_id = data.get("transactionId")

    payment = Payment.objects.get(transaction_id=transaction_id)

    payment.status = "SUCCESS"
    payment.save()

    invoice_path = generate_invoice(payment)

    return JsonResponse({
        "status": "success",
        "invoice": invoice_path
    })