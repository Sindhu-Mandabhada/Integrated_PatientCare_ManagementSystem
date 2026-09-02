<<<<<<< HEAD
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

=======
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

>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    return connection