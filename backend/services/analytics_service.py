from database import get_db_connection


def get_dashboard_analytics():

    connection = get_db_connection()

    patients = connection.execute("""
        SELECT COUNT(*) AS count
        FROM patients
    """).fetchone()["count"]

    doctors = connection.execute("""
        SELECT COUNT(*) AS count
        FROM doctors
    """).fetchone()["count"]

    appointments = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
    """).fetchone()["count"]

    consultations = connection.execute("""
        SELECT COUNT(*) AS count
        FROM consultations
    """).fetchone()["count"]

    prescriptions = connection.execute("""
        SELECT COUNT(*) AS count
        FROM prescriptions
    """).fetchone()["count"]

    completed = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
        WHERE status = 'completed'
    """).fetchone()["count"]

    pending = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
        WHERE status = 'pending'
    """).fetchone()["count"]

    cancelled = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
        WHERE status = 'cancelled'
    """).fetchone()["count"]

    connection.close()

    return {
        "patients": patients,
        "doctors": doctors,
        "appointments": appointments,
        "consultations": consultations,
        "prescriptions": prescriptions,
        "completed_appointments": completed,
        "pending_appointments": pending,
        "cancelled_appointments": cancelled
    }


def get_appointment_statistics():

    connection = get_db_connection()

    rows = connection.execute("""
        SELECT status, COUNT(*) AS count
        FROM appointments
        GROUP BY status
    """).fetchall()

    connection.close()

    return [
        dict(row)
        for row in rows
    ]