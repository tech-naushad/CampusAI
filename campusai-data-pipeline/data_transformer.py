from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def invoke(data):
    """
    Transform the extracted data as needed.
    
    Args:
        records (list): The list of records extracted from the database.
        
    Returns:
        list: The transformed data.
    """
    # Example transformation: Convert all string fields to uppercase
    
    transformed = []
    for record in data:
        context_text = prepare_context_text(record)   #f"{record.program_name or ''} {record.description or ''} {record.admission_requirements or ''}"
        embedding = create_embedding(context_text)

        transformed.append({
            "id": str(record.program_id),
            "values": embedding,
            "metadata": {
                "program_code": str(record.program_code),
                "program_name": str(record.program_name),
                "program_name_ar": str(record.program_name_ar),
                "duration_years": str(record.duration_years),
                "total_credit_hours": str(record.total_credit_hours),
                "description": str(record.description),
                "description_ar": str(record.description_ar),
                "admission_requirements": str(record.admission_requirements),
                "career_opportunities": str(record.career_opportunities),
                "learning_outcomes": str(record.learning_outcomes),
                "program_is_active": str(record.program_is_active),
                "accreditation_body": str(record.accreditation_body),
                "accreditation_status": str(record.accreditation_status),
                "campus_availability": str(record.campus_availability),
                "program_created_at": str(record.program_created_at),
                "program_updated_at": str(record.program_updated_at),

                # === Division Fields ===
                "division_id": str(record.division_id),
                "division_code": str(record.division_code),
                "division_name": str(record.division_name),
                "division_description": str(record.division_description),
                "division_is_active": str(record.division_is_active),
                "division_created_at": str(record.division_created_at),
                "division_updated_at": str(record.division_updated_at),

                # === Degree Level Fields ===
                "degree_level_id": str(record.degree_level_id),
                "level_code": str(record.level_code),
                "level_name": str(record.level_name),
                "degree_duration": str(record.degree_duration),
                "credit_hours_min": str(record.credit_hours_min),
                "credit_hours_max": str(record.credit_hours_max),
                "degree_description": str(record.degree_description),
                "degree_is_active": str(record.degree_is_active),
                "degree_created_at": str(record.degree_created_at),
                
                "text_content": context_text
            }
        })       
    
    return transformed

def prepare_context_text(row):
    # 1. Create the full text context for RAG
    context_text = (
        f"Program Name: {row.program_name} | "
        f"Program Name (AR): {row.program_name_ar} | "
        f"Duration (Years): {row.duration_years} | "
        f"Total Credit Hours: {row.total_credit_hours} | "
        f"Description: {row.description} | "
        f"Description (AR): {row.description_ar} | "
        f"Admission Requirements: {row.admission_requirements} | "
        f"Career Opportunities: {row.career_opportunities} | "
        f"Learning Outcomes: {row.learning_outcomes} | "
        f"Program Active: {row.program_is_active} | "
        f"Accreditation Body: {row.accreditation_body} | "
        f"Accreditation Status: {row.accreditation_status} | "
        f"Campus Availability: {row.campus_availability} | "
        f"Division Name: {row.division_name} | "
        f"Division Code: {row.division_code} | "
        f"Degree Level Name: {row.level_name} | "
        f"Degree Level Code: {row.level_code} | "
        f"Degree Duration: {row.degree_duration} | "
        f"Credit Hours Min: {row.credit_hours_min} | "
        f"Credit Hours Max: {row.credit_hours_max} | "
        f"Degree Description: {row.degree_description} | "
        f"Degree Active: {row.degree_is_active}"
    )
    return context_text

def create_embedding(context_text: str):
    """
    Create embeddings for the transformed data.
    
    Args:
        text (str): The text to create an embedding for.

    Returns:
        list: The created embedding.
    """
    embedding = model.encode([context_text])[0].tolist()
    return embedding
   