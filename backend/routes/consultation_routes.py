from flask import Blueprint, request, jsonify

from models.consultation_model import (
    create_consultation,
    get_consultation,
    get_doctor_consultations,
    get_patient_consultations
)


consultation_bp = Blueprint(
    "consultations",
    __name__
)


# ==============================
# CREATE CONSULTATION
# POST /api/consultations
# ==============================

@consultation_bp.route("", methods=["POST"])
def add_consultation():

    data = request.get_json() or {}

    appointment_id = data.get("appointment_id")
    patient_id = data.get("patient_id")
    doctor_id = data.get("doctor_id")

    symptoms = data.get("symptoms", "")
    diagnosis = data.get("diagnosis", "")
    notes = data.get("notes", "")
    consultation_date = data.get(
        "consultation_date"
    )

    if not patient_id or not doctor_id:

        return jsonify({
            "success": False,
            "message": "Patient and doctor are required"
        }), 400

    try:

        consultation_id = create_consultation(
            appointment_id,
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            notes,
            consultation_date
        )

        consultation = get_consultation(
            consultation_id
        )

        return jsonify({
            "success": True,
            "message": "Consultation saved successfully",
            "consultation": dict(consultation)
        }), 201

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ==============================
# GET CONSULTATION
# ==============================

@consultation_bp.route(
    "/<int:consultation_id>",
    methods=["GET"]
)
def consultation(consultation_id):

    row = get_consultation(consultation_id)

    if not row:

        return jsonify({
            "success": False,
            "message": "Consultation not found"
        }), 404

    return jsonify({
        "success": True,
        "consultation": dict(row)
    })


# ==============================
# DOCTOR HISTORY
# GET /api/consultations/doctor/<did>
# ==============================

@consultation_bp.route(
    "/doctor/<did>",
    methods=["GET"]
)
def doctor_history(did):

    rows = get_doctor_consultations(did)

    return jsonify({
        "success": True,
        "consultations": [dict(row) for row in rows]
    })


# ==============================
# PATIENT HISTORY
# ==============================

@consultation_bp.route(
    "/patient/<pid>",
    methods=["GET"]
)
def patient_history(pid):

    rows = get_patient_consultations(pid)

    return jsonify({
        "success": True,
        "consultations": [dict(row) for row in rows]
    })