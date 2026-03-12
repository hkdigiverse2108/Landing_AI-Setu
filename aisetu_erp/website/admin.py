from django.contrib import admin
from .models import LandingPageContent

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
