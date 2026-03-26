import os
import django
from django.conf import settings
from django.template import loader, TemplateDoesNotExist

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aisetu_erp.settings')
django.setup()

print("--- Django Template Search Diagnostic ---")
print(f"BASE_DIR: {settings.BASE_DIR}")
print(f"TEMPLATES DIRS: {settings.TEMPLATES[0]['DIRS']}")

template_name = "index.html"
try:
    template = loader.get_template(template_name)
    print(f"SUCCESS: Template '{template_name}' found at: {template.origin.name}")
except TemplateDoesNotExist:
    print(f"FAILED: Template '{template_name}' not found.")
    
    # List files in the directories Django is supposed to look in
    for d in settings.TEMPLATES[0]['DIRS']:
        print(f"\nChecking directory: {d}")
        if os.path.exists(d):
            print(f"Directory exists. Contents: {os.listdir(d)}")
        else:
            print("Directory DOES NOT exist.")
