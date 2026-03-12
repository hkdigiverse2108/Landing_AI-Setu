from django.db import models
import random
import string
import uuid
    
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

class AdminUser(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email
    
class PricingSignup(models.Model):
    shop_name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=15, unique=True)

    referral_code = models.CharField(max_length=50, blank=True, null=True)
    total_referrals = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.shop_name


class LandingPageContent(models.Model):
    # Singleton model for Landing Page Content
    # Hero Section
    hero_eyebrow = models.CharField(max_length=200, default="India's Smartest Retail ERP")
    hero_title = models.CharField(max_length=200, default="Smart ERP for")
    hero_highlighted_title = models.CharField(max_length=200, default="Indian Retailers")
    hero_subtitle = models.TextField(default="AI-powered billing, inventory & store management — built specifically for Indian retail businesses. Save time, reduce errors, grow faster.")
    
    # Highlights (stored as comma-separated string for simplicity in admin)
    hero_highlights = models.CharField(max_length=500, default="GST-Ready Billing,Real-time Inventory,AI-Powered Insights")
    
    # CTA Buttons
    primary_cta_text = models.CharField(max_length=50, default="Book Free Demo")
    secondary_cta_text = models.CharField(max_length=50, default="Watch Demo")
    
    # Social Proof
    trusted_retailers_count = models.CharField(max_length=50, default="500+")
    
    # Floating Stats
    hero_stats_label = models.CharField(max_length=100, default="Today's Sales")
    hero_stats_value = models.CharField(max_length=50, default="₹1,24,500")

    trust_item1 = models.CharField(max_length=200, default="Made for Indian Retailers")
    trust_item2 = models.CharField(max_length=200, default="GST-Ready")
    trust_item3 = models.CharField(max_length=200, default="Secure Cloud Data")
    trust_item4 = models.CharField(max_length=200, default="24/7 Support")

    problem_section_label = models.CharField(
        max_length=100,
        blank=True,
        default="THE CHALLENGE"
    )

    problem_section_title = models.CharField(
        max_length=255,
        blank=True,
        default="Retailers Face These Daily Problems"
    )

    # Problem Card 1
    problem1_title = models.CharField(max_length=200, blank=True)
    problem1_description = models.TextField(blank=True)

    # Problem Card 2
    problem2_title = models.CharField(max_length=200, blank=True)
    problem2_description = models.TextField(blank=True)

    # Problem Card 3
    problem3_title = models.CharField(max_length=200, blank=True)
    problem3_description = models.TextField(blank=True)

    # Problem Card 4
    problem4_title = models.CharField(max_length=200, blank=True)
    problem4_description = models.TextField(blank=True)

    # Problem Card 5
    problem5_title = models.CharField(max_length=200, blank=True)
    problem5_description = models.TextField(blank=True)

    solution_section_label = models.CharField(
        max_length=100,
        default="THE SOLUTION",
        blank=True
    )

    solution_section_title = models.CharField(
        max_length=255,
        default="One Smart ERP For Complete Store Management",
        blank=True
    )

    # Card 1
    solution1_title = models.CharField(
        max_length=200,
        default="POS Billing",
        blank=True
    )

    solution1_desc = models.TextField(
        default="Lightning-fast billing with GST compliance",
        blank=True
    )

    # Card 2
    solution2_title = models.CharField(
        max_length=200,
        default="Inventory Management",
        blank=True
    )

    solution2_desc = models.TextField(
        default="Real-time stock tracking & alerts",
        blank=True
    )

    # Card 3
    solution3_title = models.CharField(
        max_length=200,
        default="CRM & Loyalty",
        blank=True
    )

    solution3_desc = models.TextField(
        default="Customer management & loyalty programs",
        blank=True
    )

    # Card 4
    solution4_title = models.CharField(
        max_length=200,
        default="Accounting",
        blank=True
    )

    solution4_desc = models.TextField(
        default="Automated bookkeeping & reports",
        blank=True
    )

    # Card 5
    solution5_title = models.CharField(
        max_length=200,
        default="Employee Management",
        blank=True
    )

    solution5_desc = models.TextField(
        default="Attendance, payroll & performance",
        blank=True
    )

    # Card 6
    solution6_title = models.CharField(
        max_length=200,
        default="Reports & Dashboard",
        blank=True
    )

    solution6_desc = models.TextField(
        default="Insights at a glance with smart analytics",
        blank=True
    )

    usp_badge_text = models.CharField(
        max_length=200,
        default="AI-Powered (Beta Feature)",
        blank=True
    )

    usp_title = models.CharField(
        max_length=200,
        default="No Barcode? No Problem.",
        blank=True
    )

    usp_description = models.TextField(
        default="Our AI technology identifies products from photos — just snap and bill. No barcode scanner needed. Lightning-fast, accurate, and incredibly simple.",
        blank=True
    )

    # Feature 1
    usp_feature1_title = models.CharField(max_length=200, default="Photo-Based Product Detection")
    usp_feature1_desc = models.TextField(default="Instant product recognition from images")

    # Feature 2
    usp_feature2_title = models.CharField(max_length=200, default="AI Auto Identify Product")
    usp_feature2_desc = models.TextField(default="Smart AI-powered identification system")

    # Feature 3
    usp_feature3_title = models.CharField(max_length=200, default="Add Directly to Bill")
    usp_feature3_desc = models.TextField(default="Seamless one-click billing integration")

    # ===============================
    # HOW IT WORKS SECTION
    # ===============================

    howitworks_label = models.CharField(
        max_length=100,
        default="Simple Process",
        blank=True
    )

    howitworks_title = models.CharField(
        max_length=255,
        default="How It Works",
        blank=True
    )

    howitworks_step1_title = models.CharField(
        max_length=200,
        default="Book Demo",
        blank=True
    )

    howitworks_step1_desc = models.CharField(
        max_length=255,
        default="Schedule a quick demo with our team",
        blank=True
    )

    howitworks_step2_title = models.CharField(
        max_length=200,
        default="Setup & Training",
        blank=True
    )

    howitworks_step2_desc = models.CharField(
        max_length=255,
        default="We configure everything for you",
        blank=True
    )

    howitworks_step3_title = models.CharField(
        max_length=200,
        default="Start Smart Billing",
        blank=True
    )

    howitworks_step3_desc = models.CharField(
        max_length=255,
        default="Go live and start selling instantly",
        blank=True
    )


    # ===============================
    # WHO IS THIS FOR
    # ===============================
    who_main_title = models.CharField(
        max_length=255,
        default="Perfect For",
        blank=True
    )

    who_title = models.CharField(
        max_length=255,
        default="Who Is This For?",
        blank=True
    )

    who1 = models.CharField(
        max_length=200,
        default="Kirana Stores",
        blank=True
    )

    who2 = models.CharField(
        max_length=200,
        default="General Stores",
        blank=True
    )

    who3 = models.CharField(
        max_length=200,
        default="Medical Shops",
        blank=True
    )

    who4 = models.CharField(
        max_length=200,
        default="Hardware Stores",
        blank=True
    )

    who5 = models.CharField(
        max_length=200,
        default="Margin Business Retailers",
        blank=True
    )


    # ----------------------------
    # Pricing Section
    # ----------------------------

    pricing_label = models.CharField(
        max_length=100,
        default="PRICING",
        blank=True
    )

    pricing_title = models.CharField(
        max_length=255,
        default="Simple & Transparent Pricing",
        blank=True
    )

    # Plan Title
    pricing_plan_name = models.CharField(
        max_length=200,
        default="All-Inclusive Package",
        blank=True
    )

    # Old Price
    pricing_old_price = models.CharField(
        max_length=50,
        default="₹29,999",
        blank=True
    )

    # Current Price
    pricing_price = models.CharField(
        max_length=50,
        default="₹12,000",
        blank=True
    )

    pricing_price_suffix = models.CharField(
        max_length=50,
        default="+ GST",
        blank=True
    )

    # ----------------------------
    # Features
    # ----------------------------

    pricing_feature1 = models.CharField(
        max_length=255,
        default="Full Access to All Modules",
        blank=True
    )

    pricing_feature2 = models.CharField(
        max_length=255,
        default="POS Billing + Inventory",
        blank=True
    )

    pricing_feature3 = models.CharField(
        max_length=255,
        default="CRM & Loyalty Programs",
        blank=True
    )

    pricing_feature4 = models.CharField(
        max_length=255,
        default="Accounting & Reports",
        blank=True
    )

    pricing_feature5 = models.CharField(
        max_length=255,
        default="Employee Management",
        blank=True
    )

    pricing_feature6 = models.CharField(
        max_length=255,
        default="Setup & Training Support",
        blank=True
    )

    pricing_feature7 = models.CharField(
        max_length=255,
        default="24/7 Customer Support",
        blank=True
    )

    pricing_feature8 = models.CharField(
        max_length=255,
        default="AI Photo Billing",
        blank=True
    )

    # ----------------------------
    # Referral Section
    # ----------------------------

    referral_label = models.CharField(
        max_length=100,
        default="REFERRAL PROGRAM",
        blank=True
    )

    referral_title = models.CharField(
        max_length=255,
        default="Earn With AI-Setu ERP",
        blank=True
    )

    referral_item1_value = models.CharField(
        max_length=100,
        default="₹2,000",
        blank=True
    )

    referral_item1_text = models.CharField(
        max_length=200,
        default="Per Successful Sale",
        blank=True
    )

    referral_item2_value = models.CharField(
        max_length=100,
        default="₹1,000",
        blank=True
    )

    referral_item2_text = models.CharField(
        max_length=200,
        default="Renewal Incentive",
        blank=True
    )

    referral_item3_value = models.CharField(
        max_length=100,
        default="₹1,000",
        blank=True
    )

    referral_item3_text = models.CharField(
        max_length=200,
        default="For Every Successful Referral Purchase",
        blank=True
    )

    referral_item4_value = models.CharField(
        max_length=100,
        default="Unlimited",
        blank=True
    )

    referral_item4_text = models.CharField(
        max_length=200,
        default="Referral Income",
        blank=True
    )

    join_referral = models.CharField(max_length=50, default="Join Referral Program")

    # ----------------------------
    # Comparison Section
    # ----------------------------

    comparison_title = models.CharField(
        max_length=255,
        default="AI-Setu ERP vs Traditional Software",
        blank=True
    )

    comparison_subtitle = models.CharField(
        max_length=255,
        default="Discover why retailers are switching to AI-Setu ERP for faster, smarter store management.",
        blank=True
    )
    comparison_title1 = models.CharField(max_length=200, default="Feature")
    comparison_title2 = models.CharField(max_length=200, default="AI-Setu ERP")
    comparison_title3 = models.CharField(max_length=200, default="Traditional")

    comparison_feature1 = models.CharField(max_length=200, default="AI Photo Billing")
    comparison_feature2 = models.CharField(max_length=200, default="Simple Interface")
    comparison_feature3 = models.CharField(max_length=200, default="One Package Pricing")
    comparison_feature4 = models.CharField(max_length=200, default="Retail-Focused")
    comparison_feature5 = models.CharField(max_length=200, default="GST Ready")
    comparison_feature6 = models.CharField(max_length=200, default="Cloud Access")
    comparison_feature7 = models.CharField(max_length=200, default="24/7 Support")


    # ----------------------------
    # Testimonials Section
    # ----------------------------

    testimonial_label = models.CharField(
        max_length=100,
        default="TESTIMONIALS",
        blank=True
    )

    testimonial_title = models.CharField(
        max_length=255,
        default="What Our Customers Say",
        blank=True
    )

    testimonial1_name = models.CharField(
        max_length=200,
        default="Rajesh Patel",
        blank=True
    )

    testimonial1_role = models.CharField(
        max_length=200,
        default="Kirana Store,Surat",
        blank=True
    )

    testimonial1_text = models.TextField(
        default="AI-Setu ERP transformed my billing process. The AI photo detection is a game changer — no more barcode hassles!",
        blank=True
    )

    testimonial2_name = models.CharField(
        max_length=200,
        default="Priya Sharma",
        blank=True
    )

    testimonial2_role = models.CharField(
        max_length=200,
        default="Medical Shop,Surat",
        blank=True
    )

    testimonial2_text = models.TextField(
        default="Simple to use and my staff learned it in one day. GST billing is now automatic. Highly recommended!",
        blank=True
    )

    testimonial3_name = models.CharField(
        max_length=200,
        default="Amit Desai",
        blank=True
    )

    testimonial3_role = models.CharField(
        max_length=200,
        default="General Store, Vadodara",
        blank=True
    )

    testimonial3_text = models.TextField(
        default="Finally an ERP that understands Indian retail. The pricing is fair and support team is always available.",
        blank=True
    )

    # ----------------------------
    # FAQ Section
    # ----------------------------

    faq_title = models.CharField(
        max_length=255,
        default="Frequently Asked Questions",
        blank=True
    )

    faq1_question = models.CharField(
        max_length=255,
        default="Is it GST Ready?",
        blank=True
    )

    faq1_answer = models.TextField(
        default="Yes! AI-Setu ERP is fully GST compliant with automatic tax calculations, GSTIN integration, and GST-ready invoicing.",
        blank=True
    )

    faq2_question = models.CharField(
        max_length=255,
        default="Is Internet Required?",
        blank=True
    )

    faq2_answer = models.TextField(
        default="AI-Setu ERP is cloud-based for the best experience. However, basic billing can work offline and syncs when internet is available.",
        blank=True
    )

    faq3_question = models.CharField(
        max_length=255,
        default="Do I need Barcode?",
        blank=True
    )

    faq3_answer = models.TextField(
        default="No! Our AI-powered photo detection lets you bill products without barcodes — just snap a photo and the product is identified automatically.",
        blank=True
    )

    faq4_question = models.CharField(
        max_length=255,
        default="Is Support Provided?",
        blank=True
    )

    faq4_answer = models.TextField(
        default="Yes, we provide 24/7 customer support via phone, email, and chat. Our team is always ready to help.",
        blank=True
    )

    faq5_question = models.CharField(
        max_length=255,
        default="Is Training Included?",
        blank=True
    )

    faq5_answer = models.TextField(
        default="Absolutely. We provide complete setup and training for you and your staff as part of the package.",
        blank=True
    )

    faq6_question = models.CharField(
        max_length=255,
        default="What About Renewal?",
        blank=True
    )

    faq6_answer = models.TextField(
        default="Annual renewal is available at a competitive rate. Refer others and earn ₹1,000 per renewal incentive!",
        blank=True
    )

    # CTA SECTION

    cta_badge = models.CharField(
        max_length=200,
        default="Join 500+ Happy Retailers",
        blank=True
    )

    cta_title = models.CharField(
        max_length=255,
        default="Ready to Upgrade Your Store?",
        blank=True
    )

    cta_description = models.TextField(
        default="Join hundreds of Indian retailers who've switched to smarter billing with AI-Setu ERP. Get started in minutes, no tech skills needed.",
        blank=True
    )

    cta_button_text = models.CharField(
        max_length=100,
        default="Book Free Demo",
        blank=True
    )

    cta_small_text = models.CharField(
        max_length=255,
        default="No credit card required · Free setup · Cancel anytime",
        blank=True
    )

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if LandingPageContent.objects.exists() and not self.pk:
            # if an instance exists, maybe update it instead or reject creation
            # to be safe, just get the first and update
            existing = LandingPageContent.objects.first()
            self.pk = existing.pk
        super(LandingPageContent, self).save(*args, **kwargs)

    def __str__(self):
        return "Landing Page Content Settings"

class ContactSubmission(models.Model):
    name = models.CharField(max_length=255)
    # countryCode = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    officeAddress = models.TextField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class JobApplication(models.Model):

    job_position = models.CharField(max_length=200)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    email = models.EmailField()
    phone = models.CharField(max_length=20)

    experience = models.IntegerField(null=True, blank=True)
    available_to_join = models.IntegerField(null=True, blank=True)

    current_salary = models.CharField(max_length=100, blank=True)
    expected_salary = models.CharField(max_length=100, blank=True)

    location = models.CharField(max_length=200)

    resume = models.FileField(upload_to="resumes/")

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - {self.job_position}"

def generate_referral_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


class ReferralUser(models.Model):
    mobile_number = models.CharField(max_length=15, unique=True)
    referral_code = models.CharField(max_length=10, default=generate_referral_code)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.mobile_number

class Payment(models.Model):

    pricing_signup = models.ForeignKey(PricingSignup, on_delete=models.CASCADE)

    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False)

    amount = models.IntegerField()

    status = models.CharField(max_length=20, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)

    invoice = models.FileField(upload_to="invoices/", null=True, blank=True)

    def __str__(self):
        return str(self.transaction_id)