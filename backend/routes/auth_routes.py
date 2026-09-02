<<<<<<< HEAD
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta

from config import SECRET_KEY, JWT_EXPIRATION_HOURS
from database import get_db_connection


auth_bp = Blueprint("auth", __name__)


# ==============================
# SIGNUP
# POST /api/signup
# ==============================

@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.get_json() or {}

    name = data.get("name", "").strip()
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    role = data.get("role", "patient").lower()

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required"
        }), 400

    if role not in ["patient", "doctor", "admin"]:
        return jsonify({
            "success": False,
            "message": "Invalid role"
        }), 400

    connection = get_db_connection()

    try:

        existing_user = connection.execute("""
            SELECT id
            FROM users
            WHERE email = ?
        """, (email,)).fetchone()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 409

        if username:

            existing_username = connection.execute("""
                SELECT id
                FROM users
                WHERE username = ?
            """, (username,)).fetchone()

            if existing_username:
                return jsonify({
                    "success": False,
                    "message": "Username already exists"
                }), 409

        hashed_password = generate_password_hash(password)

        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO users
            (
                name,
                username,
                email,
                password,
                role
            )
            VALUES (?, ?, ?, ?, ?)
        """, (
            name,
            username or None,
            email,
            hashed_password,
            role
        ))

        user_id = cursor.lastrowid

        connection.commit()

        return jsonify({
            "success": True,
            "message": "Signup successful",
            "user": {
                "id": user_id,
                "name": name,
                "username": username,
                "email": email,
                "role": role
            }
        }), 201

    except Exception as error:

        connection.rollback()

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500

    finally:
        connection.close()


# ==============================
# LOGIN
# POST /api/login
# ==============================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    requested_role = data.get("role", "").lower()

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    connection = get_db_connection()

    user = connection.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (email,)).fetchone()

    connection.close()

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password"],
        password
    ):

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if requested_role and user["role"] != requested_role:

        return jsonify({
            "success": False,
            "message": "Selected role does not match this account"
        }), 403

    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.utcnow()
        + timedelta(hours=JWT_EXPIRATION_HOURS)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "username": user["username"],
            "email": user["email"],
            "role": user["role"]
        }
=======
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta

from config import SECRET_KEY, JWT_EXPIRATION_HOURS
from database import get_db_connection


auth_bp = Blueprint("auth", __name__)


# ==============================
# SIGNUP
# POST /api/signup
# ==============================

@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.get_json() or {}

    name = data.get("name", "").strip()
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    role = data.get("role", "patient").lower()

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required"
        }), 400

    if role not in ["patient", "doctor", "admin"]:
        return jsonify({
            "success": False,
            "message": "Invalid role"
        }), 400

    connection = get_db_connection()

    try:

        existing_user = connection.execute("""
            SELECT id
            FROM users
            WHERE email = ?
        """, (email,)).fetchone()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 409

        if username:

            existing_username = connection.execute("""
                SELECT id
                FROM users
                WHERE username = ?
            """, (username,)).fetchone()

            if existing_username:
                return jsonify({
                    "success": False,
                    "message": "Username already exists"
                }), 409

        hashed_password = generate_password_hash(password)

        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO users
            (
                name,
                username,
                email,
                password,
                role
            )
            VALUES (?, ?, ?, ?, ?)
        """, (
            name,
            username or None,
            email,
            hashed_password,
            role
        ))

        user_id = cursor.lastrowid

        connection.commit()

        return jsonify({
            "success": True,
            "message": "Signup successful",
            "user": {
                "id": user_id,
                "name": name,
                "username": username,
                "email": email,
                "role": role
            }
        }), 201

    except Exception as error:

        connection.rollback()

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500

    finally:
        connection.close()


# ==============================
# LOGIN
# POST /api/login
# ==============================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    requested_role = data.get("role", "").lower()

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    connection = get_db_connection()

    user = connection.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (email,)).fetchone()

    connection.close()

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password"],
        password
    ):

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if requested_role and user["role"] != requested_role:

        return jsonify({
            "success": False,
            "message": "Selected role does not match this account"
        }), 403

    payload = {
        "user_id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.utcnow()
        + timedelta(hours=JWT_EXPIRATION_HOURS)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "username": user["username"],
            "email": user["email"],
            "role": user["role"]
        }
>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    }), 200