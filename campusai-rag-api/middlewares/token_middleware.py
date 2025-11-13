from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from jose import jwt
import requests
from settings.azure_settings import AzureSettings

class TokenMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.azure_settings = AzureSettings()

        self.allow_anonymous_paths =[
            "/auth/token",
            "/docs",
            "/openapi.json"
        ]

    async def dispatch(self, request: Request, call_next):
        
        path = request.url.path.lower()
        if any(path.startswith(p) for p in self.allow_anonymous_paths):
           # print("allow_anonymous_paths token...")
            response = await call_next(request)
            return response
        
        auth_header = request.headers.get("Authorization")
        if auth_header is None or not auth_header.startswith("Bearer "):
            return Response("Unauthorized", status_code=401)

        token = auth_header.split(" ")[1]
        if not self.validate_token(token):
            return Response("Unauthorized", status_code=401)

        response = await call_next(request)
        return response

    def validate_token(self, token: str) -> bool:
        try:
            # Decode the token without verification to get the tenant ID
            print("Validating token...")
            unverified_header = jwt.get_unverified_header(token)
            unverified_claims = jwt.get_unverified_claims(token)
            tenant_id = unverified_claims.get("tid")

            # Fetch the public keys from Azure AD
            jwks_url = f"https://login.microsoftonline.com/{self.azure_settings.azure_tenant_id}/discovery/v2.0/keys"
            jwks_response = requests.get(jwks_url)
            jwks = jwks_response.json()

            # Verify the token
            jwt.decode(
                token,
                jwks,
                algorithms=unverified_header["alg"],
                audience=self.azure_settings.azure_audience,
                issuer=f"https://sts.windows.net/{tenant_id}/"
            )
            return True
        except Exception as e:
            print(f"Token validation error: {e}")
            return False