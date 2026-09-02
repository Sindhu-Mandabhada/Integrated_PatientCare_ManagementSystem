from flask import Blueprint, request, jsonify

from database import get_db_connection
from models.patient_model import (
    create_patient,
    get_patient,
    get_patient_by_user_id,
    get_all_patients,
    update_patient,
    delete_patient
)


patient_bp = Blueprint(
    "patients",
    __name__
)


# ==============================
# GET ALL PATIENTS
# GET /api/patients
# ==============================

@patient_bp.route("", methods=["GET"])
def patients():

    rows = get_all_patients()

    return jsonify({
        "success": True,
        "patients": [dict(row) for row in rows]
    })


# ==============================
# CREATE PATIENT
# POST /api/patients
# ==============================

@patient_bp.route("", methods=["POST"])
def register_patient():

    data = request.get_json() or {}

    pid = data.get("pid")
    user_id = data.get("user_id")

    name = data.get("name", "").strip()
    age = data.get("age")
    gender = data.get("gender")
    phone = data.get("phone")
    email = data.get("email")
    blood_group = data.get("blood_group")
    address = data.get("address")

    if not pid or not name:

        return jsonify({
            "success": False,
            "message": "Patient ID and name are required"
        }), 400

    connection = get_db_connection()

    existing = connection.execute("""
        SELECT pid
        FROM patients
        WHERE pid = ?
    """, (pid,)).fetchone()

    connection.close()

    if existing:

        return jsonify({
            "success": False,
            "message": "Patient ID already exists"
        }), 409

    try:

        create_patient(
            pid,
            user_id,
            name,
            age,
            gender,
            phone,
            email,
            blood_group,
            address
        )

        return jsonify({
            "success": True,
            "message": "Patient registered successfully",
            "patient": dict(get_patient(pid))
        }), 201

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ==============================
# GET PATIENT
# GET /api/patients/<pid>
# ==============================

@patient_bp.route("/<pid>", methods=["GET"])
def patient_profile(pid):

    patient = get_patient(pid)

    if not patient:

        return jsonify({
            "success": False,
            "message": "Patient not found"
        }), 404

    return jsonify({
        "success": True,
        "patient": dict(patient)
    })


# ==============================
# GET PATIENT BY USER ID
# GET /api/patients/user/<user_id>
# ==============================

@patient_bp.route(
    "/user/<int:user_id>",
    methods=["GET"]
)
def patient_by_user(user_id):

    patient = get_patient_by_user_id(user_id)

    if not patient:

        return jsonify({
            "success": False,
            "message": "Patient profile not found"
        }), 404

    return jsonify({
        "success": True,
        "patient": dict(patient)
    })


# ==============================
# UPDATE PATIENT
# PUT /api/patients/<pid>
# ==============================

@patient_bp.route("/<pid>", methods=["PUT"])
def edit_patient(pid):

    data = request.get_json() or {}

    existing = get_patient(pid)

    if not existing:

        return jsonify({
            "success": False,
            "message": "Patient not found"
        }), 404

    updated = update_patient(
        pid,
        data.get("name", existing["name"]),
        data.get("age", existing["age"]),
        data.get("gender", existing["gender"]),
        data.get("phone", existing["phone"]),
        data.get("email", existing["email"]),
        data.get("blood_group", existing["blood_group"]),
        data.get("address", existing["address"])
    )

    return jsonify({
        "success": True,
        "message": "Patient profile updated",
        "patient": dict(updated)
    })


# ==============================
# DELETE PATIENT
# DELETE /api/patients/<pid>
# ==============================

@patient_bp.route("/<pid>", methods=["DELETE"])
def remove_patient(pid):

    existing = get_patient(pid)

    if not existing:

        return jsonify({
            "success": False,
            "message": "Patient not found"
        }), 404

    delete_patient(pid)

    return jsonify({
        "success": True,
        "message": "Patient deleted successfully"
    })