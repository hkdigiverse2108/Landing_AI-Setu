import os
import django
import sys

# Setup Django environment
sys.path.append(r'c:\Users\HP\Downloads\Landing_AI-Setu\aisetu_erp')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aisetu_erp.settings')
django.setup()

from website.models import Policy, PolicySection

def migrate_policies():
    policies = Policy.objects.all()
    print(f"Starting migration for {policies.count()} policies...")

    for policy in policies:
        sections = policy.sections.all().order_by('order')
        if not sections.exists():
            print(f"Skipping '{policy.title}' - no sections found.")
            continue

        print(f"Migrating '{policy.title}' ({sections.count()} sections)...")
        
        # Build merged content
        merged_html = policy.description or ""
        if merged_html and not merged_html.endswith('<br>') and not merged_html.endswith('</p>'):
            merged_html += "<br><br>"

        for sec in sections:
            section_html = f"<h3>{sec.heading}</h3>"
            section_html += f"<div>{sec.content}</div><br>"
            merged_html += section_html

        # Update policy
        policy.description = merged_html
        policy.save()
        print(f"Successfully updated '{policy.title}'.")

    print("Migration complete!")

if __name__ == "__main__":
    migrate_policies()
