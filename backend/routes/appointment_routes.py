from flask import Blueprint, request, jsonify

from models.appointment_model import (
    create_appointment,
    get_appointment,
    get_patient_appointments,
    get_doctor_appointments,
    get_all_appointments,
    update_appointment_status
)


appointment_bp = Blueprint(
    "appointments",
    __name__
)


# ==============================
# ALL APPOINTMENTS
# GET /api/appointments
# ==============================

@appointment_bp.route("", methods=["GET"])
def appointments():

    rows = get_all_appointments()

    return jsonify({
        "success": True,
        "appointments": [dict(row) for row in rows]
    })


# ==============================
# BOOK APPOINTMENT
# POST /api/appointments
# ==============================

@appointment_bp.route("", methods=["POST"])
def book_appointment():

    data = request.get_json() or {}

    patient_id = data.get("patient_id")
    doctor_id = data.get("doctor_id")
    date = data.get("date")
    time = data.get("time")
    reason = data.get("reason", "")

    if not all([
        patient_id,
        doctor_id,
        date,
        time
    ]):

        return jsonify({
            "success": False,
            "message": "Patient, doctor, date and time are required"
        }), 400

    try:

        appointment_id = create_appointment(
            patient_id,
            doctor_id,
            date,
            time,
            reason
        )

        appointment = get_appointment(
            appointment_id
        )

        return jsonify({
            "success": True,
            "message": "Appointment booked successfully",
            "appointment": dict(appointment)
        }), 201

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ==============================
# PATIENT APPOINTMENTS
# GET /api/appointments/patient/<pid>
# ==============================

@appointment_bp.route(
    "/patient/<pid>",
    methods=["GET"]
)
def patient_appointments(pid):

    rows = get_patient_appointments(pid)

    return jsonify({
        "success": True,
        "appointments": [dict(row) for row in rows]
    })


# ==============================
# DOCTOR APPOINTMENTS
# GET /api/appointments/doctor/<did>
# ==============================

@appointment_bp.route(
    "/doctor/<did>",
    methods=["GET"]
)
def doctor_appointments(did):

    rows = get_doctor_appointments(did)

    return jsonify({
        "success": True,
        "appointments": [dict(row) for row in rows]
    })


# ==============================
# GET APPOINTMENT
# GET /api/appointments/<id>
# ==============================

@appointment_bp.route(
    "/<int:appointment_id>",
    methods=["GET"]
)
def appointment(appointment_id):

    row = get_appointment(appointment_id)

    if not row:

        return jsonify({
            "success": False,
            "message": "Appointment not found"
        }), 404

    return jsonify({
        "success": True,
        "appointment": dict(row)
    })


# ==============================
# UPDATE STATUS
# PUT /api/appointments/<id>/status
# ==============================

@appointment_bp.route(
    "/<int:appointment_id>/status",
    methods=["PUT"]
)
def update_status(appointment_id):

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
            "message": "Invalid appointment status"
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
        "message": "Appointment status updated",
        "appointment": dict(appointment)
    })