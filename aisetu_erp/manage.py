import os
import sys
from aisetu_erp.mongodb_patches import disconnect_mongo_migration_signals

def run_frontend_build():
    """
    Runs the React frontend build command (npm run build).
    """
    import subprocess
    from pathlib import Path
    
    # Define paths
    base_dir = Path(__file__).resolve().parent
    frontend_dir = base_dir.parent / 'Frontend' / 'landing-page-launchpad-main'
    
    if not frontend_dir.exists():
        return

    is_windows = sys.platform == 'win32'
    
    print(f"--- AUTOMATED FRONTEND BUILD START ---")
    try:
        if not (frontend_dir / 'node_modules').exists():
            print("Installing node_modules...")
            subprocess.run(['npm', 'install'], cwd=frontend_dir, check=True, shell=is_windows)
            
        print("Running 'npm run build'...")
        subprocess.run(['npm', 'run', 'build'], cwd=frontend_dir, check=True, shell=is_windows)
        print("--- FRONTEND BUILD SUCCESSFUL ---")
        
    except Exception as e:
        print(f"Unexpected error during frontend build: {e}")
    print("---------------------------------------")

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aisetu_erp.settings')
    
    # Rebuild frontend when running server or collecting static files
    if len(sys.argv) > 1 and sys.argv[1] in ['runserver', 'collectstatic']:
        # Only build on the main process (not on auto-reloads)
        if os.environ.get('RUN_MAIN') != 'true':
            run_frontend_build()

    # Apply migration specific fixes
    disconnect_mongo_migration_signals()
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Default port for runserver if not provided
    if len(sys.argv) > 1 and sys.argv[1] == 'runserver':
        if len(sys.argv) == 2 or sys.argv[2].startswith('--'):
            sys.argv.insert(2, '0.0.0.0:5004')
            print(f"Note: Automatically using default address 0.0.0.0:5004")

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
