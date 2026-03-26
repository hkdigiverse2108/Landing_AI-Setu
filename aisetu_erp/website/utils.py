from reportlab.pdfgen import canvas
import jwt
from django.conf import settings
from django.http import JsonResponse

def generate_invoice(payment):

    file_path = f"media/invoice_{payment.transaction_id}.pdf"

    c = canvas.Canvas(file_path)

    signup = payment.pricing_signup

    c.drawString(100, 750, f"Shop Name: {signup.shop_name}")
    c.drawString(100, 730, f"Owner: {signup.owner_name}")

    c.drawString(100, 690, f"Amount: {payment.amount}")

    c.drawString(100, 650, f"Transaction ID: {payment.transaction_id}")

    c.save()

    payment.invoice = file_path
    payment.save()

    return file_path

def admin_required(view_func):

    def wrapper(request, *args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return JsonResponse({"error": "Token required"}, status=401)

        try:
            token = token.split(" ")[1]
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            request.admin_id = decoded["admin_id"]

        except:
            return JsonResponse({"error": "Invalid token"}, status=401)

        return view_func(request, *args, **kwargs)

    return wrapper