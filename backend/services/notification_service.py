from database import get_db_connection


def create_user_notification(user_id, message, notification_type="info"):
    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO notifications
        (user_id, message, type, is_read)
        VALUES (?, ?, ?, ?)
    """, (
        user_id,
        message,
        notification_type,
        0
    ))

    notification_id = cursor.lastrowid

    connection.commit()
    connection.close()

    return notification_id


def get_notifications(user_id):
    connection = get_db_connection()

    rows = connection.execute("""
        SELECT *
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    """, (user_id,)).fetchall()

    connection.close()

    return rows


def mark_as_read(notification_id, user_id):
    connection = get_db_connection()

    connection.execute("""
        UPDATE notifications
        SET is_read = 1
        WHERE id = ? AND user_id = ?
    """, (
        notification_id,
        user_id
    ))

    connection.commit()
    connection.close()


def delete_user_notification(notification_id, user_id):
    connection = get_db_connection()

    connection.execute("""
        DELETE FROM notifications
        WHERE id = ? AND user_id = ?
    """, (
        notification_id,
        user_id
    ))

    connection.commit()
    connection.close()