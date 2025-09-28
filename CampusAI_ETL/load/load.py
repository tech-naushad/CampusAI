import os
#from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec   
from config import settings
# -------------------------
# Load environment variables
# -------------------------
#load_dotenv()

#PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
#HF_API_TOKEN = os.getenv("HF_API_TOKEN")
pc = Pinecone(api_key=f"{settings.settings.PINECONE_API_KEY}")
index_name = "campusai-index"

# Create index if it doesn't exist
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,  # MiniLM-L6-v2 embedding size
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

pinecone_index = pc.Index(name=index_name)  # ✅ Correct v3 usage

def load_vectors(vectores):
    """
    Load the transformed data into Pinecone.
    
    Args:
        vectors (list): The list of transformed data with embeddings.
    """
    # Upsert data into Pinecone index
    print("PineCone Processing...")
    pinecone_index.upsert(vectors=vectores)
    print(f"Upserted {len(vectores)} vectors to Pinecone index '{index_name}'")