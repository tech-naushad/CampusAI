from fastapi import FastAPI, Request
from fastapi.concurrency import asynccontextmanager
from fastapi.responses import HTMLResponse
from api_requests.query_request import QueryRequest
from config import Config
from middlewares.middleware_cors import add_cors_middleware
from handlers.response import ResponseHandler
from handlers.retriever import Retriever
from handlers.prompter import Prompter
from handlers.model import ModelHelper

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize heavy objects
    app.state.config = Config()
    app.state.retriever = Retriever(app.state.config)
    app.state.prompter = Prompter()
    app.state.model_helper = ModelHelper(app.state.config)

     # Initialize LLM once at startup
    app.state.llm = app.state.model_helper.invoke()
    print("Startup completed")
    yield
    print("Shutdown cleanup")

app = FastAPI(title="CampusAI API", 
              description="API for question answering using retriever + CampusAI",
              version="1.0.0",
              lifespan=lifespan)

add_cors_middleware(app)      

 # once at startup

@app.post("/search", response_description="The CampusAI response to the students query")
async def search(request: QueryRequest, app_request: Request): 
     # Safely access app.state objects
     retriever = getattr(app_request.app.state, "retriever", None)
     prompter = getattr(app_request.app.state, "prompter", None)
     model_helper = getattr(app_request.app.state, "model_helper", None)

     # If any component is not initialized (e.g. before startup completed), return 503
     if retriever is None or prompter is None or model_helper is None:
      return HTMLResponse('<html>Service Unavailable</html>', status_code=503)

    # If context is empty, return immediately
     context = retriever.invoke(request.query)
     if not context or not str(context).strip():
      return HTMLResponse('<html>I don\'t know</html>', status_code=200)     
        
     prompt_str = prompter.invoke(request.query, context)
     
     #llm = model_helper.invoke()
     llm = app_request.app.state.llm

     response_handler = ResponseHandler(llm)
     return response_handler.invoke(
         prompt_str=prompt_str
     )

