import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aisetu_erp.settings')
django.setup()

from django.contrib.auth.models import User
try:
    # Delete if exists
    User.objects.filter(username='admin_new').delete()
    # Create fresh
    User.objects.create_superuser('admin_new', 'admin@example.com', 'admin123')
    print('Superuser admin_new created successfully with password admin123')
except Exception as e:
    print(f'Error creating superuser: {e}')
