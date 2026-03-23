from .mongodb_patches import apply_mongodb_patches

# Apply MongoDB patches automatically when the project is loaded
# This ensures they apply for both development and production (Gunicorn)
apply_mongodb_patches()
