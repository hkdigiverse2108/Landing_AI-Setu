from django.contrib import admin
from .models import FAQ, AllStoreType, CareerPage, ChildJobPosition, ComparisonFeature, ContactPageContent, ContactPageContent, Culture, DemoVideo, Feature, Footer, HowItWorksStep, JobDescription, JobPosition, JobSkill, LandingPageContent, LoginLink, Page, Perk, Policy, PolicySection, Problem, ReferralPerk, Section, SectionItem, StoreType, Testimonial, USPFeature, BlogCategory, BlogPost, DemoRequestProxy, PricingSignupProxy, ContactSubmissionProxy, JobApplicationProxy, PaymentProxy
import nested_admin

# ... existing code ...

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "author", "created_at", "is_published"]
    list_filter = ["is_published", "category", "author"]
    search_fields = ["title", "content", "excerpt"]
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "created_at"
    
    fieldsets = (
        ("Content", {
            "fields": ("title", "slug", "category", "featured_image", "excerpt", "content", "author", "is_published")
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how this post appears in search engines."
        }),
    )

# @admin.register(LandingPageContent)
# class LandingPageContentAdmin(admin.ModelAdmin):
#     # To restrict adding more than one instance
#     def has_add_permission(self, request):
#         if self.model.objects.exists():
#             return False
#         return super().has_add_permission(request)

@admin.register(LandingPageContent)
class LandingPageContentAdmin(admin.ModelAdmin):

    change_form_template = "admin/live_preview_change_form.html"

    fieldsets = (
        ("Content", {
            "fields": (
                "hero_eyebrow", "hero_title", "hero_highlighted_title", "hero_subtitle",
                "hero_highlights", "primary_cta_text", "secondary_cta_text",
                "trusted_retailers_count", "hero_stats_label", "hero_stats_value",
                "trust_item1", "trust_item2", "trust_item3", "trust_item4",
                "problem_section_label", "problem_section_title", "feature_title", "feature_title2",
                "solution_section_label", "solution_section_title", "usp_badge_text",
                "usp_title", "usp_description", "howitworks_label", "howitworks_title",
                "who_main_title", "who_title", "pricing_main_title", "pricing_main_desc",
                "pricing_label", "pricing_title", "pricing_plan_name", "pricing_old_price",
                "pricing_price", "pricing_price_suffix", "referral_main_title",
                "referral_main_desc", "referral_label", "referral_title", "join_referral",
                "comparison_title", "comparison_subtitle", "comparison_title1",
                "comparison_title2", "comparison_title3", "testimonial_label",
                "testimonial_title", "review_button", "all_reviews_title", "all_reviews_desc",
                "faq_label", "faq_title", "cta_badge", "cta_title", "cta_description",
                "cta_button_text", "cta_small_text"
            )
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how the Home page appears in search engines."
        }),
    )

# @admin.register(AboutPageContent)
# class AboutPageContentAdmin(admin.ModelAdmin):

#     change_form_template = "admin/live_preview_aboutus_form.html"

# @admin.register(CareerPageContent)
# class CareerPageContentAdmin(admin.ModelAdmin):
#     change_form_template = "admin/live_preview_career_form.html"

#     # This ensures you always edit the same object
#     def has_add_permission(self, request):
#         if CareerPageContent.objects.exists():
#             return False
#         return True
    
@admin.register(ContactPageContent)
class ContactPageContentAdmin(admin.ModelAdmin):
    change_form_template = "admin/live_preview_contactus_form.html"

    # This ensures you always edit the same object
    def has_add_permission(self, request):
        if ContactPageContent.objects.exists():
            return False
        return True

    fieldsets = (
        ("Hero Section", {
            "fields": ("hero_title", "hero_description")
        }),
        ("Contact Details", {
            "fields": (
                "call_title", "call_phone", "call_phone_number", "call_subtext",
                "email_title", "email_address", "email_address_link", "email_subtext",
                "visit_title", "visit_address", "visit_subtext", "visit_map_url"
            )
        }),
        ("Support & Form", {
            "fields": (
                "support_title", "support_time", "support_subtext", "form_title",
                "name_label", "name_placeholder", "phone_label", "phone_placeholder",
                "email_label", "email_placeholder", "company_label", "company_placeholder",
                "message_label", "message_placeholder", "form_button_text"
            )
        }),
        ("Why Us & CTA", {
            "fields": (
                "why_title", "why_description", "feature_1_title", "feature_2_title",
                "feature_3_title", "feature_4_title", "cta_title", "cta_description",
                "cta_button_text1", "cta_button_text2", "cta_button_text3"
            )
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how the Contact page appears in search engines."
        }),
    )

@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):

    list_display = ["title", "order", "is_active"]

    list_editable = ["order", "is_active"]

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):

    list_display = ["title", "order", "is_active"]

    list_editable = ["order", "is_active"]

@admin.register(USPFeature)
class USPFeatureAdmin(admin.ModelAdmin):

    list_display = ["title", "order", "is_active"]

    list_editable = ["order", "is_active"]

@admin.register(HowItWorksStep)
class HowItWorksStepAdmin(admin.ModelAdmin):

    list_display = ["step_number", "title", "is_active"]

    list_editable = ["is_active"]

