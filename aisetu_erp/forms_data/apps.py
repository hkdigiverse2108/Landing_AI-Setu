from django.apps import AppConfig

class FormsDataConfig(AppConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
    name = 'forms_data'
    verbose_name = 'Forms Data'
