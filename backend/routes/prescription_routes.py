from flask import Blueprint, request, jsonify

from models.prescription_model import (
    create_prescription,
    get_prescription,
    get_doctor_prescriptions,
    get_patient_prescriptions
)


prescription_bp = Blueprint(
    "prescriptions",
    __name__
)


# ==============================
# CREATE PRESCRIPTION
# ==============================

@prescription_bp.route("", methods=["POST"])
def add_prescription():

    data = request.get_json() or {}

    patient_id = data.get("patient_id")
    doctor_id = data.get("doctor_id")
    consultation_id = data.get(
        "consultation_id"
    )

    medicine = data.get("medicine")
    dosage = data.get("dosage", "")
    duration = data.get("duration", "")
    instructions = data.get(
        "instructions",
        ""
    )

    if not patient_id or not doctor_id or not medicine:

        return jsonify({
            "success": False,
            "message": "Patient, doctor and medicine are required"
        }), 400

    try:

        prescription_id = create_prescription(
            patient_id,
            doctor_id,
            consultation_id,
            medicine,
            dosage,
            duration,
            instructions
        )

        prescription = get_prescription(
            prescription_id
        )

        return jsonify({
            "success": True,
            "message": "Prescription created successfully",
            "prescription": dict(prescription)
        }), 201

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ==============================
# GET PRESCRIPTION
# ==============================

@prescription_bp.route(
    "/<int:prescription_id>",
    methods=["GET"]
)
def prescription(prescription_id):

    row = get_prescription(prescription_id)

    if not row:

        return jsonify({
            "success": False,
            "message": "Prescription not found"
        }), 404

    return jsonify({
        "success": True,
        "prescription": dict(row)
    })


# ==============================
# DOCTOR PRESCRIPTIONS
# ==============================

@prescription_bp.route(
    "/doctor/<did>",
    methods=["GET"]
)
def doctor_prescriptions(did):

    rows = get_doctor_prescriptions(did)

    return jsonify({
        "success": True,
        "prescriptions": [dict(row) for row in rows]
    })


# ==============================
# PATIENT PRESCRIPTIONS
# ==============================

@prescription_bp.route(
    "/patient/<pid>",
    methods=["GET"]
)
def patient_prescriptions(pid):

    rows = get_patient_prescriptions(pid)

    return jsonify({
        "success": True,
        "prescriptions": [dict(row) for row in rows]
    })