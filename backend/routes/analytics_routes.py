from flask import Blueprint, jsonify

from database import get_db_connection


analytics_bp = Blueprint(
    "analytics",
    __name__
)


# ==============================
# ANALYTICS DASHBOARD
# GET /api/analytics
# ==============================

@analytics_bp.route("", methods=["GET"])
def analytics():

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

    pending = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
        WHERE status = 'pending'
    """).fetchone()["count"]

    completed = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
        WHERE status = 'completed'
    """).fetchone()["count"]

    connection.close()

    return jsonify({
        "success": True,
        "analytics": {
            "patients": patients,
            "doctors": doctors,
            "appointments": appointments,
            "consultations": consultations,
            "prescriptions": prescriptions,
            "pending_appointments": pending,
            "completed_appointments": completed
        }
    })