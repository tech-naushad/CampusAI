from sentence_transformers import SentenceTransformer

def invoke(records):
    """
    Transform the extracted data as needed.
    
    Args:
        records (list): The list of records extracted from the database.
        
    Returns:
        list: The transformed data.
    """
    # Example transformation: Convert all string fields to uppercase
    
    transformed = []
    for record in records:
        text_to_embed = f"{record.program_name or ''} {record.description or ''} {record.admission_requirements or ''}"
        embedding = create_embedding(text_to_embed)
        transformed.append({
            "id": str(record.program_id),
            "values": embedding,
            "metadata": {
                "program_code": record.program_code,
                "program_name": record.program_name,
                "division_name": record.division_name,
                "degree_level": record.level_name,
                "description": record.description,
            }
        })       
    
    return transformed

def create_embedding(text: str):
    """
    Create embeddings for the transformed data.
    
    Args:
        text (str): The text to create an embedding for.

    Returns:
        list: The created embedding.
    """
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embedding = model.encode(text, show_progress_bar=False)  # pass text, not [text]
    return embedding.tolist()  # 1D list of floats