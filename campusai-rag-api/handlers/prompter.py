from langchain.prompts import PromptTemplate

class Prompter:
    def __init__(self):
        pass

    def invoke(self, query: str, context: str) -> str:
        prompt = PromptTemplate(
            input_variables=["query", "context"],
            template="""
            You are an AI assistant that helps users find information about university programs based on the following context:
            {context}

            Question: {query}
            
           INSTRUCTIONS:
            - ONLY use facts found in the context above.
            - DO NOT invent or infer details not explicitly mentioned.
            - If no relevant information exists, respond exactly with: <html>I don't know</html>.
            - Output each matched program in the following HTML format (wrapped in one <html>...</html> block):

            
            <html>
            <div style="margin-bottom: 16px;width: 100%; padding: 12px; border: 1px solid #E5E7EB; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); background-color: #F9FAFB;">
                <strong>Program Name:</strong> ...
                <!-- More info fields as needed -->
                <hr style="margin: 12px 0; border-color: #D1D5DB;" />
            </div>
            <!-- Repeat for each matched record -->
            </html>
            REMEMBER:
            - Do not use markdown, triple backticks, or plain text.
            - Never generate content not present in the context.
            """
        )

        # ✅ Use 'context' not 'rag_context'
        prompt_str = prompt.format(query=query, context=context)
        return prompt_str
