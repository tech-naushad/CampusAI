from data_extractor import fetch_from_sql
from data_transformer import invoke
from data_vector_processor import process

data = fetch_from_sql("GetAllPrograms")
vectores = invoke(data)
process(vectores)