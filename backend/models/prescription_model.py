from database import get_db_connection


def create_prescription(
    patient_id,
    doctor_id,
    consultation_id,
    medicine,
    dosage,
    duration,
    instructions
):

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO prescriptions
        (
            patient_id,
            doctor_id,
            consultation_id,
            medicine,
            dosage,
            duration,
            instructions
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        patient_id,
        doctor_id,
        consultation_id,
        medicine,
        dosage,
        duration,
        instructions
    ))

    connection.commit()

    prescription_id = cursor.lastrowid

    connection.close()

    return prescription_id


def get_prescription(prescription_id):

    connection = get_db_connection()

    prescription = connection.execute("""
        SELECT *
        FROM prescriptions
        WHERE id = ?
    """, (prescription_id,)).fetchone()

    connection.close()

    return prescription


def get_doctor_prescriptions(doctor_id):

    connection = get_db_connection()

    prescriptions = connection.execute("""
        SELECT
            pr.*,
            p.name AS patient_name
        FROM prescriptions pr
        LEFT JOIN patients p
            ON pr.patient_id = p.pid
        WHERE pr.doctor_id = ?
        ORDER BY pr.created_at DESC
    """, (doctor_id,)).fetchall()

    connection.close()

    return prescriptions


def get_patient_prescriptions(patient_id):

    connection = get_db_connection()

    prescriptions = connection.execute("""
        SELECT
            pr.*,
            d.name AS doctor_name
        FROM prescriptions pr
        LEFT JOIN doctors d
            ON pr.doctor_id = d.did
        WHERE pr.patient_id = ?
        ORDER BY pr.created_at DESC
    """, (patient_id,)).fetchall()

    connection.close()

    return prescriptions