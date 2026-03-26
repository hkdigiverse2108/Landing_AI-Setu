import hashlib, binascii, os
from pymongo import MongoClient

# Generate hash for 'admin'
salt = b'salt1234'
dk = hashlib.pbkdf2_hmac('sha256', b'admin', salt, 390000)
password_hash = f'pbkdf2_sha256$390000${binascii.hexlify(salt).decode()}${binascii.hexlify(dk).decode()}'

# Connect to MongoDB
uri = "mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/aisetu_db?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client['aisetu_db']
collection = db['auth_user']

# Update password for user 'hp'
result = collection.update_one({'username': 'hp'}, {'$set': {'password': password_hash}})

if result.matched_count > 0:
    print('Password for user hp reset successfully via direct Mongo update')
else:
    print('User hp not found in auth_user collection')
client.close()
