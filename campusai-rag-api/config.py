import os
from dotenv import load_dotenv
class Config:
    def __init__(self):
        load_dotenv()
        self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.pinecone_index = os.getenv("PINECONE_INDEX")
        self.open_ai_api_key = os.getenv("OPENAI_API_KEY")
        self.model_name = os.getenv("MODEL_NAME")
        self.validate()

    def validate(self):
        if self.pinecone_index is None:
            raise ValueError("Environment variable 'PINECONE_INDEX' is not set.")
        if self.open_ai_api_key is None:
            raise ValueError("Environment variable 'OPENAI_API_KEY' is not set.")
        if self.model_name is None:
            raise ValueError("Environment variable 'MODEL_NAME' is not set.")
        if self.pinecone_api_key is None:
            raise ValueError("Environment variable 'PINECONE_API_KEY' is not set.")
        