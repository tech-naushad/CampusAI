from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config import Config
from middlewares.middleware_cors import add_cors_middleware
from response_handler import ResponseHandler
from retriever import Retriever
from prompter import Prompter
from model_helper import ModelHelper

#Setup configuration and components
config = Config()
retriever = Retriever(config)
prompter = Prompter()
model_helper = ModelHelper()

app = FastAPI(title="CampusAI API", version="1.0")
add_cors_middleware(app) 
 
@app.get("/search")
async def ask(query: str):   
    # If context is empty, return immediately
     context = retriever.invoke(query)
     if not context.strip():
      return HTMLResponse('<html>I don\'t know</html>', status_code=200)     
        
     prompt_str = prompter.invoke(query, context)
     
     llm = model_helper.init()

     response_handler = ResponseHandler(llm)
     return response_handler.invoke(prompt_str)
   
       