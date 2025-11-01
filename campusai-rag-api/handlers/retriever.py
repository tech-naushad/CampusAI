from config import Config
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone

class Retriever:
    def __init__(self, config: Config):
        self.model = SentenceTransformer(config.model_name)
        self.pinecone = Pinecone(api_key=config.pinecone_api_key)
        self.pinecone_index = config.pinecone_index
        print("Retriever called with index:", self.pinecone_index)
        
        if self.pinecone_index is None:
            raise ValueError("PINECONE_INDEX is not set in configuration.")
        self.index = self.pinecone.Index(self.pinecone_index)

    def invoke(self, query: str) -> str:
        # Implement retrieval logic here
        query_embedding = self.model.encode([query])[0].tolist()

        results = self.index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )
        context_chunks = []
        matches_list = getattr(results, 'matches', [])
        for match in matches_list:            
            metadata = match["metadata"]
            if "text_content" in metadata:
                context_chunks.append(metadata["text_content"])
                    
        
        rag_context = "\n\n".join(context_chunks) 
        return rag_context