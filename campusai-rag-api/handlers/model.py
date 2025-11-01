
from langchain_openai import ChatOpenAI,AzureChatOpenAI
from openai import OpenAI
from pydantic import SecretStr
from config import Config
 

class ModelHelper:
    def __init__(self, config: Config):
        self.config = config

    def invoke(self):
        # llm = ChatOpenAI(
        #     model=self.model_name,
        #     temperature=self.temperature,
        #     streaming=True
        if self.config.azure_openai_key is None:
            raise ValueError("azure_openai_key must be set in the config before invoking the model")
        llm = AzureChatOpenAI(
            azure_deployment=self.config.azure_openai_deployment,
            azure_endpoint=self.config.azure_openai_endpoint,
            api_key=SecretStr(self.config.azure_openai_key),             
            temperature=1.0,
            api_version="2024-12-01-preview",            
            streaming=True
        )
       
        return llm
    

 