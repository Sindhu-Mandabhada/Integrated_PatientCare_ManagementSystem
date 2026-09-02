<<<<<<< HEAD
import os

# ==============================
# BASE DIRECTORY
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==============================
# DATABASE
# ==============================

DATABASE_PATH = os.path.join(
    BASE_DIR,
    "meditrack.db"
)


# ==============================
# JWT
# ==============================

SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "meditrack-development-secret-key"
)

JWT_EXPIRATION_HOURS = 24


# ==============================
# UPLOADS
# ==============================

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "uploads",
    "prescriptions"
)


# ==============================
# REPORTS
# ==============================

REPORT_FOLDER = os.path.join(
    BASE_DIR,
    "reports"
=======
import os

# ==============================
# BASE DIRECTORY
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==============================
# DATABASE
# ==============================

DATABASE_PATH = os.path.join(
    BASE_DIR,
    "meditrack.db"
)


# ==============================
# JWT
# ==============================

SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "meditrack-development-secret-key"
)

JWT_EXPIRATION_HOURS = 24


# ==============================
# UPLOADS
# ==============================

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "uploads",
    "prescriptions"
)


# ==============================
# REPORTS
# ==============================

REPORT_FOLDER = os.path.join(
    BASE_DIR,
    "reports"
>>>>>>> 772aa122c01472aacf2cc80ce9824eb4d558fc99
)