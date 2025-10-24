
from langchain_openai import ChatOpenAI

class ModelHelper:
    def __init__(self, model_name: str = "gpt-4o-mini", temperature: float = 0.0):
        self.model_name = model_name
        self.temperature = temperature

    def init(self):
        llm = ChatOpenAI(
            model=self.model_name,
            temperature=self.temperature,
            streaming=True
        )
        return llm
    

 