from flask import Blueprint, request, jsonify

from database import get_db_connection
from models.doctor_model import (
    update_doctor,
    delete_doctor
)
from models.patient_model import (
    delete_patient
)
from models.appointment_model import (
    update_appointment_status
)
from models.auditlog_model import (
    get_all_audit_logs
)


admin_bp = Blueprint(
    "admin",
    __name__
)


# ==============================
# ADMIN DASHBOARD
# GET /api/admin/dashboard
# ==============================

@admin_bp.route(
    "/dashboard",
    methods=["GET"]
)
def dashboard():

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

    connection.close()

    return jsonify({
        "success": True,
        "dashboard": {
            "patients": patients,
            "doctors": doctors,
            "appointments": appointments,
            "consultations": consultations
        }
    })


# ==============================
# MANAGE DOCTORS
# GET /api/admin/doctors
# ==============================

@admin_bp.route(
    "/doctors",
    methods=["GET"]
)
def manage_doctors():

    connection = get_db_connection()

    doctors = connection.execute("""
        SELECT *
        FROM doctors
        ORDER BY created_at DESC
    """).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "doctors": [
            dict(doctor)
            for doctor in doctors
        ]
    })


# ==============================
# DELETE DOCTOR
# DELETE /api/admin/doctors/<did>
# ==============================

@admin_bp.route(
    "/doctors/<did>",
    methods=["DELETE"]
)
def remove_doctor(did):

    connection = get_db_connection()

    doctor = connection.execute("""
        SELECT *
        FROM doctors
        WHERE did = ?
    """, (did,)).fetchone()

    connection.close()

    if not doctor:

        return jsonify({
            "success": False,
            "message": "Doctor not found"
        }), 404

    delete_doctor(did)

    return jsonify({
        "success": True,
        "message": "Doctor deleted"
    })


# ==============================
# MANAGE PATIENTS
# GET /api/admin/patients
# ==============================

@admin_bp.route(
    "/patients",
    methods=["GET"]
)
def manage_patients():

    connection = get_db_connection()

    patients = connection.execute("""
        SELECT *
        FROM patients
        ORDER BY created_at DESC
    """).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "patients": [
            dict(patient)
            for patient in patients
        ]
    })


# ==============================
# DELETE PATIENT
# DELETE /api/admin/patients/<pid>
# ==============================

@admin_bp.route(
    "/patients/<pid>",
    methods=["DELETE"]
)
def remove_patient(pid):

    connection = get_db_connection()

    patient = connection.execute("""
        SELECT *
        FROM patients
        WHERE pid = ?
    """, (pid,)).fetchone()

    connection.close()

    if not patient:

        return jsonify({
            "success": False,
            "message": "Patient not found"
        }), 404

    delete_patient(pid)

    return jsonify({
        "success": True,
        "message": "Patient deleted"
    })


# ==============================
# MANAGE APPOINTMENTS
# GET /api/admin/appointments
# ==============================

@admin_bp.route(
    "/appointments",
    methods=["GET"]
)
def manage_appointments():

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
        ORDER BY a.created_at DESC
    """).fetchall()

    connection.close()

    return jsonify({
        "success": True,
        "appointments": [
            dict(appointment)
            for appointment in appointments
        ]
    })


# ==============================
# UPDATE APPOINTMENT
# PUT /api/admin/appointments/<id>
# ==============================

@admin_bp.route(
    "/appointments/<int:appointment_id>",
    methods=["PUT"]
)
def update_appointment(appointment_id):

    data = request.get_json() or {}

    status = data.get("status")

    allowed = [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
    ]

    if status not in allowed:

        return jsonify({
            "success": False,
            "message": "Invalid status"
        }), 400

    appointment = update_appointment_status(
        appointment_id,
        status
    )

    if not appointment:

        return jsonify({
            "success": False,
            "message": "Appointment not found"
        }), 404

    return jsonify({
        "success": True,
        "message": "Appointment updated",
        "appointment": dict(appointment)
    })


# ==============================
# AUDIT LOGS
# GET /api/admin/audit-logs
# ==============================

@admin_bp.route(
    "/audit-logs",
    methods=["GET"]
)
def audit_logs():

    logs = get_all_audit_logs()

    return jsonify({
        "success": True,
        "logs": [
            dict(log)
            for log in logs
        ]
    })