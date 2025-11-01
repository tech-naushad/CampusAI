from pydantic import BaseModel, Field

class QueryRequest(BaseModel):
    message_id: str = Field(..., title="Message ID", description="A unique identifier for the message") 
    query: str = Field(..., title="Query", description="The user question to search and get a response for")
    sender: str = Field(..., title="Sender", description="The identifier of the user sending the query")
    timestamp: str = Field(..., title="Timestamp", description="The time when the query was sent")