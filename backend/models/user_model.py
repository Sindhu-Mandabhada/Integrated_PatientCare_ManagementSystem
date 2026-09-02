from database import get_db_connection


def create_user(name, username, email, password, role):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO users
        (name, username, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    """, (
        name,
        username,
        email,
        password,
        role
    ))

    connection.commit()

    user_id = cursor.lastrowid

    connection.close()

    return user_id


def get_user_by_email(email):

    connection = get_db_connection()

    user = connection.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (email,)).fetchone()

    connection.close()

    return user


def get_user_by_id(user_id):

    connection = get_db_connection()

    user = connection.execute("""
        SELECT *
        FROM users
        WHERE id = ?
    """, (user_id,)).fetchone()

    connection.close()

    return user


def get_users():

    connection = get_db_connection()

    users = connection.execute("""
        SELECT
            id,
            name,
            username,
            email,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    return users