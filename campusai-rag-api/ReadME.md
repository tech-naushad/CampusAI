# CampusAI RAG API 🚀

[![GitHub](https://img.shields.io/badge/GitHub-CampusAI-blue?logo=github)](https://github.com/tech-naushad/CampusAI/tree/main/campusai-rag-api)

**CampusAI RAG API** is a real-time AI service built by **Me** that delivers **intelligent, context-aware responses** from Azure OpenAI models (GPT-5 Mini and others) to web and mobile applications. By combining **Retrieval-Augmented Generation (RAG)** with **streaming LLM outputs**, this API enables interactive, AI-powered experiences for modern applications.

---

## 🌟 Key Features

- **Azure Foundry Integration:** Connects with GPT-5 Mini and other LLMs for advanced AI responses.
- **Streaming Responses:** Send partial LLM outputs directly to React or any client in real-time.
- **RAG Architecture:** Retrieves domain-specific knowledge to improve answer accuracy.
- **Modular & Extensible:** Easily add new models, retrievers, or response handlers.
- **Client-Agnostic:** Works seamlessly with React, Next.js, Angular, or mobile apps.

---

## 🛠 Technology Stack

- **Backend:** FastAPI (Python)
- **AI Models:** Azure OpenAI Foundry (GPT-5 Mini)
- **Streaming Support:** Async streaming for real-time LLM responses
- **Frontend Integration:** React.js / Any HTTP client
- **Other Libraries:** Pydantic, HTTPX, AsyncIO

---

## 📈 Project Impact

- **Business-Ready AI:** Enhances chatbots, customer support, educational assistants, and intelligent search systems.
- **Performance-Oriented:** Real-time streaming reduces latency and improves user engagement.
- **Scalable Architecture:** Designed for production-grade deployment and fast integration with client apps.
- **Showcases Expertise:** Demonstrates strong skills in AI integration, backend design, and modular software architecture.

---

## 🚀 Installation & Usage

1. Clone the repository:

```bash
git clone https://github.com/tech-naushad/CampusAI.git
cd campusai-rag-api
pip install -r requirements.txt

2. Configure Azure OpenAI credentials in config.py:

open_ai_endpoint = "<your_azure_openai_endpoint>"
open_ai_key = "<your_api_key>"

3. Start the API:

uvicorn main:app --reload

4. Connect your React or other client:

const response = await fetch("/api/stream", {
  method: "POST",
  body: JSON.stringify({ query: "Hello AI!" })
});

📂 Project Structure
campusai-rag-api/
│
├─ api_requests/       # API request schemas
├─ handlers/           # LLM, Prompter, Retriever logic
├─ middlewares/        # CORS and other middleware
├─ config.py           # Azure OpenAI configuration
└─ main.py             # FastAPI application entry point

💡 Business & Use Cases

AI-driven chatbots for education, enterprise, and customer support

Smart search and Q&A systems

Interactive learning platforms

Real-time AI assistants for web and mobile

⭐ Star this repository if you find it useful!


This version **speaks to both technical leads and HR**:

- HR sees **business impact, your role, and value to the company**.
- Tech leads see **architecture, models, streaming design, and project structure**.

---

If you want, I can also **add a small visual diagram** showing the **RAG + streaming flow** for even stronger impact—it often grabs attention in GitHub repos and resumes.  

Do you want me to create that diagram?
