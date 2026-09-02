<<<<<<< HEAD
from database import get_db_connection


def create_appointment(
    patient_id,
    doctor_id,
    date,
    time,
    reason
):

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            date,
            time,
            reason
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        patient_id,
        doctor_id,
        date,
        time,
        reason
    ))

    connection.commit()

    appointment_id = cursor.lastrowid

    connection.close()

    return appointment_id


def get_appointment(appointment_id):

    connection = get_db_connection()

    appointment = connection.execute("""
        SELECT *
        FROM appointments
        WHERE id = ?
    """, (appointment_id,)).fetchone()

    connection.close()

    return appointment


def get_patient_appointments(patient_id):

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            d.name AS doctor_name,
            d.specialization
        FROM appointments a
        LEFT JOIN doctors d
            ON a.doctor_id = d.did
        WHERE a.patient_id = ?
        ORDER BY a.date DESC, a.time DESC
    """, (patient_id,)).fetchall()

    connection.close()

    return appointments


def get_doctor_appointments(doctor_id):

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            p.name AS patient_name
        FROM appointments a
        LEFT JOIN patients p
            ON a.patient_id = p.pid
        WHERE a.doctor_id = ?
        ORDER BY a.date DESC, a.time DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return appointments


def get_all_appointments():

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            p.name AS patient_name,
            d.name AS doctor_name
        FROM appointments a
        LEFT JOIN patients p
            ON a.patient_id = p.pid
        LEFT JOIN doctors d
            ON a.doctor_id = d.did
        ORDER BY a.date DESC, a.time DESC
    """).fetchall()

    connection.close()

    return appointments


def update_appointment_status(
    appointment_id,
    status
):

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

=======
from database import get_db_connection


def create_appointment(
    patient_id,
    doctor_id,
    date,
    time,
    reason
):

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            date,
            time,
            reason
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        patient_id,
        doctor_id,
        date,
        time,
        reason
    ))

    connection.commit()

    appointment_id = cursor.lastrowid

    connection.close()

    return appointment_id


def get_appointment(appointment_id):

    connection = get_db_connection()

    appointment = connection.execute("""
        SELECT *
        FROM appointments
        WHERE id = ?
    """, (appointment_id,)).fetchone()

    connection.close()

    return appointment


def get_patient_appointments(patient_id):

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            d.name AS doctor_name,
            d.specialization
        FROM appointments a
        LEFT JOIN doctors d
            ON a.doctor_id = d.did
        WHERE a.patient_id = ?
        ORDER BY a.date DESC, a.time DESC
    """, (patient_id,)).fetchall()

    connection.close()

    return appointments


def get_doctor_appointments(doctor_id):

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            p.name AS patient_name
        FROM appointments a
        LEFT JOIN patients p
            ON a.patient_id = p.pid
        WHERE a.doctor_id = ?
        ORDER BY a.date DESC, a.time DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return appointments


def get_all_appointments():

    connection = get_db_connection()

    appointments = connection.execute("""
        SELECT
            a.*,
            p.name AS patient_name,
            d.name AS doctor_name
        FROM appointments a
        LEFT JOIN patients p
            ON a.patient_id = p.pid
        LEFT JOIN doctors d
            ON a.doctor_id = d.did
        ORDER BY a.date DESC, a.time DESC
    """).fetchall()

    connection.close()

    return appointments


def update_appointment_status(
    appointment_id,
    status
):

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

>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    return appointment