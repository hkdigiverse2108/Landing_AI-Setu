import pymongo
import sys
import os

# Database configurations
SOURCE_URI = "mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/aisetu_db?retryWrites=true&w=majority&appName=Cluster0"
TARGET_URI = "mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/aisetu_db_razorpay?retryWrites=true&w=majority&appName=Cluster0"

def migrate_data():
    try:
        # Create clients
        source_client = pymongo.MongoClient(SOURCE_URI)
        target_client = pymongo.MongoClient(TARGET_URI)
        
        # Select databases
        source_db = source_client["aisetu_db"]
        target_db = target_client["aisetu_db_razorpay"]
        
        print(f"--- DATABASE MIGRATION STARTED ---")
        print(f"Source: {source_db.name}")
        print(f"Target: {target_db.name}")
        
        # List all collections in the source database
        collections = source_db.list_collection_names()
        print(f"Found {len(collections)} collections to migrate.")
        
        for collection_name in collections:
            # Skip system collections if any
            if collection_name.startswith("system."):
                continue
                
            print(f"Migrating collection: {collection_name}...", end=" ", flush=True)
            
            # 1. Fetch all documents from source
            source_collection = source_db[collection_name]
            documents = list(source_collection.find())
            
            # 2. Drop the target collection to overwrite
            target_collection = target_db[collection_name]
            target_collection.drop()
            
            # 3. Batch insert if documents exist
            if documents:
                # MongoDB bulk operations can be faster for very large collections,
                # but for this scale, direct insert_many is fine.
                target_collection.insert_many(documents)
                print(f"Done ({len(documents)} records)")
            else:
                print("Skipped (Empty)")

        # --- DATA ENRICHMENT: Ensure gateway defaults for Payment records ---
        print("\n--- ENRICHING PAYMENT DATA ---")
        # Django MongoDB backend prefix for the model in 'website' app
        payment_collection_name = "website_payment" 
        
        if payment_collection_name in collections:
            payment_collection = target_db[payment_collection_name]
            
            # Update all existing records that don't have a 'gateway' field
            result = payment_collection.update_many(
                {"gateway": {"$exists": False}},
                {"$set": {"gateway": "PHONEPE"}}
            )
            print(f"Updated {result.modified_count} old payment records to use 'PHONEPE' as the default gateway.")
        else:
            print(f"Warning: {payment_collection_name} not found, skipping enrichment.")

        print("\n--- MIGRATION COMPLETED SUCCESSFULLY ---")
        
    except Exception as e:
        print(f"\nCRITICAL ERROR: {str(e)}")
        sys.exit(1)
    finally:
        source_client.close()
        target_client.close()

if __name__ == "__main__":
    migrate_data()
