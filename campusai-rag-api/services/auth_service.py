
import httpx
from settings.azure_settings import AzureSettings


class AuthService:
    def __init__(self):
        self.settings = AzureSettings()

    async def get_access_token(self) -> dict:
        if not self.settings.azure_token_url:
            raise ValueError("azure_token_url is not configured")
        
        payload = {
            "client_id": self.settings.azure_client_id,
            "client_secret": self.settings.azure_client_secret,
            "scope": self.settings.azure_scope,
            "grant_type": self.settings.azure_grant_type,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.settings.azure_token_url, data=payload)
            response.raise_for_status()
            return response.json()
