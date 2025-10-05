import pyodbc
from settings import settings

def fetch_from_sql(query: str):
    """
    Extract data from the SQL database using the provided query.
    
    Args:
        query (str): The SQL query to execute.
    """
    connection_string = (
        f"DRIVER={settings.DB_DRIVER};"
        f"SERVER={settings.SQL_SERVER};"
        f"DATABASE={settings.SQL_DATABASE};"
        f"UID={settings.SQL_USER};"
        f"PWD={settings.SQL_PASSWORD};"
    )

    with pyodbc.connect(connection_string) as conn:
        cursor = conn.cursor()
        cursor.execute(query)
        return cursor.fetchall()
