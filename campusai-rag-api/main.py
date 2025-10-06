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

@app.get("/search")
def ask(query: str):
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
     prompt = PromptTemplate(
          input_variables=["query", "rag_context"],
          template="""You are an AI assistant that helps users find information about university programs based on the following context:
          {rag_context} \n\n

          Question: {query}
          context above. If the answer is not contained within the context, respond with "I don't know".
          provide a concise and accurate answer based on the context above
          Answer clearly and concisely:"
          """
     )
      
     #llm = ChatOpenAI(api_key=open_ai_api_key, model="gpt-4o-mini", temperature=0)
     
     llm = ChatOpenAI(   
     model="gpt-4o-mini",
     temperature=0
     )
     
     chain = LLMChain(llm=llm, prompt=prompt)
     summary = chain.run(query=query, rag_context=rag_context)

     return {"query": query, "response": summary}