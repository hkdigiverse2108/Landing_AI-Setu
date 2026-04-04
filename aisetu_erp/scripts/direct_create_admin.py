import hashlib, binascii, os
from pymongo import MongoClient
from datetime import datetime

# Generate hash for 'admin123'
salt = b'salt_admin_new'
dk = hashlib.pbkdf2_hmac('sha256', b'admin123', salt, 390000)
password_hash = f'pbkdf2_sha256$390000${binascii.hexlify(salt).decode()}${binascii.hexlify(dk).decode()}'

# Connect to MongoDB
uri = "mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/aisetu_db?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client['aisetu_db']
collection = db['auth_user']

# Create or Update User 'admin_new'
# Note: Django's auth_user has many fields. We set the essentials.
user_data = {
    'password': password_hash,
    'last_login': datetime.now(),
    'is_superuser': True,
    'username': 'admin_new',
    'first_name': 'Admin',
    'last_name': 'New',
    'email': 'admin@example.com',
    'is_staff': True,
    'is_active': True,
    'date_joined': datetime.now()
}

# Delete existing to be safe
collection.delete_one({'username': 'admin_new'})
# Insert new
result = collection.insert_one(user_data)

if result.inserted_id:
    print(f'Superuser admin_new created successfully via direct Mongo insert with ID: {result.inserted_id}')
else:
    print('Failed to create superuser admin_new')

client.close()
