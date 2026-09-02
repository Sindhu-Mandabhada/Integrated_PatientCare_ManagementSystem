import sqlite3

from config import DATABASE_PATH


# ==============================
# DATABASE CONNECTION
# ==============================

def get_db_connection():

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    # Allows us to access columns by name
    connection.row_factory = sqlite3.Row

    # Enable foreign-key relationships
    connection.execute(
        "PRAGMA foreign_keys = ON"
    )

    return connection