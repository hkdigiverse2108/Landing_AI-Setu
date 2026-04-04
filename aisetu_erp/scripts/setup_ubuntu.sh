#!/bin/bash

# Ubuntu Setup Script for AI-Setu
# Run this once on your Hostinger server to prepare the environment

echo "--- Ubuntu Environment Setup ---"

# 1. Update System
sudo apt update

# 2. Install Node.js and npm (if not present)
if ! command -v npm &> /dev/null
then
    echo "Installing Node.js and npm..."
    sudo apt install -y nodejs npm
else
    echo "Node.js and npm already installed."
fi

# 3. Ensure frontend dependencies are installed
echo "Installing frontend dependencies..."
cd ../Frontend/landing-page-launchpad-main
npm install

# 4. Return to aisetu_erp folder
cd ../../aisetu_erp

# 5. Fix permissions (optional but recommended)
echo "Fixing permissions..."
chmod +x manage.py

echo "--- Setup Complete ---"
echo "You can now run: python3 manage.py runserver 0.0.0.0:5004"
