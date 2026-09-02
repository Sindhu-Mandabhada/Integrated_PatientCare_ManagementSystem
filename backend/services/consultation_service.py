from datetime import datetime

from database import get_db_connection


def create_doctor_consultation(
    appointment_id,
    patient_id,
    doctor_id,
    symptoms,
    diagnosis,
    notes
):

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO consultations
        (
            appointment_id,
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            notes,
            consultation_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        appointment_id,
        patient_id,
        doctor_id,
        symptoms,
        diagnosis,
        notes,
        datetime.now().isoformat()
    ))

    consultation_id = cursor.lastrowid

    # Mark appointment as completed
    if appointment_id:

        cursor.execute("""
            UPDATE appointments
            SET status = 'completed'
            WHERE id = ?
        """, (appointment_id,))

    connection.commit()

    consultation = connection.execute("""
        SELECT *
        FROM consultations
        WHERE id = ?
    """, (consultation_id,)).fetchone()

    connection.close()

    return consultation


def get_patient_consultation_history(
    patient_id
):

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT
            c.*,
            d.name AS doctor_name
        FROM consultations c
        LEFT JOIN doctors d
            ON c.doctor_id = d.did
        WHERE c.patient_id = ?
        ORDER BY c.consultation_date DESC
    """, (patient_id,)).fetchall()

    connection.close()

    return rows


def get_doctor_consultation_history(
    doctor_id
):

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT
            c.*,
            p.name AS patient_name
        FROM consultations c
        LEFT JOIN patients p
            ON c.patient_id = p.pid
        WHERE c.doctor_id = ?
        ORDER BY c.consultation_date DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return rows


def get_consultation_by_id(
    consultation_id
):

    connection = get_db_connection()

    consultation = connection.execute("""
        SELECT *
        FROM consultations
        WHERE id = ?
    """, (consultation_id,)).fetchone()

    connection.close()

    return consultation