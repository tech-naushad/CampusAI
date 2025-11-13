import os
from dotenv import load_dotenv

class AzureSettings:
    def __init__(self):
        load_dotenv()
        self.azure_tenant_id = os.getenv("AZURE_TENANT_ID")
        self.azure_client_id = os.getenv("AZURE_CLIENT_ID")
        self.azure_client_secret = os.getenv("AZURE_CLIENT_SECRET")
        self.azure_scope = os.getenv("AZURE_SCOPE")
        self.azure_grant_type = os.getenv("AZURE_GRANT_TYPE")
        self.azure_token_url = os.getenv("AZURE_TOKEN_URL")
        self.azure_audience = os.getenv("AZURE_AUDIENCE")
        self.validate()
    def validate(self):
        if self.azure_tenant_id is None:
            raise ValueError("Environment variable 'AZURE_TENANT_ID' is not set.")
        if self.azure_client_id is None:
            raise ValueError("Environment variable 'AZURE_CLIENT_ID' is not set.")
        if self.azure_client_secret is None:
            raise ValueError("Environment variable 'AZURE_CLIENT_SECRET' is not set.")
        if self.azure_scope is None:
            raise ValueError("Environment variable 'AZURE_SCOPE' is not set.")
        if self.azure_grant_type is None:
            raise ValueError("Environment variable 'AZURE_GRANT_TYPE' is not set.")
        if self.azure_token_url is None:
            raise ValueError("Environment variable 'AZURE_TOKEN_URL' is not set.")
        if self.azure_audience is None:
            raise ValueError("Environment variable 'AZURE_AUDIENCE' is not set.")