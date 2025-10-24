from typing import AsyncGenerator
from fastapi.responses import HTMLResponse, StreamingResponse

class ResponseHandler:
    def __init__(self, llm):
        self.llm = llm

    def invoke(self, prompt_str: str) -> StreamingResponse:
        async def llm_stream() -> AsyncGenerator[str, None]:
            async for token in self.llm.astream(prompt_str):
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