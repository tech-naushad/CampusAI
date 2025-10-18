from fastapi import FastAPI,Query
from typing import List
from langchain_openai import ChatOpenAI
from pinecone import Pinecone
from pydantic import SecretStr
from sentence_transformers import SentenceTransformer
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv
import re
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# Setup environment variables for Pinecone
load_dotenv()

# = os.getenv("OPENAI_API_KEY")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
pinecone_index = os.getenv("PINECONE_INDEX")
if pinecone_index is None:
    raise ValueError("Environment variable 'PINECONE_INDEX' is not set.")
index = pc.Index(pinecone_index)

open_ai_api_key = os.getenv("OPENAI_API_KEY")
if open_ai_api_key is None:
    raise ValueError("Environment variable 'OPENAI_API_KEY' is not set.")

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


app = FastAPI(title="CampusAI API", version="1.0")
origins = [
    "http://localhost:5173",  # Add this for your Vite frontend  
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Query filter: block known conversational/non-domain queries up front
def is_domain_query(query: str) -> bool:
    greetings = ['hello', 'hi', 'hey', 'greetings', 'how are you']
    return not any(greet in query.lower() for greet in greetings)

def remove_code_fences(text: str) -> str:
    # Remove opening code fence including optional language, and any closing code fence
    text = re.sub(r"^```[a-zA-Z]*\n", "", text)  # Opening, at the start of string
    text = re.sub(r"```$", "", text)               # Closing, at the end of string
    text = text.replace("```", "")
    return text.strip()
    
 
@app.get("/search")
async def ask(query: str):
     #embedding = model.encode([query]).tolist()
     query_embedding = model.encode([query])[0].tolist()
     
     #result = index.query(vector=query_embedding , top_k=5, include_metadata=True)
     result = index.query(
        vector=query_embedding,
        top_k=5,
        include_metadata=True
    )
    # Step 2: Pass matches to LLM chain
     context_chunks = []
     matches_list = getattr(result, 'matches', [])
     for match in matches_list:
          
          metadata = match["metadata"]
          if "text_content" in metadata:
            context_chunks.append(metadata["text_content"])
                  
     
     rag_context = "\n\n".join(context_chunks) 
    # If context is empty, return immediately
     if not rag_context.strip():
      return HTMLResponse('<html>I don\'t know</html>', status_code=200)
     
     prompt = PromptTemplate(
         input_variables=["query", "rag_context"],
         template="""You are an AI assistant that helps users find information about university programs based on the following context:
         {rag_context} \n\n
         Question: {query}
        
        Instructions:
            - ONLY use information found in rag_context. NEVER invent, guess, or add program names or details not in context.
            - If there is no answer in the context, output ONLY <html>I don't know</html>.
            - If programs matching the question exist in rag_context, output EACH as a valid HTML card as shown below, all wrapped in a single <html>...</html> block:
        
        <html>
        <div style="border:1px solid #d3d3d3; border-radius:5px; padding:14px; margin-bottom:16px;">
        <strong>Program Name:</strong> ...
        <!-- More info fields as needed -->
        </div>
        <!-- Repeat for each matched record -->
        </html>

        DO NOT output any markdown, triple backticks, or plain text. Only valid HTML.
        
        """
     )
     # Render the prompt string directly
     prompt_str = prompt.format(query=query, rag_context=rag_context) 
    
     
     llm = ChatOpenAI(   
        model="gpt-4o-mini",
        temperature=0,
        streaming = True
     )
     
     #chain = LLMChain(llm=llm, prompt=prompt)
     #summary = chain.run(query=query, rag_context=rag_context)
     from typing import AsyncGenerator

     async def llm_stream() -> AsyncGenerator[str, None]:
         async for token in llm.astream(prompt_str):
             if hasattr(token, 'content'):
                 # If token is a Message type
                 chunk = token.content
             else:
                 chunk = str(token)
             yield str(chunk)  # Ensure only strings are yielded

     headers = {
         "Cache-Control": "no-cache",
         "Content-Type": "text/html; charset=utf-8",
         "Transfer-Encoding": "chunked",
         "X-Accel-Buffering": "no"  # disables buffering in nginx if used
     }
     return StreamingResponse(llm_stream(), media_type="text/html", headers=headers)
    