# 🎓 CampusAI

> An end-to-end AI-powered campus assistant that transforms academic data into intelligent answers — built with Python, FastAPI, Pinecone, and React.js.

---

## 🧠 Overview

**CampusAI** is a modular system designed to help universities and students interact with academic data intelligently.  
It consists of three core components:

| Module | Tech Stack | Description |
|--------|-------------|--------------|
| 🧩 **Data Pipeline** | Python, SentenceTransformers, Pinecone | Extracts data from SQL, generates embeddings, and stores them in Pinecone. |
| ⚡ **RAG API** | FastAPI, Pinecone, OpenAI | Backend for context retrieval and response generation. |
| 💬 **Chatbot UI** | React.js, TailwindCSS | Frontend chatbot interface for students and admins. |

---

## 🏗️ Project Structure

campusai/
├── campusai-data-pipeline/ # SQL → Embeddings → Pinecone
├── campusai-rag-api/ # FastAPI backend for retrieval & generation
├── campusai-chatbot-ui/ # React frontend chatbot


---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|---------------|
| Backend | Python, FastAPI, LangChain, OpenAI API, Pinecone |
| Data | SQL, SentenceTransformers, dotenv |
| Frontend | React.js, TailwindCSS, Axios |
| Deployment | Docker, GitHub Actions (optional) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/xxxx/campusai.git
cd campusai

2️⃣ Set Up Each Component

Each folder contains its own README.md with setup steps:

Data Pipeline: cd campusai-data-pipeline && python main.py

Backend API: cd campusai-rag-api && uvicorn main:app --reload

Frontend: cd campusai-chatbot-ui && npm run dev

SQL Database ──▶ Data Pipeline ──▶ Pinecone DB
                                    │
                                    ▼
                         RAG API (FastAPI + LLM)
                                    │
                                    ▼
                        Chatbot UI (React + Tailwind)
 
