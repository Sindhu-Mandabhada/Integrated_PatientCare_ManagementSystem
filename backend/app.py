<<<<<<< HEAD

from flask import Flask, jsonify
from flask_cors import CORS

# ==============================
# IMPORT ROUTES
# ==============================

from routes.auth_routes import auth_bp
from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.appointment_routes import appointment_bp
from routes.consultation_routes import consultation_bp
from routes.prescription_routes import prescription_bp
from routes.notification_routes import notification_bp
from routes.analytics_routes import analytics_bp
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp


# ==============================
# CREATE FLASK APP
# ==============================

app = Flask(__name__)


# ==============================
# CORS
# Allows React frontend to
# communicate with Flask backend
# ==============================

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# ==============================
# REGISTER BLUEPRINTS
# ==============================

# Authentication
app.register_blueprint(
    auth_bp,
    url_prefix="/api"
)

# Patient Module
app.register_blueprint(
    patient_bp,
    url_prefix="/api/patients"
)

# Doctor Module
app.register_blueprint(
    doctor_bp,
    url_prefix="/api/doctors"
)

# Appointment Module
app.register_blueprint(
    appointment_bp,
    url_prefix="/api/appointments"
)

# Consultation Module
app.register_blueprint(
    consultation_bp,
    url_prefix="/api/consultations"
)

# Prescription Module
app.register_blueprint(
    prescription_bp,
    url_prefix="/api/prescriptions"
)

# Notification Module
app.register_blueprint(
    notification_bp,
    url_prefix="/api/notifications"
)

# Analytics Module
app.register_blueprint(
    analytics_bp,
    url_prefix="/api/analytics"
)

# Reports Module
app.register_blueprint(
    report_bp,
    url_prefix="/api/reports"
)

# Admin Module
app.register_blueprint(
    admin_bp,
    url_prefix="/api/admin"
)


# ==============================
# HOME / HEALTH CHECK
# ==============================

@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "MediTrack Backend is running",
        "status": "online"
    })


# ==============================
# API HEALTH CHECK
# ==============================

@app.route("/api/health")
def health():

    return jsonify({
        "success": True,
        "message": "MediTrack API is working"
    })


# ==============================
# ERROR HANDLERS
# ==============================

@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "success": False,
        "message": "API endpoint not found"
    }), 404


@app.errorhandler(500)
def server_error(error):

    return jsonify({
        "success": False,
        "message": "Internal server error"
    }), 500


# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
=======

from flask import Flask, jsonify
from flask_cors import CORS

# ==============================
# IMPORT ROUTES
# ==============================

from routes.auth_routes import auth_bp
from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.appointment_routes import appointment_bp
from routes.consultation_routes import consultation_bp
from routes.prescription_routes import prescription_bp
from routes.notification_routes import notification_bp
from routes.analytics_routes import analytics_bp
from routes.report_routes import report_bp
from routes.admin_routes import admin_bp


# ==============================
# CREATE FLASK APP
# ==============================

app = Flask(__name__)


# ==============================
# CORS
# Allows React frontend to
# communicate with Flask backend
# ==============================

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# ==============================
# REGISTER BLUEPRINTS
# ==============================

# Authentication
app.register_blueprint(
    auth_bp,
    url_prefix="/api"
)

# Patient Module
app.register_blueprint(
    patient_bp,
    url_prefix="/api/patients"
)

# Doctor Module
app.register_blueprint(
    doctor_bp,
    url_prefix="/api/doctors"
)

# Appointment Module
app.register_blueprint(
    appointment_bp,
    url_prefix="/api/appointments"
)

# Consultation Module
app.register_blueprint(
    consultation_bp,
    url_prefix="/api/consultations"
)

# Prescription Module
app.register_blueprint(
    prescription_bp,
    url_prefix="/api/prescriptions"
)

# Notification Module
app.register_blueprint(
    notification_bp,
    url_prefix="/api/notifications"
)

# Analytics Module
app.register_blueprint(
    analytics_bp,
    url_prefix="/api/analytics"
)

# Reports Module
app.register_blueprint(
    report_bp,
    url_prefix="/api/reports"
)

# Admin Module
app.register_blueprint(
    admin_bp,
    url_prefix="/api/admin"
)


# ==============================
# HOME / HEALTH CHECK
# ==============================

@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "MediTrack Backend is running",
        "status": "online"
    })


# ==============================
# API HEALTH CHECK
# ==============================

@app.route("/api/health")
def health():

    return jsonify({
        "success": True,
        "message": "MediTrack API is working"
    })


# ==============================
# ERROR HANDLERS
# ==============================

@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "success": False,
        "message": "API endpoint not found"
    }), 404


@app.errorhandler(500)
def server_error(error):

    return jsonify({
        "success": False,
        "message": "Internal server error"
    }), 500


# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
    )