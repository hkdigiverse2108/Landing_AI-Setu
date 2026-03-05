from django.contrib import admin
from .models import Policy

# Register your models here.
@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = ['title', 'last_updated']