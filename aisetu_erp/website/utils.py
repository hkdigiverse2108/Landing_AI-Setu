from reportlab.pdfgen import canvas
import os

def generate_invoice(payment):

    file_path = f"media/invoice_{payment.transaction_id}.pdf"

    c = canvas.Canvas(file_path)

    c.setFont("Helvetica-Bold", 16)
    c.drawString(200, 800, "AI-Setu ERP Invoice")

    c.setFont("Helvetica", 12)

    signup = payment.pricing_signup

    c.drawString(100, 750, f"Shop Name: {signup.shop_name}")
    c.drawString(100, 730, f"Owner Name: {signup.owner_name}")
    c.drawString(100, 710, f"Mobile: {signup.mobile_number}")

    c.drawString(100, 670, "Package Price: ₹12000")
    c.drawString(100, 650, "GST (18%): ₹2160")
    c.drawString(100, 630, "Total: ₹14160")

    c.drawString(100, 590, f"Transaction ID: {payment.transaction_id}")

    c.save()

    return file_path