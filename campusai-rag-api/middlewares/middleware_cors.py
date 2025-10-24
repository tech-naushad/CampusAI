from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # Add this for your Vite frontend  
    "http://127.0.0.1:5173"
]

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )