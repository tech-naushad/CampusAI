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
            
            Instructions:
                - ONLY use information found in context. NEVER invent, guess, or add program names or details not in context.
                - If there is no answer in the context, output ONLY <html>I don't know</html>.
                - If programs matching the question exist in context, output EACH as a valid HTML card as shown below, all wrapped in a single <html>...</html> block:
            
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

        # ✅ Use 'context' not 'rag_context'
        prompt_str = prompt.format(query=query, context=context)
        return prompt_str
