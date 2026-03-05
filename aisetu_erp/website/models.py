from django.db import models
    
class DemoRequest(models.Model):
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    store_type = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.contact_number}"


class UserLogin(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    
class PricingSignup(models.Model):
    shop_name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=15)
    referral_code = models.CharField(max_length=50, blank=True, null=True)
    total_referrals = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.shop_name