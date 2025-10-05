# CampusAI Data Pipeline

🚀 **CampusAI Data Pipeline** automates data ingestion from SQL databases, transforms the content into embeddings using **SentenceTransformers**, and indexes them in **Pinecone** for efficient AI-powered semantic search.

## 🧠 Features
- Extracts structured data from SQL databases.
- Generates vector embeddings using `sentence-transformers`.
- Stores and manages embeddings in Pinecone.
- Supports incremental updates and batch processing.

## 🧰 Tech Stack
- 🐍 Python 3.10+
- 🧮 SentenceTransformers (MiniLM / Instructor models)
- 🪵 Pinecone Vector DB
- 🗄️ SQLAlchemy / pyodbc
- ⚙️ dotenv for environment configuration

## 📊 Example Workflow
```python
data = fetch_from_sql()
embedding = model.encode(data)
pinecone.upsert(vectors=[(id, embedding, metadata)])

## Setup steps
# Create virtual environment
py -m venv venv

# Activate environment : 
venv\Scripts\activate 