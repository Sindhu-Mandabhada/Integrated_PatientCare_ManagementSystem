from database import get_db_connection


def create_notification(
    user_id,
    message
):

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO notifications
        (
            user_id,
            message
        )
        VALUES (?, ?)
    """, (
        user_id,
        message
    ))

    connection.commit()

    notification_id = cursor.lastrowid

    connection.close()

    return notification_id


def get_user_notifications(user_id):

    connection = get_db_connection()

    notifications = connection.execute("""
        SELECT *
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    """, (user_id,)).fetchall()

    connection.close()

    return notifications


def mark_notification_read(
    notification_id,
    user_id
):

    connection = get_db_connection()

    connection.execute("""
        UPDATE notifications
        SET is_read = 1
        WHERE id = ?
        AND user_id = ?
    """, (
        notification_id,
        user_id
    ))

    connection.commit()

    connection.close()


def delete_notification(
    notification_id,
    user_id
):

    connection = get_db_connection()

    connection.execute("""
        DELETE FROM notifications
        WHERE id = ?
        AND user_id = ?
    """, (
        notification_id,
        user_id
    ))

    connection.commit()

    connection.close()