@admin.register(StoreType)
class StoreTypeAdmin(admin.ModelAdmin):

    list_display = ["title", "order", "is_active"]

    list_editable = ["order", "is_active"]

@admin.register(ReferralPerk)
class ReferralPerkAdmin(admin.ModelAdmin):

    list_display = ["value", "text", "order", "is_active"]

    list_editable = ["order", "is_active"]

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):

    list_display = ["name", "role", "rating", "is_active", "order"]

    list_editable = ["rating", "is_active", "order"]

@admin.register(ComparisonFeature)
class ComparisonFeatureAdmin(admin.ModelAdmin):
    list_display = ["feature_name", "has_ai_setu", "has_traditional", "is_active", "order"]
    list_editable = ["has_ai_setu", "has_traditional", "is_active", "order"]
    ordering = ["order"]  

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "is_active", "order"]
    list_editable = ["is_active", "order"]
    ordering = ["order"]
    search_fields = ["question", "answer"]

@admin.register(LoginLink)
class LoginLinkAdmin(admin.ModelAdmin):
    list_display = ["label", "url", "is_active"]
    list_editable = ["is_active"]
    search_fields = ["label"]

@admin.register(DemoVideo)
class DemoVideoAdmin(admin.ModelAdmin):
    list_display = ("title", "video_url", "is_active", "created_at")

@admin.register(AllStoreType)
class AllStoreTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    search_fields = ("name",)
    list_filter = ("is_active",)

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("email", "phone")

class CultureInline(admin.TabularInline):
    model = Culture
    extra = 1


class PerkInline(admin.TabularInline):
    model = Perk
    extra = 1


class JobPositionInline(admin.TabularInline):
    model = JobPosition
    extra = 1


@admin.register(CareerPage)
class CareerPageAdmin(admin.ModelAdmin):
    inlines = [CultureInline, PerkInline, JobPositionInline]

    fieldsets = (
        ("Hero Content", {
            "fields": ("hero_title", "hero_subtitle")
        }),
        ("Section Titles", {
            "fields": ("culture_title", "perks_title")
        }),
        ("CTA Section", {
            "fields": ("cta_title", "cta_subtitle", "cta_button_text")
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how the Careers page appears in search engines."
        }),
    )


class JobDescriptionInline(admin.TabularInline):
    model = JobDescription
    extra = 1


class JobSkillInline(admin.TabularInline):
    model = JobSkill
    extra = 1


class ChildJobPositionInline(admin.StackedInline):

    model = ChildJobPosition
    extra = 1
    

@admin.register(ChildJobPosition)
class ChildJobPositionAdmin(admin.ModelAdmin):

    prepopulated_fields = {"slug": ("title",)}

    inlines = [
        JobDescriptionInline,
        JobSkillInline
    ]

    fieldsets = (
        ("Job Details", {
            "fields": ("career_page", "title", "slug", "location", "experience", "is_active")
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how this specific job listing appears in search engines."
        }),
    )

class SectionItemInline(nested_admin.NestedTabularInline):
    model = SectionItem
    extra = 1


# SECTION inside Page
class SectionInline(nested_admin.NestedStackedInline):
    model = Section
    extra = 1
    inlines = [SectionItemInline]


# PAGE (MAIN)
@admin.register(Page)
class PageAdmin(nested_admin.NestedModelAdmin):
    inlines = [SectionInline]
    prepopulated_fields = {"slug": ("title",)}

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug")
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how this page appears in search engines."
        }),
    )

class PolicySectionInline(admin.TabularInline):
    model = PolicySection
    extra = 1


class PolicyAdmin(admin.ModelAdmin):
    list_display = ["title", "slug"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [PolicySectionInline]

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug", "description")
        }),
        ("SEO Optimization", {
            "fields": ("seo_title", "seo_description", "seo_keywords"),
            "classes": ("collapse",),
            "description": "Customize how this policy page appears in search engines."
        }),
    )


admin.site.register(Policy, PolicyAdmin)

@admin.register(DemoRequestProxy)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = ["name", "contact_number", "store_type", "city"]
    search_fields = ["name", "contact_number", "city"]
    list_filter = ["store_type"]

@admin.register(ContactSubmissionProxy)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "phone", "email", "created_at"]
    search_fields = ["name", "phone", "email"]
    date_hierarchy = "created_at"

@admin.register(JobApplicationProxy)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "job_position", "email", "applied_at"]
    search_fields = ["first_name", "last_name", "email", "phone"]
    list_filter = ["job_position"]
    date_hierarchy = "applied_at"

@admin.register(PricingSignupProxy)
class PricingSignupAdmin(admin.ModelAdmin):
    list_display = ["shop_name", "owner_name", "mobile_number", "referral_code", "created_at"]
    search_fields = ["shop_name", "owner_name", "mobile_number", "referral_code"]
    date_hierarchy = "created_at"

@admin.register(PaymentProxy)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ["transaction_id", "pricing_signup", "amount", "status", "created_at"]
    list_filter = ["status"]
    search_fields = ["transaction_id", "pricing_signup__shop_name"]
    readonly_fields = ["response_data"]
    date_hierarchy = "created_at"