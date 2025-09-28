# DB + Pinecone settings

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SQL_SERVER: str
    SQL_DATABASE: str
    SQL_USER: str
    SQL_PASSWORD: str
    SQL_PORT: int
    DB_DRIVER: str
    PINECONE_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
