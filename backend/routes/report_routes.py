from flask import Blueprint, jsonify
from database import get_db_connection


report_bp = Blueprint(
    "reports",
    __name__
)


# ==============================
# REPORT SUMMARY
# GET /api/reports
# ==============================

@report_bp.route("", methods=["GET"])
def reports():

    connection = get_db_connection()

    patient_count = connection.execute("""
        SELECT COUNT(*) AS count
        FROM patients
    """).fetchone()["count"]

    doctor_count = connection.execute("""
        SELECT COUNT(*) AS count
        FROM doctors
    """).fetchone()["count"]

    appointment_count = connection.execute("""
        SELECT COUNT(*) AS count
        FROM appointments
    """).fetchone()["count"]

    consultation_count = connection.execute("""
        SELECT COUNT(*) AS count
        FROM consultations
    """).fetchone()["count"]

    prescription_count = connection.execute("""
        SELECT COUNT(*) AS count
        FROM prescriptions
    """).fetchone()["count"]

    connection.close()

    return jsonify({
        "success": True,
        "report": {
            "total_patients": patient_count,
            "total_doctors": doctor_count,
            "total_appointments": appointment_count,
            "total_consultations": consultation_count,
            "total_prescriptions": prescription_count
        }
    })


# ==============================
# EXPORT DATA
# GET /api/reports/export
# ==============================

@report_bp.route(
    "/export",
    methods=["GET"]
)
def export_report():

    connection = get_db_connection()

    patients = connection.execute("""
        SELECT *
        FROM patients
    """).fetchall()

    doctors = connection.execute("""
        SELECT *
        FROM doctors
    """).fetchall()

    appointments = connection.execute("""
        SELECT *
        FROM appointments
    """).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "data": {
            "patients": [
                dict(row)
                for row in patients
            ],
            "doctors": [
                dict(row)
                for row in doctors
            ],
            "appointments": [
                dict(row)
                for row in appointments
            ]
        }
    })