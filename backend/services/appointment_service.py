from datetime import datetime

from database import get_db_connection


def is_appointment_available(
    doctor_id,
    date,
    time
):

    connection = get_db_connection()

    appointment = connection.execute("""
        SELECT id
        FROM appointments
        WHERE doctor_id = ?
        AND date = ?
        AND time = ?
        AND status != 'cancelled'
    """, (
        doctor_id,
        date,
        time
    )).fetchone()

    connection.close()

    return appointment is None


def book_appointment(
    patient_id,
    doctor_id,
    date,
    time,
    reason=""
):

    if not is_appointment_available(
        doctor_id,
        date,
        time
    ):
        raise ValueError(
            "This appointment slot is already booked"
        )

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            date,
            time,
            reason,
            status,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        patient_id,
        doctor_id,
        date,
        time,
        reason,
        "pending",
        datetime.now().isoformat()
    ))

    appointment_id = cursor.lastrowid

    connection.commit()

    appointment = connection.execute("""
        SELECT *
        FROM appointments
        WHERE id = ?
    """, (appointment_id,)).fetchone()

    connection.close()

    return appointment


def cancel_appointment(
    appointment_id,
    patient_id=None
):

    connection = get_db_connection()

    if patient_id:

        result = connection.execute("""
            UPDATE appointments
            SET status = 'cancelled'
            WHERE id = ?
            AND patient_id = ?
        """, (
            appointment_id,
            patient_id
        ))

    else:

        result = connection.execute("""
            UPDATE appointments
            SET status = 'cancelled'
            WHERE id = ?
        """, (appointment_id,))

    connection.commit()

    appointment = connection.execute("""
        SELECT *
        FROM appointments
        WHERE id = ?
    """, (appointment_id,)).fetchone()

    connection.close()

    if result.rowcount == 0:
        return None

    return appointment


def update_status(
    appointment_id,
    status
):

    allowed_statuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
    ]

    if status not in allowed_statuses:
        raise ValueError(
            "Invalid appointment status"
        )

    connection = get_db_connection()

    connection.execute("""
        UPDATE appointments
        SET status = ?
        WHERE id = ?
    """, (
        status,
        appointment_id
    ))

    connection.commit()

    appointment = connection.execute("""
        SELECT *
        FROM appointments
        WHERE id = ?
    """, (appointment_id,)).fetchone()

    connection.close()

    return appointment