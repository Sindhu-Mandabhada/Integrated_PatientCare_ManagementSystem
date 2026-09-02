<<<<<<< HEAD
from database import get_db_connection


def create_audit_log(
    user_id,
    action,
    details
):

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO audit_logs
        (
            user_id,
            action,
            details
        )
        VALUES (?, ?, ?)
    """, (
        user_id,
        action,
        details
    ))

    connection.commit()
    connection.close()


def get_all_audit_logs():

    connection = get_db_connection()

    logs = connection.execute("""
        SELECT
            a.id,
            a.user_id,
            u.name AS user_name,
            u.role,
            a.action,
            a.details,
            a.created_at
        FROM audit_logs a
        LEFT JOIN users u
            ON a.user_id = u.id
        ORDER BY a.created_at DESC
    """).fetchall()

    connection.close()

=======
from database import get_db_connection


def create_audit_log(
    user_id,
    action,
    details
):

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO audit_logs
        (
            user_id,
            action,
            details
        )
        VALUES (?, ?, ?)
    """, (
        user_id,
        action,
        details
    ))

    connection.commit()
    connection.close()


def get_all_audit_logs():

    connection = get_db_connection()

    logs = connection.execute("""
        SELECT
            a.id,
            a.user_id,
            u.name AS user_name,
            u.role,
            a.action,
            a.details,
            a.created_at
        FROM audit_logs a
        LEFT JOIN users u
            ON a.user_id = u.id
        ORDER BY a.created_at DESC
    """).fetchall()

    connection.close()

>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    return logs