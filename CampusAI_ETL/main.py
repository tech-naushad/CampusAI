from extract.extract import extract_data
from transform.transform import invoke
from load.load import load_vectors

records = extract_data("GetAllPrograms")
vectors = invoke(records)

load_vectors(vectors)