import pyodbc
from config import settings

def extract_data(query: str):
    """
    Extract data from the SQL database using the provided query.
    
    Args:
        query (str): The SQL query to execute.
    """
    connection_string = (
        f"DRIVER={settings.settings.DB_DRIVER};"
        f"SERVER={settings.settings.SQL_SERVER};"
        f"DATABASE={settings.settings.SQL_DATABASE};"
        f"UID={settings.settings.SQL_USER};"
        f"PWD={settings.settings.SQL_PASSWORD};"
    )

    with pyodbc.connect(connection_string) as conn:
        cursor = conn.cursor()
        cursor.execute(query)
        return cursor.fetchall()
