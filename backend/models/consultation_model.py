<<<<<<< HEAD
from database import get_db_connection


def create_consultation(
    appointment_id,
    patient_id,
    doctor_id,
    symptoms,
    diagnosis,
    notes,
    consultation_date
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
        consultation_date
    ))

    connection.commit()

    consultation_id = cursor.lastrowid

    connection.close()

    return consultation_id


def get_consultation(consultation_id):

    connection = get_db_connection()

    consultation = connection.execute("""
        SELECT *
        FROM consultations
        WHERE id = ?
    """, (consultation_id,)).fetchone()

    connection.close()

    return consultation


def get_doctor_consultations(doctor_id):

    connection = get_db_connection()

    consultations = connection.execute("""
        SELECT
            c.*,
            p.name AS patient_name
        FROM consultations c
        LEFT JOIN patients p
            ON c.patient_id = p.pid
        WHERE c.doctor_id = ?
        ORDER BY c.created_at DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return consultations


def get_patient_consultations(patient_id):

    connection = get_db_connection()

    consultations = connection.execute("""
        SELECT
            c.*,
            d.name AS doctor_name
        FROM consultations c
        LEFT JOIN doctors d
            ON c.doctor_id = d.did
        WHERE c.patient_id = ?
        ORDER BY c.created_at DESC
    """, (patient_id,)).fetchall()

    connection.close()

=======
from database import get_db_connection


def create_consultation(
    appointment_id,
    patient_id,
    doctor_id,
    symptoms,
    diagnosis,
    notes,
    consultation_date
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
        consultation_date
    ))

    connection.commit()

    consultation_id = cursor.lastrowid

    connection.close()

    return consultation_id


def get_consultation(consultation_id):

    connection = get_db_connection()

    consultation = connection.execute("""
        SELECT *
        FROM consultations
        WHERE id = ?
    """, (consultation_id,)).fetchone()

    connection.close()

    return consultation


def get_doctor_consultations(doctor_id):

    connection = get_db_connection()

    consultations = connection.execute("""
        SELECT
            c.*,
            p.name AS patient_name
        FROM consultations c
        LEFT JOIN patients p
            ON c.patient_id = p.pid
        WHERE c.doctor_id = ?
        ORDER BY c.created_at DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return consultations


def get_patient_consultations(patient_id):

    connection = get_db_connection()

    consultations = connection.execute("""
        SELECT
            c.*,
            d.name AS doctor_name
        FROM consultations c
        LEFT JOIN doctors d
            ON c.doctor_id = d.did
        WHERE c.patient_id = ?
        ORDER BY c.created_at DESC
    """, (patient_id,)).fetchall()

    connection.close()

>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    return consultations