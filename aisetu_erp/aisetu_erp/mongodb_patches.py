import os
import sys

def apply_mongodb_patches():
    """
    Apply various patches for MongoDB compatibility.
    """
    # 1. Patch bulk_create to handle missing PKs in returned objects
    try:
        from django.db.models.query import QuerySet
        original_bulk_create = QuerySet.bulk_create
        
        def patched_bulk_create(self, objs, batch_size=None, ignore_conflicts=False, update_conflicts=False, update_fields=None, unique_fields=None):
            returned_objs = original_bulk_create(
                self, objs, batch_size=batch_size, ignore_conflicts=ignore_conflicts, 
                update_conflicts=update_conflicts, update_fields=update_fields, unique_fields=unique_fields
            )
            
            from django.conf import settings
            try:
                # Check if we are using MongoDB
                if settings.DATABASES['default']['ENGINE'] == 'django_mongodb_backend':
                    pk_field = self.model._meta.pk.attname
                    for obj in returned_objs:
                        if getattr(obj, pk_field, None) is None:
                            # Special handling for ContentType and Permission (common issues)
                            if self.model.__name__ == 'ContentType':
                                db_obj = self.model.objects.filter(app_label=obj.app_label, model=obj.model).first()
                                if db_obj:
                                    setattr(obj, pk_field, getattr(db_obj, pk_field))
                            elif self.model.__name__ == 'Permission':
                                db_obj = self.model.objects.filter(content_type=obj.content_type, codename=obj.codename).first()
                                if db_obj:
                                    setattr(obj, pk_field, getattr(db_obj, pk_field))
            except Exception:
                pass
            return returned_objs
        
        QuerySet.bulk_create = patched_bulk_create
    except ImportError:
        pass

    # 2. Patch Model.__hash__ to avoid 'unhashable TypeError' when PK is None
    try:
        from django.db.models import Model
        def patched_hash(self):
            if self.pk is None:
                return id(self)
            return hash(self.pk)
        Model.__hash__ = patched_hash
    except ImportError:
        pass

def disconnect_mongo_migration_signals():
    """
    Disconnect signals that cause issues during MongoDB migrations.
    """
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'migrate':
        try:
            import django
            django.setup()
            from django.db.models.signals import post_migrate
            from django.contrib.auth.management import create_permissions
            post_migrate.disconnect(
                receiver=create_permissions,
                dispatch_uid="django.contrib.auth.management.create_permissions"
            )
            print("Note: Disabled auth.create_permissions post_migrate signal for MongoDB compatibility.")
        except Exception as e:
            print(f"Warning: Could not disconnect post_migrate signal: {e}")
