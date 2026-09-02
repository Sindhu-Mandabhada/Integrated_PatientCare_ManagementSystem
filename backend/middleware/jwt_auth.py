<<<<<<< HEAD
from functools import wraps
from flask import request, jsonify
import jwt

from config import SECRET_KEY


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        # Get token from Authorization header
        auth_header = request.headers.get("Authorization")

        if auth_header:

            parts = auth_header.split(" ")

            if len(parts) == 2 and parts[0].lower() == "bearer":
                token = parts[1]

        if not token:

            return jsonify({
                "success": False,
                "message": "Authentication token is required"
            }), 401

        try:

            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user = payload

        except jwt.ExpiredSignatureError:

            return jsonify({
                "success": False,
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "success": False,
                "message": "Invalid authentication token"
            }), 401

        return f(*args, **kwargs)

=======
from functools import wraps
from flask import request, jsonify
import jwt

from config import SECRET_KEY


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        # Get token from Authorization header
        auth_header = request.headers.get("Authorization")

        if auth_header:

            parts = auth_header.split(" ")

            if len(parts) == 2 and parts[0].lower() == "bearer":
                token = parts[1]

        if not token:

            return jsonify({
                "success": False,
                "message": "Authentication token is required"
            }), 401

        try:

            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user = payload

        except jwt.ExpiredSignatureError:

            return jsonify({
                "success": False,
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "success": False,
                "message": "Invalid authentication token"
            }), 401

        return f(*args, **kwargs)

>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    return decorated