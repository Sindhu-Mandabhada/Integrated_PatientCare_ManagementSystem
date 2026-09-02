from flask import Blueprint, request, jsonify

from database import get_db_connection
from models.doctor_model import (
    create_doctor,
    get_doctor,
    get_doctor_by_user_id,
    get_all_doctors,
    update_doctor,
    delete_doctor
)


doctor_bp = Blueprint(
    "doctors",
    __name__
)


# ==============================
# GET ALL DOCTORS
# GET /api/doctors
# ==============================

@doctor_bp.route("", methods=["GET"])
def doctors():

    rows = get_all_doctors()

    return jsonify({
        "success": True,
        "doctors": [dict(row) for row in rows]
    })


# ==============================
# CREATE DOCTOR
# POST /api/doctors
# ==============================

@doctor_bp.route("", methods=["POST"])
def add_doctor():

    data = request.get_json() or {}

    did = data.get("did")
    user_id = data.get("user_id")

    name = data.get("name", "").strip()
    specialization = data.get("specialization")
    phone = data.get("phone")
    email = data.get("email")
    experience = data.get("experience", 0)

    if not did or not name:

        return jsonify({
            "success": False,
            "message": "Doctor ID and name are required"
        }), 400

    try:

        create_doctor(
            did,
            user_id,
            name,
            specialization,
            phone,
            email,
            experience
        )

        doctor = get_doctor(did)

        return jsonify({
            "success": True,
            "message": "Doctor created successfully",
            "doctor": dict(doctor)
        }), 201

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ==============================
# DOCTOR DASHBOARD
# GET /api/doctors/dashboard
# ==============================

@doctor_bp.route("/dashboard", methods=["GET"])
def doctor_dashboard():

    return jsonify({
        "success": True,
        "message": "Doctor dashboard data",
        "data": {}
    })


# ==============================
# GET DOCTOR
# GET /api/doctors/<did>
# ==============================

@doctor_bp.route("/<did>", methods=["GET"])
def doctor_profile(did):

    doctor = get_doctor(did)

    if not doctor:

        return jsonify({
            "success": False,
            "message": "Doctor not found"
        }), 404

    return jsonify({
        "success": True,
        "doctor": dict(doctor)
    })


# ==============================
# GET DOCTOR BY USER
# GET /api/doctors/user/<user_id>
# ==============================

@doctor_bp.route(
    "/user/<int:user_id>",
    methods=["GET"]
)
def doctor_by_user(user_id):

    doctor = get_doctor_by_user_id(user_id)

    if not doctor:

        return jsonify({
            "success": False,
            "message": "Doctor profile not found"
        }), 404

    return jsonify({
        "success": True,
        "doctor": dict(doctor)
    })


# ==============================
# UPDATE DOCTOR
# PUT /api/doctors/<did>
# ==============================

@doctor_bp.route("/<did>", methods=["PUT"])
def edit_doctor(did):

    existing = get_doctor(did)

    if not existing:

        return jsonify({
            "success": False,
            "message": "Doctor not found"
        }), 404

    data = request.get_json() or {}

    updated = update_doctor(
        did,
        data.get("name", existing["name"]),
        data.get(
            "specialization",
            existing["specialization"]
        ),
        data.get("phone", existing["phone"]),
        data.get("email", existing["email"]),
        data.get(
            "experience",
            existing["experience"]
        ),
        data.get("status", existing["status"])
    )

    return jsonify({
        "success": True,
        "message": "Doctor updated successfully",
        "doctor": dict(updated)
    })


# ==============================
# DELETE DOCTOR
# DELETE /api/doctors/<did>
# ==============================

@doctor_bp.route("/<did>", methods=["DELETE"])
def remove_doctor(did):

    existing = get_doctor(did)

    if not existing:

        return jsonify({
            "success": False,
            "message": "Doctor not found"
        }), 404

    delete_doctor(did)

    return jsonify({
        "success": True,
        "message": "Doctor deleted successfully"
    })